/*
 *  index.js
 *
 *  David Janes
 *  IOTDB
 *  2017-04-26
 *
 *  Copyright (2013-2018) David Janes
 */

"use strict";

module.exports = Object.assign({},
    require("./del"),
    require("./expire"),
    require("./get"),
    require("./keys"),
    require("./initialize"),
    require("./set"),
    require("./setnx"),
    {}
);
