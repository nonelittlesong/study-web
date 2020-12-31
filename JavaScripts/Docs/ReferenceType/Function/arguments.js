const slice = Array.prototype.slice;

function co(gen) {
  console.log(`arguments: ${ [...arguments] }`);
  var args = slice.call(arguments, 1);
  console.log(`arguments: ${args}`);
}

function gen(a = 'a', b, c) {
  console.log(`gen: ${a}, ${b}, ${c}`);
}

co(gen, 'A');