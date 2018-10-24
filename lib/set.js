/**
 *  lib/set.js
 *
 *  David Janes
 *  IOTDB
 *  2017-04-26
 *
 *  Copyright [2013-2019] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

const _ = require("iotdb-helpers");

const assert = require("assert");

/**
 *  Accepts: self.redis, self.key, self.value
 *  Produces: N/A
 */
const key_value = (method, redis_method) => _.promise.make((self, done) => {
    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)
    assert.ok(_.is.String(self.value), `${method}: expected self.value to be a String`)

    self.redis[redis_method](self.key, self.value, error => {
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
const key_json = (method, redis_method) => _.promise.make((self, done) => {
    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)
    assert.ok(_.is.JSON(self.json), `${method}: expected self.json to be a JSONable Object`)

    self.redis[redis_method](self.key, JSON.stringify(self.json), error => {
        if (error) {
            return done(error);
        }

        done(null, self);
    })
})

/**
 *  Paramaterized
 */
const key_value_p = (method, underlying) => (key, value) => _.promise.make((self, done) => {
    _.promise.make(self)
        .then(_.promise.add({
            key: key || self.key,
            value: value || self.value,
        }))
        .then(underlying)
        .then(_.promise.done(done, self))
        .catch(done)
})

const key_json_p = (method, underlying) => (key, json) => _.promise.make((self, done) => {
    _.promise.make(self)
        .then(_.promise.add({
            key: key || self.key,
            json: json || self.json,
        }))
        .then(underlying)
        .then(_.promise.done(done, self))
        .catch(done)
})

/**
 *  API
 *
 *  Note the highly curried generalized functions
 */
exports.set = key_value("set", "set");
exports.set.p = key_value_p("set.p", exports.set);
exports.set.json = key_json("set.json", "set");
exports.set.json.p = key_json_p("set.json.p", exports.set.json)

exports.rpush = key_value("rpush", "rpush");
exports.rpush.p = key_value_p("rpush.p", exports.rpush);
exports.rpush.json = key_json("rpush.json", "rpush");
exports.rpush.json.p = key_json_p("rpush.json.p", exports.rpush.json)

exports.lpush = key_value("lpush", "lpush");
exports.lpush.p = key_value_p("lpush.p", exports.lpush);
exports.lpush.json = key_json("lpush.json", "lpush");
exports.lpush.json.p = key_json_p("lpush.json.p", exports.lpush.json)
