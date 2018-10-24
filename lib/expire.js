/**
 *  lib/expire.js
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
 *  Accepts: self.redis, self.key, self.expires (seconds)
 *  Produces: N/A
 */
const expire = _.promise.make((self, done) => {
    const method = "expire";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)
    assert.ok(_.is.Number(self.expires), `${method}: expected self.expires to be a Number`)

    self.redis.expire(self.key, self.expires, (error, value) => {
        if (error) {
            return done(error);
        }

        done(null, self);
    })
})

/**
 *  Paramaterized
 */
const expire_p = (key, expires) => _.promise.make((self, done) => {
    const method = "expire.p";

    _.promise.make(self)
        .then(_.promise.add("key", key || self.key))
        .then(_.promise.add("expires", _.is.Number(expires) ? expires : self.expires))
        .then(expire)
        .then(_.promise.done(done, self))
        .catch(done)
})

/**
 *  API
 */
exports.expire = expire;
exports.expire.p = expire_p;
