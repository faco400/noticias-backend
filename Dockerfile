# 1. Imagem base
FROM node:20-alpine

# 2. Diretório de trabalho
WORKDIR /app

# 3. Copia apenas dependências primeiro (cache)
COPY package*.json ./

# 4. Instala dependências
RUN npm install

# 5. Copia o restante do projeto
COPY . .

# 6. Gera o client do Prisma
RUN npx prisma generate

# 7. Expõe a porta da API
EXPOSE 3001

# 8. Comando para subir a API
CMD ["npm", "run", "dev"]