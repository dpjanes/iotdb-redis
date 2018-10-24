/**
 *  lib/get.js
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
