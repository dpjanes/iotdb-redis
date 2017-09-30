/**
 *  get.js
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
 *  Produces: self.value, self.exists
 */
const get = (_self, done) => {
    const self = _.d.clone.shallow(_self);
    const method = "get";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)

    self.redis.get(self.key, (error, value) => {
        if (error) {
            return done(error);
        }

        self.value = value;
        self.exists = !_.is.Null(value);

        done(null, self);
    })
}

/**
 *  API
 */
exports.get = Q.denodeify(get);
exports.get.json = require("./json/get").get;
