/**
 *  expire.js
 *
 *  David Janes
 *  IOTDB
 *  2017-04-26
 *
 *  Copyright (2013-2017) David Janes
 */

"use strict";

const _ = require("iotdb-helpers");

const assert = require("assert");

const Q = require("q");
const redis = require("redis");

/**
 *  Accepts: self.redis, self.key, self.expires (seconds)
 *  Produces: N/A
 *
 *  This will not finish until success or failure
 */
const expire = (_self, done) => {
    const self = _.d.clone.shallow(_self);
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
}

/**
 *  API
 */
exports.expire = Q.denodeify(expire);
