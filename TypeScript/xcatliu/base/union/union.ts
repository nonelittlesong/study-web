
let myFavoriteNumber4: string | number;
myFavoriteNumber4 = 'seven';
myFavoriteNumber4 = 7;

// ~ 访问联合类型的属性和方法
// ======================================================================================

// 只能访问共有的属性和方法
function getLength(something: string | number): number {
  return something.length;
}
// Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.

function getString(something: string | number): string {
  return something.toString();
}

// 联合类型变量在被赋值时，会根据类型推论的规则推断出一个类型

let myFavoriteNumber5: number | string;
myFavoriteNumber5 = 'seven';
console.log(myFavoriteNumber5.length);
myFavoriteNumber5 = 7;
console.log(myFavoriteNumber5.length);
// Property 'length' does not exist on type 'number'.
