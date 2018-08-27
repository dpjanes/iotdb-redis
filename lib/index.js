/*
 *  lib/index.js
 *
 *  David Janes
 *  IOTDB
 *  2017-04-26
 *
 *  Copyright (2013-2018) David Janes
 */

"use strict";

module.exports = Object.assign({},
    require("./close"),
    require("./del"),
    require("./error"),
    require("./expire"),
    require("./get"),
    require("./initialize"),
    require("./keys"),
    require("./lrange"),
    require("./set"),
    require("./setnx"),
    {}
);
