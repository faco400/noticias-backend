import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';

interface CreateNoticiaDTO {
  titulo: string;
  descricao: string;
}

interface FindAllParams {
  page?: number;
  limit?: number;
  search?: string;
}

export class NoticiasRepository {
  async create(data: CreateNoticiaDTO) {
    return prisma.noticia.create({
      data,
    });
  }

  async findAll({ page = 1, limit = 10, search }: FindAllParams) {
    const skip = (page - 1) * limit;

    const where: Prisma.NoticiaWhereInput | undefined = search
  ? {
      OR: [
        {
          titulo: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          descricao: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      ],
    }
  : undefined;

    const [items, total] = await Promise.all([
      prisma.noticia.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      prisma.noticia.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async update(id: number, data: CreateNoticiaDTO) {
    return prisma.noticia.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.noticia.delete({
      where: { id },
    });
  }
}
