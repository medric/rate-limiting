FROM node
WORKDIR /app
RUN npm build

CMD ["npm", "start"]