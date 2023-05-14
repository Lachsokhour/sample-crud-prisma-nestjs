import { UserService } from './../user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreatePostDto) {
    await this.userService.findOne(dto.authorId);
    return await this.prisma.post.create({ data: { ...dto } });
  }

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return post;
  }

  async update(id: number, dto: UpdatePostDto) {
    // not allowed the user to update id.
    delete dto.id; // remove id from dto if is present.
    await this.findOne(id);
    await this.userService.findOne(dto.authorId);
    return await this.prisma.post.update({ where: { id }, data: { ...dto } });
  }

  async remove(id: number) {
    await this.findOne(id); // check if id exists
    return await this.prisma.post.delete({ where: { id } });
  }
}
