function ClassA(arg1 = 'default1', arg2) {
  let localVariable = 1;

  this.instanceAttr1 = arg1;
  this.instanceAttr2 = arg2 || 'default2';

  this.instanceFunc = function () {
    console.log('localVariable', localVariable);
    console.log('instanceAttr1', this.instanceAttr1);
    console.log('instanceAttr2', this.instanceAttr2);
  }
}

ClassA.prototype.staticAttr = 'staticAttr'

ClassA.prototype.staticFunc = function () {
  console.log('instance-attributes', this.instanceAttr1, this.instanceAttr2);
  console.log('instance-function', this.instanceFunc);
  console.log('static-attribute', this.staticAttr);
}

console.log(ClassA)
console.log(ClassA()) // undefined，不加 new，视为普通函数

const object1 = new ClassA();
const object2 = new ClassA(2, 3);

console.log('--------- 实例方法 ---------');
object1.instanceFunc();
object2.instanceFunc();

console.log('--------- 静态方法 ---------');
object1.staticFunc();
object2.staticFunc();
