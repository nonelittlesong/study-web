# CSS选择器

- `>儿子` — 只选儿子不选孙子
- `+弟弟` — 选紧跟在后面的弟弟
- `~弟弟们` — 选择后面所有的弟弟

| 选择器 | 例子 | 例子描述 |
| --- | --- | --- |
| `*` | * | 选择所有元素 |
| 层级 | | |
| `element,element` | div,p | 选择所有 div 和 p 元素 |
| `element element` | div p | 选择 div 内的所有 p 元素 |
| 属性 | | |
| `[attribute]` | \[target] | 选择有 target 属性的所有元素 |
| `[attribute=value]` | \[target=\_blank] | 选择 target="\_blank" 的元素 |
| `[attribute~=value]` | \[title~=flower] | 选择 title 属性包含单词 flower 的所有元素 
| `[attribute|=value]` | \[lang\|=en] | 选择属性 lang 以 en 开头的所有元素 |
| `[attribute^=value]` | a\[src^="https"] | 选择 src 属性以 https 开头的所有 a 元素 |
| `[attirbute$=value]` | a\[src$=".pdf"] | 选择 src 属性以 .pdf 结尾的所有 a 元素 |
| `[attribute*=value]` | a\[src*="abc"] | 选择 src 属性包含 abc 的每个 a 元素 |
| 伪类 | | |
| `:root` | :root | 选择文档的根元素 |
| `:link` | a:link | 选择所有【未被访问】的链接 |
| `:visited` | a:visited | 选择所有已被访问的链接 |
| `:active` | a:active | 用户按下和松开之间 |
| `:hover` | a:hover | 选择鼠标指针位于其上的链接 |
| `:focus` | input:focus | 选择获得焦点的input元素 |
| `:first-child` | p:first-child | 选择属于其父元素第一个儿子的 p 元素 |
| `:last-child` | p:last-child | 选择属于其父元素最后一个儿子的 p 元素 |
| `:only-child` | p:only-child | 选择属于其父元素唯一儿子的 p 元素 |
| `:nth-child(n)` | p:nth-child(2) | 选择属于其父元素第二个儿子的 p 元素 |
| `:nth-last-child(n)` | p:nth-last-child(2) | 同上，从最后一个儿子开始计数 |
| `:first-of-type` | p:first-of-type | 选择属于其父元素首个 p 元素的 p 元素 |
| `:last-of-type` | p:last-of-type | 选择属于其父元素最后一个 p 元素的 p 元素 |
| `:only-of-type` | p:only-of-type | 选择属于其父元素唯一 p 元素的 p 元素 |
| `:nth-of-type(n)` | p:nth-of-type(2) | 选择属于其父元素第二个 p 元素的 p 元素 |
| `:nth-last-of-type(n)` | p:nth-last-of-type(2) | 同上，但从最后一个子元素开始计数 |
| `:lang(language)` | p:lang(it) | 选择带有以 it 开头的 lang 属性值的 p 元素 |
| `:empty` | p:empty | 选择没有子元素的所有 p 元素（包括文本节点） |
| `:target` | #news:target | 选择 id 与当前 URL 片段匹配的元素 |
| `:enabled` | input:enabled | 选择每个启用的 input 元素 |
| `:disabled` | input:disabled | 选择每个禁用的 input 元素 |
| `:checked` | input:checked | 选择每个被选中的 input 元素（radio、checkbox、option） |
| `:not(selector)` | :not(p) | 选择不是 p 的所有元素 |
| 伪元素 | | |
| `::before` | p::before | 在每个 p 元素的内容之前插入元素 |
| `::after` | p::after | 在每个 p 元素的内容之后插入元素 |
| `::first-letter` | p:first-letter | 选择每个 p 元素的首字母 |
| `::first-line` | p:first-line | 选择每个 p 元素的首行 |
| `::selection` | ::selection | 选择被用户选取的元素部分 |

一些简单的没有记录。。。

### [css 中能否选取父元素？](https://www.zhihu.com/question/20443379)
