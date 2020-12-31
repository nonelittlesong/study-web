# [throw](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/throw)

throw 用于抛出一个用户自定义的异常。

```js
throw 'Error2'; // generates an exception with a string value
throw 42;       // generates an exception with the value 42
throw true;     // generates an exception with the value true
throw new Error('Required');  // generates an error object with the message of Required
```

## 1. 抛出自定义对象

```js
function UserException(message) {
   this.message = message;
   this.name = 'UserException';
}
function getMonthName(mo) {
   mo = mo - 1; // Adjust month number for array index (1 = Jan, 12 = Dec)
   var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
      'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   if (months[mo] !== undefined) {
      return months[mo];
   } else {
      throw new UserException('InvalidMonthNo');
   }
}

try {
   // statements to try
   var myMonth = 15; // 15 is out of bound to raise the exception
   var monthName = getMonthName(myMonth);
} catch (e) {
   monthName = 'unknown';
   console.error(e.message, e.name); // pass exception object to err handler
}
```