/**
 *  initialize.js
 *
 *  David Janes
 *  IOTDB
 *  2017-04-26
 *
 *  Copyright (2013-2017) David Janes
 */

"use strict";

const _ = require("iotdb-helpers");

const assert = require("assert");

const Q = require("q");
const redis = require("redis");

const logger = require("./logger")(__filename)

/**
 *  Accepts: self.redisd (or null)
 *  Produces: self.redis
 *
 *  This will not finish until success or failure
 */
const initialize = (_self, done) => {
    const self = _.d.clone.shallow(_self);
    const method = "initialize";

    const redisd = _.d.compose.shallow(self.redisd, {
        host: "0.0.0.0",
        database: 0
    })
    if (!redisd) {
        done(null, self);
    }

    _.mapObject(redisd, (value, key) => {
        if (_.is.Nullish(value)) {
            delete redisd[key];
        }
    })

    logger.info({
        method: method,
        host: redis.host,
    }, "connecting")

    self.redis = redis.createClient(redisd)
    self.redis.on("error", error => {
        logger.error({
            method: method,
            error: _.error.message(error),
        }, "Redis error - cannot connect")

        done(error)
        done = _.noop;
    })
    self.redis.on("connect", () => {
        logger.info({
            method: method,
        }, "connected")

        done(null, self)
        done = _.noop;
    })
}

/**
 *  API
 */
exports.initialize = Q.denodeify(initialize);
