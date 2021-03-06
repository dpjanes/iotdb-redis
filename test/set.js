/**
 *  test/set.js
 *
 *  David Janes
 *  IOTDB
 *  2020-01-05
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
const fs = require("iotdb-fs")

const assert = require("assert")
const path = require("path")

const redis = require("..")
const redis$cfg = require("./data/redis$cfg.json")
const _util = require("./_util")

describe("set", function() {
    it("fail - missing key", function(done) {
        _.promise()
            .then(_util.initialize)
        
            .add({
                "key": null,
                "value": "a value",
            })
            .then(redis.set)
            .then(_util.auto_fail(done))
            .catch(_util.ok_error(done))
    })
    it("fail - value is null", function(done) {
        _.promise()
            .then(_util.initialize)
        
            .add({
                "key": "test/set.1",
                "value": null,
            })
            .then(redis.set)
            .then(_util.auto_fail(done))
            .catch(_util.ok_error(done))
    })
    it("fail - value is number", function(done) {
        _.promise()
            .then(_util.initialize)
        
            .add({
                "key": "test/set.1",
                "value": 1.2,
            })
            .then(redis.set)
            .then(_util.auto_fail(done))
            .catch(_util.ok_error(done))
    })
    it("normal", function(done) {
        _.promise()
            .then(_util.initialize)
        
            .add({
                "key": "test/set.1",
                "value": "a value",
            })
            .then(redis.set)

            .add("value", null)
            .then(redis.get)
            .make(sd => {
                const got = sd.value
                const want = "a value"
                assert.deepEqual(got, want)
            })

            .end(done)
    })
    it("parameterized", function(done) {
        _.promise()
            .then(_util.initialize)
        
            .then(redis.set.p("test/set.2", "a value"))
            .make(sd => {
                assert.ok(!sd.key)
                assert.ok(!sd.value)
            })

            .add("key", "test/set.2")
            .then(redis.get)
            .make(sd => {
                const got = sd.value
                const want = "a value"
                assert.deepEqual(got, want)
            })

            .end(done)
    })
})
