
# Sass 变量

语法：`$<variable>: <expression>`

```scss
$base-color: #c6538c;
$border-dark: rgba($base-color, 0.88);

.alert {
  border: 1px solid $border-dark;
}
```

变量必须以 `$` 开头。

## 1. 比较 CSS 变量

- Sass 变量是命令式的，当你改变一个变量的值，之前使用的变量保留原值  
  CSS 变量是声明式的，当你改变一个变量的值，之前和之后的值都会改变

>Sass 的变量中，`-` 和 `_` 是等价的。早期的 Sass 不支持 `-`，后来为了匹配 CSS 语法，加入了 `_`。为了便于迁移，所以让二者等价。

## 2. 默认值

语法：`$<variable>: <default-value> !default`

常用于模块导出，模块导入语法：

```scss
@use <url> with {
  $<variable>: <new-value>,
  $<variable>: <new-value>
};
```

## 3. 内置变量

内置变量不能修改：

```scss
@use 'sass:math' as math;

// This assignment will fail
math.$pi: 0;
```

## 4. 作用域

- 在文件最高层声明的变量，作用域是 `global`
- 花括号中声明的变量，作用域是 `local`

### 4.1. 局部覆盖全局

局部变量可以和全局变量同名，在局部作用域中，覆盖全局变量。

`!global` 标志，可在局部作用域中访问全局变量。`!global` 只能访问已存在的全局变量，不能用于定义一个新的变量。

### 4.2. 流程控制域

和其他语言的语法类似：

```scss
$dark-theme: true !default;
$primary-color: #f8bbd0 !default;
$accent-color: #6a1b9a !default;

@if $dark-theme {
  $primary-color: darken($primary-color, 60%);
  $accent-color: lighten($accent-color, 60%);
}

.button {
  background-color: $primary-color;
  border: 1px solid $accent-color;
  border-radius: 3px;
}
```

>和局部域一样，流程控制域可以对外层变量赋值，但变量必须已经存在。

## 5. 高级变量方法

- `meta.variable-exists()` — 指定的变量是否在当前作用域中存在
- `meta.global-variable-exists()` — 指定的变量是否在全局作用域中存在

## 6. map

```scss
@use "sass:map";

$theme-colors: (
  "success": #28a745,
  "info": #17a2b8,
  "warning": #ffc107,
);

.alert {
  // Instead of $theme-color-#{warning}
  background-color: map.get($theme-colors, "warning");
}
```
