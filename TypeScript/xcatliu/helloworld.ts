function hello(person: string) {
  return 'Hello ' + person;
}

// ts 只会在编译阶段检查类型错误，所以仍需要手动进行类型检查
function helloThrowsError(person: string) {
  if (typeof person === 'string') {
    return 'Hello ' + person;
  } else {
    throw new Error('person is not a string');
  }
}

let user = 'KCC';
console.log(hello(user));
