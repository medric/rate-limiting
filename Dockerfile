FROM node

RUN npm install
RUN npm build

CMD ["npm", "start"]