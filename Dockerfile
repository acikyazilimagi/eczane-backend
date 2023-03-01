FROM node:16-alpine

ENV PORT 80
ENV HOST 0.0.0.0

WORKDIR /app

COPY package*.json ./

# custom
COPY entrypoint.sh /usr/local/bin/ 

# custom

RUN chmod +x /usr/local/bin/entrypoint.sh

RUN npm install

COPY . .

RUN apk add --no-cache tini

# custom
ENTRYPOINT ["entrypoint.sh"]

# ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "src/index.js"]