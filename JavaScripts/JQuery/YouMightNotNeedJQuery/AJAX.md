alternatives  
- [fetch https](https://github.com/github/fetch)  

## JSON
jquery  
```js
$.getJSON('/my/url', function(data) {

});
```

IE10+  
```js
var request = new XMLHttpRequest();
request.open('GET', '/my/url', true);

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    var data = JSON.parse(this.response);
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
```

## Post
jquery  
```js
$.ajax({
  type: 'POST',
  url: '/my/url',
  data: data
});
```

IE8+  
```js
var request = new XMLHttpRequest();
request.open('POST', '/my/url', true);
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
request.send(data);
```

## Request
jquery  
```js
$.ajax({
  type: 'GET',
  url: '/my/url',
  success: function(resp) {

  },
  error: function() {

  }
});
```

IE10+  
```js
var request = new XMLHttpRequest();
request.open('GET', '/my/url', true);

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    var resp = this.response;
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
```
