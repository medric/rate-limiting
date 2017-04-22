'use strict';
const Throttle = require('../services/throttle');
const config = require('../../config.json')[process.env.NODE_ENV || 'development'];

module.exports = (req, res, next) => {
    const remoteAddress = req.connection.remoteAddress ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    const { secure } = config;
    const { path } = req;

    const throttle = new Throttle(remoteAddress, path);
    const routeThrottlingConfig = secure && secure[path];
	
    throttle.secure(routeThrottlingConfig, (allowed, remainingHits, timeToBan) => {
        setXRateHeaders(res, routeThrottlingConfig.maxHits, remainingHits, timeToBan);
        
        if(!allowed) {
            return res.status(429).send('you have exceeded your request limit');
        }

        return next();
	});
};

function setXRateHeaders(res, rateLimitMax, remaining, timeUntilReset) {
    res.set('X-Rate-Limit-Limit', rateLimitMax);
    res.set('X-Rate-Limit-Remaining', remaining);
    res.set('X-Rate-Limit-Reset', timeUntilReset);
}
