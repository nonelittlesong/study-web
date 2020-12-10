const fs = require('fs');

const data = '20200522_back_Black_split/20200522-133312/side/label_0/0_6_4_47.png_';
const data2 = '20200522_back_Black_split/20200522-133312/side/label_0/0_6_4_47.png';
console.log(data.length); // 63
const re = /[0-9]+/;
const re_g = /[0-9]+/g;

const result1 = data.match(re);
console.log(result1);
// 输出
// [ '20200522',
//   index: 0,
//   input: '20200522_back_Black_split/20200522-133312/side/label_0/0_6_4_37.png',
//   groups: undefined ]
console.log(result1[0]); // 20200522
console.log(result1[1]); // undefined
console.log(result1['index']); //0
console.log(re.lastIndex); // 0

const result2 = re.exec(data);
console.log(result2);
// 输出
// [ '20200522',
//   index: 0,
//   input: '20200522_back_black_split/20200522-133312/side/label_0/0_6_4_37.png',
//   groups: undefined ]
console.log(re.lastIndex); // 0

const result1_g = data.match(re_g);
console.log(result1_g);    
// 输出
// [ '20200522', '20200522', '133312', '0', '0', '6', '4', '37' ]
console.log(re_g.lastIndex); //0

let result2_g = re_g.exec(data)
console.log(result2_g);
console.log(re_g.lastIndex); //8
console.log(data.substring(8, 26)) // _back_black_split/
result2_g = re_g.exec(data)
console.log(result2_g);
console.log(re_g.lastIndex); //34
result2_g = re_g.exec(data)
console.log(result2_g);
console.log(re_g.lastIndex); //41
result2_g = re_g.exec(data)
console.log(result2_g);
console.log(re_g.lastIndex); //54
result2_g = re_g.exec(data)
console.log(result2_g);
console.log(re_g.lastIndex); //56
result2_g = re_g.exec(data)
console.log(result2_g);
console.log(re_g.lastIndex); //58
result2_g = re_g.exec(data)
console.log(result2_g);
console.log(re_g.lastIndex); //60
result2_g = re_g.exec(data)
console.log(result2_g);
console.log(re_g.lastIndex); //63
result2_g = re_g.exec(data)
console.log(result2_g);      //null
console.log(re_g.lastIndex); //0

/**
 * JS 实现 python 的 re.split()
 * @param {RegExp} reg
 * @param {String} str 
 */
function reSplit(reg, str) {
  const newReg = new RegExp(reg, 'g');
  console.log(newReg.global); // 只读属性
  
  const splitArray = [];
  
  let results = newReg.exec(str);
  let preIndex = 0;
  while (null !== results) {
    if (results['index'] > preIndex) {
      splitArray.push(str.substring(preIndex, results['index']));
    }
    splitArray.push(results[0]);

    preIndex = newReg.lastIndex;
    results = newReg.exec(str);
  }
  if (str.length > preIndex) {
    console.log(str.length, preIndex);
    splitArray.push(str.substring(preIndex));
  }

  return splitArray;
}

reSplit(re, data);
reSplit(re_g, data);


console.log('--------- 测试 push null 和 空字符串 ---------');
const pushNull = new Array();
pushNull.push(null);
console.log(pushNull);
pushNull.push(data.substring(10, 10));
console.log(pushNull);

console.log('--------- 测试 reSplit() 函数 ---------');
console.log(reSplit(/[0-9]+/, data));

/**
 * 字符串大写转小写，字符串转数字。
 * @param {Array<String>} strArray
 */
function convert(strArray) {
  // 不能修改原数组
  // for (let str of strArray) {
  //   if (parseInt(str)) {
  //     str = parseInt(str);
  //   } else {
  //     str.toLowerCase();
  //   }
  // }
  strArray.forEach((value, index, array) => {
    array[index] = parseInt(value) || 0 === parseInt(value) ? parseInt(value) : value.toLowerCase()
  })
  return strArray;
}

console.log('--------- 测试 convert() 函数 ---------');
const testStrArray = reSplit(re, data);
convert(testStrArray)
console.log(testStrArray);

/**
 * 自定义比较字符串的方法。非数字字符按字节码顺序比较，整数比较大小。
 * @param {String} str1
 * @param {String} str2
 */
function myCmpFunc(str1, str2) {
  const str1Array = convert(reSplit(re, str1));
  const str2Array = convert(reSplit(re, str2));

  minLen = (str1Array.length + str2Array.length
           - Math.abs(str1Array.length - str2Array.length)) / 2;
  
  for (let i = 0; i < minLen; ++i) {
    console.log(str1Array[i], str2Array[i])
    if (str1Array[i] < str2Array[i]) {
      return -1;
    } else if (str1Array[i] === str2Array[i]) {
      continue;
    } else {
      return 1;
    }
  }

  if (str1Array.length < str2Array.length) return -1;
  else if (str1Array.length === str2Array.length) return 0;
  else return 1;
}

console.log('--------- 测试 myCmpFunc() ---------')
const datas = [];
datas[1] = data;
datas[0] = data2;
datas.sort(myCmpFunc);
console.log('datas', datas);
