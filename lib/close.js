/**
 *  lib/close.js
 *
 *  David Janes
 *  IOTDB
 *  2018-08-26
 *
 *  Copyright (2013-2018) David Janes
 */

"use strict";

const _ = require("iotdb-helpers");

const assert = require("assert");

const redis = require("redis");

const logger = require("../logger")(__filename)

/**
 *  Accepts: self.redis
 *
 */
const close = _.promise.make((self, done) => {
    const method = "close";

    logger.info({
        method: method,
    }, "closing")

    self.redis.quit((error) => {
        if (error) {
            return done(error);
        }

        logger.info({
            method: method,
        }, "closed")

        self.redis = null

        done(null, self);
    })
})

/**
 *  API
 */
exports.close = close;
