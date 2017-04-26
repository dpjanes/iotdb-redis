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

const Q = require("q");
const redis = require("redis");

/**
 *  Accepts: self.redis, self.key, self.value
 *  Produces: N/A
 */
const set = (_self, done) => {
    const self = _.d.clone.shallow(_self);
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
}

/**
 *  API
 */
exports.set = Q.denodeify(set);
