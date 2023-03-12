FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
Expose 3003
CMD ["npm","start"]
