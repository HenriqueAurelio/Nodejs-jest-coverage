# API desenvolvida em NodeJS utilizando prisma, express, sqlserver, jest, e docker

## Para rodar basta instalar os pacotes via npm ou yarn e dar yarn dev

## Para criar o banco yarn db:migrate

## Caso deseje criar dados rode yarn seed

## Para rodar o script de teste e ver o coverage yarn test-coverage e para testes unitarios yarn test

  "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest",
    "seed": "node src/seed/seed.js",
    "db:migrate": "yarn prisma migrate dev --preview-feature",
    "test-coverage": "jest --coverage"
