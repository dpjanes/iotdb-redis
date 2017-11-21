/**
 *  expire.js
 *
 *  David Janes
 *  IOTDB
 *  2017-04-26
 *
 *  Copyright (2013-2018) David Janes
 */

"use strict";

const _ = require("iotdb-helpers");

const assert = require("assert");

const redis = require("redis");

/**
 *  Accepts: self.redis, self.key, self.expires (seconds)
 *  Produces: N/A
 */
const expire = _.promise.make((self, done) => {
    const method = "expire";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)
    assert.ok(_.is.Number(self.expires), `${method}: expected self.expires to be a Number`)

    self.redis.expire(self.key, self.expires, (error, value) => {
        if (error) {
            return done(error);
        }

        done(null, self);
    })
})

/**
 *  Paramaterized
 */
const expire_p = expires => _.promise.make((self, done) => {
    const method = "expire.p";

    _.promise.make(self)
        .then(_.promise.add("expires", _.is.Number(expires) ? expires : self.expires))
        .then(expire)
        .then(_.promise.done(done, self))
        .catch(done)
})

/**
 *  API
 */
exports.expire = expire;
exports.expire.p = expire_p;
