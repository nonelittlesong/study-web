// ~ 值可重复
// ========================================================================================
enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days['Sun']);
console.log(Days['Wed']);
console.log(Days[3]);

// ~ 值可以不是数字
// ========================================================================================
//enum Days2 {Sun = 'Sun', Mon, Tue, Wed, Thu, Fri, Sat};
enum Days2 {Sun, Mon, Tue, Wed, Thu, Fri, Sat= 'Sat'};

console.log(Days2['Sun']); // 0
console.log(Days2['Mon']); // 1
console.log(Days2['Sat']); // Sat
console.log(Days2[6]);     // undefined

// ~ 小数
// ========================================================================================
enum Days3 {Sun = 7, Mon = -1.2, Tue, Wed, Thu = 1.2, Fri, Sat};

console.log(Days3['Sun']); // 7
console.log(Days3['Mon']); // -1.2
console.log(Days3['Tue']); // -0.19999999999999996
console.log(Days3['Wed']); // 0.8
console.log(Days3['Thu']); // 1.2
console.log(Days3['Fri']); // 2.2
console.log(Days3['Sat']); // 3.2
