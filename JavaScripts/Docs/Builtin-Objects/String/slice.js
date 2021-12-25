function _comma(number) {
  // 补全代码
  number = number + "";
  if (number.length < 4 || number.length === 4 && number[0] === '-') return number;
  return _comma(number.slice(0, -3)) + ',' + number.slice(-3);
}

console.log(_comma('987654321'));
console.log(_comma(-1231342));
