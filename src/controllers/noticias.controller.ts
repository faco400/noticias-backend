import { Request, Response } from 'express';
import { NoticiasService } from '../services/noticias.service';

export class NoticiasController {
  private noticiasService: NoticiasService;

  constructor() {
    this.noticiasService = new NoticiasService();
  }

  async create(req: Request, res: Response) {
    try {
      const noticia = await this.noticiasService.create(req.body);
      return res.status(201).json(noticia);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const { page, limit, search } = req.query;

      const result = await this.noticiasService.findAll({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
      });

      return res.json(result);
    } catch {
      return res.status(500).json({ message: 'Erro ao listar notícias' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const noticia = await this.noticiasService.update(Number(id), req.body);
      return res.json(noticia);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.noticiasService.delete(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
