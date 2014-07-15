var test = require('tape');
var MBTiles = require('mbtiles');
var Serialize = require('../lib/stream-serialize.js');
var Deserialize = require('../lib/stream-deserialize.js');
var tilelive = require('..');
var fs = require('fs');
var path = require('path');

var src;

test('serialize: src', function(t) {
    new MBTiles(__dirname + '/fixtures/plain_1.mbtiles', function(err, s) {
        t.ifError(err);
        src = s;
        t.end();
    });
});

test('serialize: pipe', function(t) {
    var file = fs.createReadStream(path.join(__dirname,'fixtures','filescheme.flat'));
    var get = tilelive.createReadStream(src, {type:'list'});
    var serialize = new Serialize();
    var deserialize = new Deserialize();
    get.on('error', function(err) { t.ifError(err); });
    file.pipe(get).pipe(serialize).pipe(deserialize).on('data', function(d) {
        console.log(d);
    });
    t.end();
});