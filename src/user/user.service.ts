import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

const userSelectFields = {
  id: true,
  login: true,
  version: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    const users = await this.databaseService.user.findMany({
      select: userSelectFields,
    });

    return users.map((user) => this.convertDate(user));
  }

  async getById(id: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      select: userSelectFields,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.convertDate(user);
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.databaseService.user.create({
      data: createUserDto,
      select: userSelectFields,
    });

    return this.convertDate(user);
  }

  async update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    const updatedUser = await this.databaseService.user.update({
      where: { id },
      data: { password: newPassword, version: user.version + 1 },
      select: userSelectFields,
    });

    return this.convertDate(updatedUser);
  }

  async delete(id: string) {
    try {
      await this.databaseService.user.delete({ where: { id } });
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  convertDate(user: Omit<User, 'password'>) {
    return {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }
}
