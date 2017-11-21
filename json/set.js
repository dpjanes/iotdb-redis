/**
 *  json/set.js
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
 *  Accepts: self.redis, self.key, self.json
 *  Produces: N/A
 */
const set = (_self, done) => {
    const self = _.d.clone.shallow(_self);
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
}

/**
 *  API
 */
exports.set = _.promise.denodeify(set);
