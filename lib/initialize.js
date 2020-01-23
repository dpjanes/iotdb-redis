/**
 *  lib/initialize.js
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

const redis = require("redis");

const logger = require("../logger")(__filename)

/**
 *  Accepts: self.redis$cfg (or null)
 *  Produces: self.redis
 *
 *  This will not finish until success or failure
 */
const initialize = _.promise((self, done) => {
    const method = "initialize";

    const redis$cfg = _.d.compose.shallow(self.redis$cfg, {
        host: "0.0.0.0",
        database: 0
    })
    /*
    if (!redis$cfg) {
        done(null, self);
    }
    */

    _.mapObject(redis$cfg, (value, key) => {
        if (_.is.Nullish(value)) {
            delete redis$cfg[key];
        }
    })

    logger.trace({
        method: method,
        host: redis$cfg.host,
    }, "connecting")

    self.redis = redis.createClient(redis$cfg)
    self.redis.on("error", error => {
        logger.error({
            method: method,
            error: _.error.message(error),
        }, "Redis error - cannot connect")

        done(error)
        done = _.noop;
    })
    self.redis.on("connect", () => {
        logger.debug({
            method: method,
        }, "connected")

        done(null, self)
        done = _.noop;
    })
})

initialize.method = "initialize"
initialize.description = ``
initialize.requires = {
}
initialize.accepts = {
    redis$cfg: {
        host: _.is.String,
        database: _.is.Number,
    },
}
initialize.produces = {
}

/**
 *  API
 */
exports.initialize = initialize;
