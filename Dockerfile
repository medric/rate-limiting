FROM node
WORKDIR /code
RUN npm build

CMD ["npm", "start"]