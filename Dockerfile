FROM node:18-alpine

WORKDIR /crm-api

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm install @prisma/client --force

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
