import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseHandler } from 'src/utils/response-handle.util';
import { SortBy } from 'src/utils/sort-by.util';

@Controller('posts')
@ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'pageIndex', type: Number, required: false })
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'orderByField', type: String, required: false })
  @ApiQuery({ name: 'sortBy', type: String, required: false })
  async findAll(
    @Query('pageIndex', ParseIntPipe) pageIndex = 1,
    @Query('pageSize', ParseIntPipe) pageSize = 10,
    @Query('orderByField') orderByField = 'title',
    @Query('sortBy') sortBy = 'asc',
  ) {
    const posts = await this.postService.findAll(
      pageIndex,
      pageSize,
      orderByField,
      sortBy,
    );
    return ResponseHandler.response(posts, pageIndex, pageSize);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}
