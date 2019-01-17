jQuery遮罩插件。  
官网： http://malsup.com/jquery/block/  

The jQuery BlockUI Plugin lets you simulate synchronous behavior when using AJAX, without locking the browser[1]. When activated, it will prevent user activity with the page (or part of the page) until it is deactivated. BlockUI adds elements to the DOM to give it both the appearance and behavior of blocking user interaction.  

Usage is very simple; to block user activity for th page:  
```js
$.blockUI();
```
Blocking with a custom message:  
```js
$.blockUI({ message: '<h1><img src="busy.gif" /> Just a moment...</h1>' } );
```
Blocking with custom style:  
```js
$.blockUI({ css: { backgroundColor: '#f00', color: '#fff'} });
```
To unblock the page:
```js
$.unblockUI();
```
If you want to use the default settings and have the UI blocked for all ajax requests, it's as easy as this:  
```js
$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
```

# 一、 [Page Blocking](http://malsup.com/jquery/block/#page)
```js
<script type="text/javascript">
  // unblock when ajax activity stops
  $(document).ajaxStop($.unblockUI);
  
  function test() {
    $.ajax({ url: 'wait.php', cache: false });
  }
  
  $(document).ready(function() {
    $('#pageDemo1').click(function() {
      $.blockUI();
      test();
    });
    $('#pageDemo2').click(function() {
      $.blockUI({ message: '<h1><img src="busy.gif" /> Just a moment...</h1>' });
      test();
    });
    $('#pageDemo3').click(function() {
      $.blockUI({ css: { backgroundColor: '#f00', color: '#fff' } });
      test();
    });
    $('#pageDemo4').click(function() {
      $.blockUI({ message: $('#domMessage') });
      test();
    });
  });
```

# 二、 [Element Blocking](http://malsup.com/jquery/block/#element)
```js
<script type="text/javascript">
  $(document).ready(function() {
    $('#blockButton').click(function() {
      $('div.test').block({message:null});
    });
    
    $('#blockButton2').click(function() {
      $('div.test').block({
        message: '<h1>Processing</h1>',
        css: { border: '3px solid #a00' }
      });
    });
    
    $('#unblockButton').click(function() { 
      $('div.test').unblock(); 
    }); 
 
    $('a.test').click(function() { 
      alert('link clicked'); 
      return false; 
    }); 
  }); 
</script>
```

# 三、 [Modal Dialogs](http://malsup.com/jquery/block/#dialog)
```
<script type="text/javascript>
  $(document).ready(function() {
    $('#test').click(function() {
      $.blockUI({message: $('#question'), css: {width: '275px'} });
    });
    
    $('#yes').click(function() {
      $.blockUI({ message: "<h1>Remote call in progress...</h1> });
      $.ajax({
        url: 'wait.php',
        cache: false,
        complete: function() {
          $.unblockUI();
        }
      });
    });
    
    $('#no').click(function() {
      $.unblockUI();
      return false;
    });
  });
</script>
...
<input id="test" type="submit" value="Show Dialog" />
...
<div id="question style="display:none; cursor: default">
  <h1>Would you like to continue?</h1>
  <input type="button" id="yes" value="yes"/>
  <input type="button" id="no" value="no"/>
</div>
```
