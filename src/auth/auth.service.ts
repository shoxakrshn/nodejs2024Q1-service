import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { JwtPayload, decode } from 'jsonwebtoken';
import { authConstants } from './constants/auth.constants';

interface Payload extends JwtPayload {
  userId: string;
  login: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async signup({ login, password }: CreateUserDto) {
    const hashPassword = await bcrypt.hash(password, +authConstants.salt);

    const user = await this.databaseService.user.create({
      data: { login, password: hashPassword },
    });

    return user;
  }

  async login({ login, password }: CreateUserDto) {
    const user = await this.databaseService.user.findFirst({
      where: { login },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new NotFoundException("Password doesn't match");
    }

    const payload = { userId: user.id, login: user.login };
    const tokens = await this.generateTokens(payload);

    return { ...payload, ...tokens };
  }

  async refresh({ refreshToken }: CreateRefreshTokenDto) {
    try {
      await this.jwtService.verify(refreshToken, {
        secret: authConstants.refreshSecret,
      });
    } catch {
      throw new ForbiddenException('Refresh token is not valid');
    }

    const { userId, login } = decode(refreshToken) as Payload;

    const newTokens = await this.generateTokens({ userId, login });

    return { userId, login, ...newTokens };
  }

  async generateTokens(payload: Payload) {
    const accessToken = await this.jwtService.sign(payload, {
      secret: authConstants.accessSecret,
      expiresIn: authConstants.accessExpire,
    });

    const refreshToken = await this.jwtService.sign(payload, {
      secret: authConstants.refreshSecret,
      expiresIn: authConstants.refreshExpire,
    });

    return { accessToken, refreshToken };
  }
}
