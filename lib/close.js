/**
 *  lib/close.js
 *
 *  David Janes
 *  IOTDB
 *  2018-08-26
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

"use strict"

const _ = require("iotdb-helpers")

const assert = require("assert")

const redis = require("redis")

const logger = require("../logger")(__filename)

/**
 *  Accepts: self.redis
 *
 */
const close = _.promise.make((self, done) => {
    const method = "close"

    if (!self.redis) {
        logger.warn({
            method: method,
        }, "was already closed - ignoring")

        done(null, self)
    }

    logger.info({
        method: method,
    }, "closing")

    self.redis.quit((error) => {
        if (error) {
            return done(error)
        }

        logger.info({
            method: method,
        }, "closed")

        self.redis = null

        done(null, self)
    })
})

/**
 *  API
 */
exports.close = close
