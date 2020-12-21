console.log('------------------------------- 被代理的 Generator 有 return');

function* foo() {
  yield 2;
  yield 3;
  return 'foo';
}

function* bar() {
  yield 1;
  let v = yield* foo();
  console.log('v: ' + v);
  yield 4;
}

let it = bar();

it.next();
// { value: 1, done: false }
it.next();
// { value: 2, done: false }
it.next();
// { value: 3, done: false }
it.next();
// 'v: foo'
// { value: 4, done: false }
it.next();
// { value: undefined, done: true }

console.log('-------------------------------')

function* getFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}

[...logReturned(getFuncWithReturn())];

console.log('------------------------------- 遍历完全二叉树');

function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield* t.label;
    yield* inorder(t.right);
  }
}

function make(array) {
  if (array.length === 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}

let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

console.log(result);
