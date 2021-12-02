
interface Person {
  name: string;
  age: number;
}

let helene: Person = {
  name: 'Helene',
  age: 27
};

// ~ 赋值的时候，变量的形状必需和接口保持一致
// =========================================================================================

// 属性不能少
let kcc: Person = {
  name: 'KCC';
};
// Type '{ name: string; }' is not assignable to type 'Person'.
//   Property 'age' is missing in type '{ name: string; }'.

// 属性不能多
let song: Person = {
  name: 'Song',
  age: 23,
  gender: 'male'
};

// ~ 可选属性
// =========================================================================================

interface Man {
  name: string;
  age?: number;
}

let helene2: Man = {
  name: 'Helene'
};

// ~ 任意属性
// =========================================================================================

interface People {
  name: string;
  age?: number;
  [propName: string]: any;
}

let helene3: People = {
  name: 'Helene',
  gender: 'female'
};

// 确定属性和可选属性类型必须是任意属性类型的子集
// 在3.9.3中，如果同时存在任意属性、可选属性，那么任意属性的数据类型要带 undefined

interface Person2 {
  name: string;
  age?: number;
  [propName: string]: string;
}

let tom2: Person2 = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};
// error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.

// * 一个接口只能定义一个任意属性

// ~ 只读属性
// =========================================================================================

// 只能在创建的时候被赋值

interface PersonReadonly {
  readonly id : number;
  name: string;
  age?: number;
  [x: string]: string | number | undefined;
}

let readonly_tom: PersonReadonly = {
  id: 89757,
  name: 'Tom',
  gender: 'male'
};

tom.id = 9527;
// error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.

// 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
interface Personx {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Personx;

tom = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;
// error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
