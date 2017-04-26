/**
 *  del.js
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
const del = (_self, done) => {
    const self = _.d.clone.shallow(_self);
    const method = "del";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)

    self.redis.del(self.key, (error) => {
        if (error) {
            return done(error);
        }

        done(null, self);
    })
}

/**
 *  API
 */
exports.del = Q.denodeify(del);
