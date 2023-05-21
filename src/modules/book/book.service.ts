import { Injectable } from '@nestjs/common';
import { IBookDTO } from './book.dto';
import { PrismaService } from 'src/database/PrismaService';
import { Book } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  public async index(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  public async create(data: IBookDTO): Promise<Book> {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookExists) {
      throw new Error('Book already exists');
    }

    const book = await this.prisma.book.create({
      data,
    });

    return book;
  }

  public async update(id: string, data: IBookDTO): Promise<Book> {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) {
      throw new Error(`Book with id = ${id} not exist.`);
    }

    return this.prisma.book.update({
      where: {
        id,
      },
      data,
    });
  }

  public async delete(id: string): Promise<void> {
    const bookExists = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!bookExists) {
      throw new Error(`Book with id = ${id} not exist.`);
    }

    await this.prisma.book.delete({
      where: { id },
    });
  }
}
