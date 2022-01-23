'use strict';


const protobufjs = require('protobufjs');
const path = require('path');
exports.Payload = protobufjs.load(path.join(__dirname, '../proto/Payload.proto'));
