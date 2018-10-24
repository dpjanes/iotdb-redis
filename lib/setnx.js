/**
 *  lib/setnx.js
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
 *  Produces: N/A
 */
const setnx = _.promise.make((self, done) => {
    const method = "setnx";

    assert.ok(self.redis, `${method}: expected self.redis`)
    assert.ok(_.is.String(self.key), `${method}: expected self.key to be a String`)
    assert.ok(_.is.String(self.value), `${method}: expected self.value to be a String`)

    self.redis.setnx(self.key, self.value, (error, locked) => {
        if (error) {
            return done(error);
        }

        self.value = locked;

        done(null, self);
    })
})

/**
 *  API
 */
exports.setnx = setnx;
