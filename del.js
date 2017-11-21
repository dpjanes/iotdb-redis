/**
 *  del.js
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
 *  Accepts: self.redis, self.key
 *  Produces: N/A
 */
const del = _.promise.make((self, done) => {
    const method = "del";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)

    self.redis.del(self.key, (error) => {
        if (error) {
            return done(error);
        }

        done(null, self);
    })
})

/**
 *  API
 */
exports.del = del;
