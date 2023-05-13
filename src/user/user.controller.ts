import { User } from '@prisma/client';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private prisma: UserService) {}

  @Post()
  async createUser(@Body() user: User) {
    return await this.prisma.save(user);
  }

  @Put()
  async updateUser(@Body() user: User) {
    return await this.prisma.update(user);
  }

  @Get()
  async getUsers() {
    return await this.prisma.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.prisma.findOne(id);
  }
}
