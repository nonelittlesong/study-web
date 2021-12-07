
// 在声明时赋值，需要同时指定元组中所有的项
let tuple: [string, number] = ['KCC', 24];

tuple[0] = 'Kang';
tuple[1] = 21;

tuple[0].slice(1);
tuple[1].toFixed(2);

// ~ 越界的元素
// ======================================================================================

// push 越界的元素，类型为每个元素的联合类型
let tuple2: [string, number] = ['ss', 11];
tuple2.push('kcc');
tuple2.push(true);
// Argument of type 'true' is not assignable to parameter of type 'string | number'.
