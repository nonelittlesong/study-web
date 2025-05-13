# Set

值的相等是基于[零值相等](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness#%E9%9B%B6%E5%80%BC%E7%9B%B8%E7%AD%89)算法的（曾使用会将 0 和 -0 视为不同值的同值算法）。这意味着 NaN 和 NaN 会被视为是相同的值（即使 NaN !== NaN），而所有其他的值则基于 === 运算符的语义进行相等比较。

```js
function sameValueZero(x, y) {
  if (typeof x === "number" && typeof y === "number") {
    // x 和 y 相等（可能是 -0 和 0）或它们都是 NaN
    return x === y || (x !== x && y !== y);
  }
  return x === y;
}
```

## 实例方法

- `add`
- `has`
