/**
 *  lrange.js
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

/**
 *  Accepts: self.redis, self.key
 *  Produces: self.values
 */
const lrange = _.promise.make((self, done) => {
    const method = "lrange";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)
    assert.ok(_.is.Integer(self.first) || _.is.Nullish(self.first), `${method}: expected self.first to be an Integer or Null`)
    assert.ok(_.is.Integer(self.last) || _.is.Nullish(self.last), `${method}: expected self.last to be an Integer or Null`)

    const first = _.is.Integer(self.first) ? self.first : 0;
    const last = _.is.Integer(self.last) ? self.last : -1;

    self.redis.lrange(self.key, first, last, (error, values) => {
        if (error) {
            return done(error);
        }

        self.values = _.is.Null(values) ? [] : values

        done(null, self);
    })
})

/**
 *  Accepts: self.redis, self.key
 *  Produces: self.value, self.json, self.exists
 *
 *  This will not finish until success or failure
 */
const lrange_json = _.promise.make((self, done) => {
    const method = "json.lrange";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)
    assert.ok(_.is.Integer(self.first) || _.is.Nullish(self.first), `${method}: expected self.first to be an Integer or Null`)
    assert.ok(_.is.Integer(self.last) || _.is.Nullish(self.last), `${method}: expected self.last to be an Integer or Null`)

    const first = _.is.Integer(self.first) ? self.first : 0;
    const last = _.is.Integer(self.last) ? self.last : -1;

    self.redis.lrange(self.key, first, last, (error, values) => {
        if (error) {
            return done(error);
        }

        self.jsons = _.is.Null(values) ? [] : values.map(JSON.parse)

        done(null, self);
    })
})

/**
 *  Paramaterized
 */
const lrange_p = (key, first, last) => _.promise.make((self, done) => {
    const method = "lrange.p";

    _.promise.make(self)
        .then(_.promise.add("key", key || self.key))
        .then(_.promise.add("first", first || self.first))
        .then(_.promise.add("last", last || self.last))
        .then(lrange)
        .then(_.promise.done(done, self, "values"))
        .catch(done)
})

const lrange_json_p = (key, first, last) => _.promise.make((self, done) => {
    const method = "lrange.json.p";

    _.promise.make(self)
        .then(_.promise.add("key", key || self.key))
        .then(_.promise.add("first", first || self.first))
        .then(_.promise.add("last", last || self.last))
        .then(lrange_json)
        .then(_.promise.done(done, self, "jsons"))
        .catch(done)
})

/**
 *  API
 */
exports.lrange = lrange;
exports.lrange.p = lrange_p;
exports.lrange.json = lrange_json;
exports.lrange.json.p = lrange_json_p;
