/*
 *  index.js
 *
 *  David Janes
 *  IOTDB
 *  2017-04-26
 *
 *  Copyright (2013-2017) David Janes
 */

"use strict";

module.exports = Object.assign({},
    require("./expire"),
    require("./get"),
    require("./initialize"),
    require("./set"),
    {}
);
