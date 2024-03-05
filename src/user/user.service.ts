import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { dbService } from 'src/database/database';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  getAll() {
    const users = [...dbService.users.values()].map((user) =>
      this.removeUserPasswordField(user),
    );

    return users;
  }

  getById(id: string) {
    if (!dbService.users.has(id)) {
      throw new NotFoundException('User not found');
    }

    const user = dbService.users.get(id);
    return this.removeUserPasswordField(user);
  }

  create({ login, password }: CreateUserDto) {
    const newUser: User = new User(login, password);
    dbService.users.set(newUser.id, newUser);

    return this.removeUserPasswordField(newUser);
  }

  update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    if (!dbService.users.has(id)) {
      throw new NotFoundException('User not found');
    }

    const user = dbService.users.get(id);

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return this.removeUserPasswordField(user);
  }

  delete(id: string) {
    if (!dbService.users.has(id)) {
      throw new NotFoundException('User not found');
    }

    dbService.users.delete(id);
  }

  removeUserPasswordField(user: User) {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }
}
