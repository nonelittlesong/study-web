// node --harmony --expose-gc filename.js
var co = require('co');

function* sleep() {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1);
  })
};

co(function* () {
  for (var i = 0; true; ++i) {
    yield sleep();

    if (i % 10000 === 0) {
      global.gc();
      console.log(process.memoryUsage());
    }
  }
}).then(function () {
  console.log('finished');
}).catch(function (err) {
  console.log('caught error: ', err.stack);
});

// sample output
// { rss: 17420288, heapTotal: 9620736, heapUsed: 3590768 }
// { rss: 44822528, heapTotal: 49288192, heapUsed: 12972200 }
// { rss: 70955008, heapTotal: 58575616, heapUsed: 21688912 }
// { rss: 80048128, heapTotal: 66831104, heapUsed: 30531560 }
// { rss: 89157632, heapTotal: 76118528, heapUsed: 39490184 }
// { rss: 98275328, heapTotal: 85405952, heapUsed: 48445040 }
// { rss: 107368448, heapTotal: 93661440, heapUsed: 57410024 }
// { rss: 116477952, heapTotal: 102948864, heapUsed: 66365712 }
// { rss: 125591552, heapTotal: 112236288, heapUsed: 75330040 }
// { rss: 134684672, heapTotal: 120491776, heapUsed: 84285144 }
// { rss: 143798272, heapTotal: 129779200, heapUsed: 93250072 }
// { rss: 152907776, heapTotal: 139066624, heapUsed: 102205152 }
// { rss: 162000896, heapTotal: 147322112, heapUsed: 111170352 }
// { rss: 171114496, heapTotal: 156609536, heapUsed: 120125032 }