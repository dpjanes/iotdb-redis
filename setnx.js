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

const Q = require("q");
const redis = require("redis");

/**
 *  Accepts: self.redis, self.key
 *  Produces: N/A
 */
const setnx = (_self, done) => {
    const self = _.d.clone.shallow(_self);
    const method = "setnx";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)

    self.redis.setnx(self.key, (error, locked) => {
        if (error) {
            return done(error);
        }

        self.value = locked;

        done(null, self);
    })
}

/**
 *  API
 */
exports.setnx = Q.denodeify(setnx);