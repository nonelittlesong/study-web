// ~ any 类型允许被赋值为任意类型
// =========================================================================================

// 非 any 类型在赋值过程中不能改变类型
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.

// any 允许改变类型
let myFavoriteNumber2: any = 'seven';
myFavoriteNumber2 = 7;

// ~ any 允许访问任何属性和方法
// =========================================================================================

// 访问属性
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);

// 访问方法
let anyThing2: any = 'Tom';
anyThing2.setName('Jerry');
anyThing2.setName('Jerry').sayHello();
anyThing2.myName.setFirstNmae('Cat');

// ~ 未声明类型的变量
// =========================================================================================

// 未声明类型的变量默认为 any
let something;
something = 'seven';
something = 7;

something.setName('Helene');
