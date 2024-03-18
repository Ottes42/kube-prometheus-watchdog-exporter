FROM node:21-alpine

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE ${PORT}

WORKDIR /app

COPY ["package.json", "package-lock.json*", "/app/"]
RUN apk add --no-cache bash && npm install --omit-dev

COPY redirector.js /app/
CMD [ "node", "watchdog.js" ]