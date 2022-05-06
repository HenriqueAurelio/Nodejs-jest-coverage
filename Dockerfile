FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .



RUN npx prisma generate --schema ./prisma/schema.prisma
# start app
EXPOSE 3000
CMD npm run dev
