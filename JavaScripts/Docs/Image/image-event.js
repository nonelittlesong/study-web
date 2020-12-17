let image = new Image(); // nodejs 没有 Image

image.addEventListener('error', function (ev) {
  console.log(`${ev.target}: ${ev.type}`);
})

image.addEventListener('abort', function (ev) {
  console.log(`${ev.target}: ${ev.type}`);
})

image.addEventListener('load', function (ev) {
  console.log(`${ev.target}: ${ev.type}`);
})

image.addEventListener('beforeunload', function (ev) {
  console.log(`${ev.target}: ${ev.type}`);
})

image.addEventListener('unload', function (ev) {
  console.log(`${ev.target}: ${ev.type}`);
})

image.src = 'https://raw.githubusercontent.com/nonelittlesong/resources/master/images/protocpls.jpg';
