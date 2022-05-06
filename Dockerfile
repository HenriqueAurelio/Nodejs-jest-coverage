FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .



RUN npm prisma generate --schema ./prisma/schema.prisma
# start app
RUN npm run build
EXPOSE 3000
CMD npm run dev
