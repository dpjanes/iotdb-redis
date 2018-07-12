/**
 *  error.js
 *
 *  David Janes
 *  IOTDB
 *  2018-01-11
 *
 *  Copyright (2013-2018) David Janes
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
