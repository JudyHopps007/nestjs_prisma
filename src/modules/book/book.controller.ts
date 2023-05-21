import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Book } from '@prisma/client';

import { BookService } from './book.service';
import { IBookDTO } from './book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  public async index(): Promise<Book[]> {
    return this.bookService.index();
  }

  @Post()
  public async create(@Body() data: IBookDTO): Promise<Book> {
    return this.bookService.create(data);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: IBookDTO,
  ): Promise<Book> {
    return this.bookService.update(id, data);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    return this.bookService.delete(id);
  }
}
