用 div 实现 textarea。  

```css
#textarea {
  height: 200px;
  width: 250px;
  padding: 5px;
  border: 1px solid #888;
  resize: vertical;
  overflow: auto;
}

#textarea:empty:before {
  content: attr(placeholder);
  color:#bbb;
}
```

```htm
<!DOCTYPE html>
<html>
<head>
  <title>implements textarea with div></div>
</head>
<body>
  <div id="textarea" contenteditable="true" placeholder="edit here"></div>
</body>
</html>
```
