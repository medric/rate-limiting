var redis = require('redis');
var client = redis.createClient(); // redis client instance

const PREFIX                = 'secure:';
const SUFFIX                = ':ban';
const DEFAULT_TIME          = 10 * 60;
const DEFAULT_BAN_TIME      = 60 * 60;
const DEFAULT_MAX_HITS      = 10;

/** 
* Handles overflowed requests on a specific route
* @param {string} remoteAddress 
*/
function Throttle(remoteAddress, route) {   
    if(typeof route === 'undefined') {
        throw new Error('No route provided');
    }

    // Setting key
    this.key = `${PREFIX}${remoteAddress}:${route}`;
}

/**
* @param {map} options {ttl: '', banTime: '', maxHits: ''}
* @param {function} next callback function
*/
Throttle.prototype.secure = function(options, next) {
    // Set default if undefined in options
    const time = typeof options.time !== 'undefined' ? options.ttl : DEFAULT_TIME;
    const banTime = typeof options.banTime !== 'undefined' ?  options.banTime : DEFAULT_BAN_TIME;
    const maxHits = typeof options.maxHits !== 'undefined' ?  options.maxHits : DEFAULT_MAX_HITS;

    let secured = false;
    this.isBanned((timeToBan) => {
        if(!timeToBan) {
            this.reset(time, () => {

                client.incr(this.key, (err, hits) => {
                    // User has reached the maximum hits
                    if(hits > maxHits) {
                        this.ban(banTime, hits, () => {
                            next(secured, banTime);
                        }); 
                    } else {
                        secured = true;

                        next(secured);    
                    }
                });
            });
        } else {    
            next(secured, timeToBan);
        }
    });
}

/**
 * 
 */
Throttle.prototype.reset = function(time, next) {
    client.exists(this.key, (err, exists) => {
        if(!exists) {
            // Create key: set atomically
            client.multi()
                .setex(this.key, time, 0)
                .exec((err, replies) => {
                    next();
                });
        } else {
            next();
        }
    });
}

/**
 * 
 */
Throttle.prototype.ban = function(banTime, hits, next) {
    // Set ban key atomically
    client.multi()
        .del(this.key)
        .setex(this.key + SUFFIX, banTime, hits)
        .exec(() => {
            console.log('Client gets banned');
            next();
         });
}

/**
 * 
 */
Throttle.prototype.isBanned = function(next) {
    client.ttl(this.key + SUFFIX, (err, reply) => {   
        timeToBan = reply;

        if(reply === -2 || reply === 0) {
            timeToBan = false;
        }

        next(timeToBan);
    });
}

module.exports = Throttle;