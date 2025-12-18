import request from 'supertest';
import app from '../app';
import { prisma } from '../prisma';

describe('Notícias API (BDD)', () => {
  beforeAll(async () => {
    await prisma.noticia.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /noticias', () => {
    it('GIVEN valid data WHEN creating a noticia THEN it should return 201', async () => {
      const response = await request(app)
        .post('/noticias')
        .send({
          titulo: 'Notícia de teste',
          descricao: 'Descrição de teste',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.titulo).toBe('Notícia de teste');
    });

    it('GIVEN invalid data WHEN creating a noticia THEN it should return 400', async () => {
      const response = await request(app)
        .post('/noticias')
        .send({
          titulo: '',
          descricao: '',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });
});
