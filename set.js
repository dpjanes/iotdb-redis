/**
 *  set.js
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
 *  Accepts: self.redis, self.key, self.value
 *  Produces: N/A
 */
const set = _.promise.make((self, done) => {
    const method = "set";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)
    assert.ok(_.is.String(self.value), `${method}: expected self.value to be a String`)

    self.redis.set(self.key, self.value, error => {
        if (error) {
            return done(error);
        }

        done(null, self);
    })
})

/**
 *  Accepts: self.redis, self.key, self.json
 *  Produces: N/A
 */
const set_json = _.promise.make((self, done) => {
    const method = "json.set";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)
    assert.ok(_.is.JSON(self.json), `${method}: expected self.json to be a JSONable Object`)

    self.redis.set(self.key, JSON.stringify(self.json), error => {
        if (error) {
            return done(error);
        }

        done(null, self);
    })
})

/**
 *  API
 */
exports.set = set;
exports.set.json = set_json;
