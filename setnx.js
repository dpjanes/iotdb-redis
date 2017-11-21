/**
 *  setnx.js
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

const redis = require("redis");

/**
 *  Accepts: self.redis, self.key
 *  Produces: N/A
 */
const setnx = _.promise.make((self, done) => {
    const method = "setnx";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)
    assert.ok(_.is.String(self.value), `${method}: expected self.value to be a String`)

    self.redis.setnx(self.key, self.value, (error, locked) => {
        if (error) {
            return done(error);
        }

        self.value = locked;

        done(null, self);
    })
})

/**
 *  API
 */
exports.setnx = setnx;
