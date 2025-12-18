import { inMemoryCache } from '../cache/inMemoryCache';
import { NoticiasRepository } from '../repositories/noticias.repository';

interface CreateNoticiaDTO {
  titulo: string;
  descricao: string;
}

interface FindAllParams {
  page?: number;
  limit?: number;
  search?: string;
}

export class NoticiasService {
  private noticiasRepository: NoticiasRepository;

  constructor() {
    this.noticiasRepository = new NoticiasRepository();
  }

  async create(data: CreateNoticiaDTO) {
    const { titulo, descricao } = data;

    if (!titulo || !descricao) {
      throw new Error('Título e descrição são obrigatórios');
    }

    return this.noticiasRepository.create({
      titulo,
      descricao,
    });
  }

  async findAll({ page = 1, limit = 10, search }: FindAllParams) {
    const cacheKey = `noticias:page=${page}&limit=${limit}&search=${search ?? ''}`;

    const cached = inMemoryCache.get(cacheKey);
    if (cached) {
      console.log('[CACHE] HIT:', cacheKey);
      return cached;
    }

    const result = await this.noticiasRepository.findAll({ page, limit, search });

    inMemoryCache.set(cacheKey, result);

    return result;
  }

  async update(id: number, data: CreateNoticiaDTO) {
    if (!id) {
      throw new Error('ID inválido');
    }

    if (!data.titulo || !data.descricao) {
      throw new Error('Título e descrição são obrigatórios');
    }

    return this.noticiasRepository.update(id, data);
  }

  async delete(id: number) {
    if (!id) {
      throw new Error('ID inválido');
    }

    return this.noticiasRepository.delete(id);
  }
}
