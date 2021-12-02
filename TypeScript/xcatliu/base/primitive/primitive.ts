
// ~ boolean & Boolean
// =========================================================================================

let isDone: boolean = false;

// 使用 Boolean 创造的对象不是布尔值
let createByNewBoolean: boolean = new Boolean(1);
// Type 'Boolean' is not assignable to type 'boolean'.
//   'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.

let createByNewBoolean2: Boolean = new Boolean(1);

// 直接调用 Boolean 返回一个 boolean 类型
let createByNewBoolean3: boolean = Boolean(1);

// ~ number
// ==========================================================================================

let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binLiteral: number = 0b1010;
let octLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;

// 二进制和八进制（ES6），会被编译成十进制。

// ~ string
// ==========================================================================================

let myName: string = 'Helene';
let myAge: number = 27;

let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;

// ~ void
// ==========================================================================================

function alertName(): void {
  alert('My name is Helene.');
}

// 声明一个 void 变量，只能赋值 undefined 和 null(只在 --strictNullChecks 未指定时)
let usuable: void = undefined;

// ~ null & undefined
// ==========================================================================================

let u: undefined = undefined;
let n: null = null;

// 与 void 的区别是，null & undefined 是所有类型的子类型？
// tsconfig 的 strict 设为 true 会报错
let num: number = undefined;

let u2: undefined;
let num2: number = u2;
