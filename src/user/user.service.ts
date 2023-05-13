import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  save = async (data: User) => {
    return await this.prisma.user.create({ data });
  };

  update = async (data: User) => {
    const id = data.id;
    await this.findOne(id);

    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  };

  findOne = async (id: number) => {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: id } });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    } catch (err) {
      console.error('[User :: findOne] :: ', err);
      if (err.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw err;
    }
  };

  findAll = async () => {
    return await this.prisma.user.findMany();
  };
}
