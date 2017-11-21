/**
 *  keys.js
 *
 *  David Janes
 *  IOTDB
 *  2017-11-21
 *
 *  Copyright (2013-2018) David Janes
 */

"use strict";

const _ = require("iotdb-helpers");

const assert = require("assert");

const redis = require("redis");

/**
 *  Accepts: self.redis, self.key
 *  Produces: self.value, self.exists
 */
const keys = _.promise.make((self, done) => {
    const method = "keys";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)

    self.redis.keys(self.key, (error, keys) => {
        if (error) {
            return done(error);
        }

        self.keys = keys;

        done(null, self);
    })
})

/**
 *  Paramaterized
 */
const keys_p = key => _.promise.make((self, done) => {
    const method = "keys.p";

    _.promise.make(self)
        .then(_.promise.add("key", key || self.key))
        .then(keys)
        .then(_.promise.done(done, self, "keys"))
        .catch(done)
})

/**
 *  API
 */
exports.keys = keys;
exports.keys.p = keys_p;
