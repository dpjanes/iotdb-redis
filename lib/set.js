/**
 *  lib/set.js
 *
 *  David Janes
 *  IOTDB
 *  2017-04-26
 *
 *  Copyright (2013-2020) David P. Janes
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

/**
 */
const key_value = (method, redis_method) => {
    const f = _.promise((self, done) => {
        _.promise.validate(self, f)

        self.redis[redis_method](self.key, self.value, error => {
            if (error) {
                return done(error)
            }

            done(null, self)
        })
    })

    f.method = method
    f.requires = {
        redis: _.is.Object,
        key: _.is.String,
        value: _.is.String,
    }
    f.produces = {
    }
    f.params = {
        key: _.p.normal,
        value: _.p.normal,
    }
    f.p = _.p(f)

    return f
}

/**
 */
const key_json = (method, redis_method) => {
    const f = _.promise((self, done) => {
        _.promise.validate(self, f)

        self.redis[redis_method](self.key, JSON.stringify(self.json), error => {
            if (error) {
                return done(error)
            }

            done(null, self)
        })
    })

    f.method = method
    f.requires = {
        redis: _.is.Object,
        key: _.is.String,
        json: _.is.JSON,
    }
    f.produces = {
    }
    f.params = {
        key: _.p.normal,
        json: _.p.normal,
    }
    f.p = _.p(f)

    return f
}

/**
 *  API
 *
 *  Note the highly curried generalized functions
 */
exports.set = key_value("set", "set")
exports.set.json = key_json("set.json", "set")

exports.rpush = key_value("rpush", "rpush")
exports.rpush.json = key_json("rpush.json", "rpush")

exports.lpush = key_value("lpush", "lpush")
exports.lpush.json = key_json("lpush.json", "lpush")
