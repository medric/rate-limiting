const redis = require('redis');
const client = redis.createClient(); // redis client instance

const config = require('../../config.json')[process.env.NODE_ENV || 'local'];
const request = require('../__mocks__/request');

const { secure } = config;
const { maxHits } = secure;

describe('rate-limiting', () => {
  it('should return "ok"', () => {
    return request('/').then(res => expect(res).toEqual('ok'));
  });

  it('should be banned', () => {
    const promises = [];
    
    for (let i = 0; i < maxHits; ++i) {
      promises.push(request('/'));
    }

    promises.then(res => console.log);
  });
}); 