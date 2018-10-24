/**
 *  lib/keys.js
 *
 *  David Janes
 *  IOTDB
 *  2017-11-21
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
const keys = _.promise.make((self, done) => {
    const method = "keys";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)

    self.redis.keys(self.key, (error, keys) => {
        if (error) {
            return done(error);
        }

        self.keys = keys;

        done(null, self);
    })
})

/**
 *  Paramaterized
 */
const keys_p = key => _.promise.make((self, done) => {
    const method = "keys.p";

    _.promise.make(self)
        .then(_.promise.add("key", key || self.key))
        .then(keys)
        .then(_.promise.done(done, self, "keys"))
        .catch(done)
})

/**
 *  API
 */
exports.keys = keys;
exports.keys.p = keys_p;
