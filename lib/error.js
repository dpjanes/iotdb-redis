/**
 *  error.js
 *
 *  David Janes
 *  IOTDB
 *  2018-01-11
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

const logger = require("../logger")(__filename)

/**
 *  Paramater: error || null
 *  Requires: self.redis
 *  Produces: N/A
 *
 *  The `handler` is invoked if redis produces an error.
 */
const error = handler => _.promise.make((self, done) => {
    const method = "error";

    assert.ok(handler, `${method}: expected handler`);
    assert.ok(self.redis, `${method}: expected self.redis`);

    self.redis.on("end", error => {
        console.log("REDIS.END")
    })

    self.redis.on("error", error => {
        logger.error({
            method: method,
            error: _.error.message(error),
        }, "Redis error detected - calling handler")

        _.promise.make(self)
            .then(handler)
            .catch(error => {
                logger.error({
                    method: method,
                    inner_error: _.error.message(inner_error),
                    redis_error: _.error.message(error),
                }, "Redis unexpected error handling error - doing nothing")
            })
    })

    done(null, self)
})

/**
 *  A slight delay is introduced so that
 *  loggers can send any data they need to.
 */
const die = _.promise.make((self, done) => {
    const handler = _.promise.make(self => {
        logger.fatal({
            method: method,
            error: _.error.message(error),
        }, "Redis error: die")

        setTimeout(() => process.exit(1), 5 * 1000);
    })

    _.promise.make(self)
        .then(error(die))
        .then(_.promise.done(done, self))
        .catch(done)
})

/**
 *  API
 */
exports.error = error
exports.error.die = die
