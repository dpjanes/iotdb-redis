/**
 *  lib/get.js
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

/**
 *  Accepts: self.redis, self.key
 *  Produces: self.value, self.exists
 */
const get = _.promise.make((self, done) => {
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
})

/**
 *  Accepts: self.redis, self.key
 *  Produces: self.value, self.json, self.exists
 *
 *  This will not finish until success or failure
 */
const get_json = _.promise.make((self, done) => {
    const method = "json.get";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)

    self.redis.get(self.key, (error, value) => {
        if (error) {
            return done(error);
        }

        self.value = value;
        self.exists = !_.is.Null(self.value);
        self.json = self.exists ? JSON.parse(self.value) : null

        done(null, self);
    })
})

/**
 *  Paramaterized
 */
const get_p = key => _.promise.make((self, done) => {
    const method = "get.p";

    _.promise.make(self)
        .then(_.promise.add("key", key || self.key))
        .then(get)
        .then(_.promise.done(done, self, "value,exists"))
        .catch(done)
})

const get_json_p = key => _.promise.make((self, done) => {
    const method = "get.json.p";

    _.promise.make(self)
        .then(_.promise.add("key", key || self.key))
        .then(get_json)
        .then(_.promise.done(done, self, "value,exists,json"))
        .catch(done)
})

/**
 *  API
 */
exports.get = get;
exports.get.p = get_p;
exports.get.json = get_json;
exports.get.json.p = get_json_p;
