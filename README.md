# 📰 Notícias API — Backend

API RESTful desenvolvida em Node.js para gerenciamento de notícias, como parte de uma prova técnica.

# Como configurar

Crie raiz do diretório um .env com a seguinte variável de ambiente:
- Para rodar localmente:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/noticias"
```
- Para rodar com container docker:
```
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/noticias"
```

# Como executar com container docker:
```
docker-compose up --build
```

# Como executar localmente:
```
npm install
npx prisma migrate dev
npm run dev
```

# Endpoints

| Método | Rota          | Descrição                    |
| ------ | ------------- | ---------------------------- |
| GET    | /noticias     | Lista notícias com paginação |
| POST   | /noticias     | Cria uma notícia             |
| PUT    | /noticias/:id | Atualiza uma notícia         |
| DELETE | /noticias/:id | Remove uma notícia           |


# Para a realização dos Testes:
```
npm test
```