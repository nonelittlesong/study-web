# [$emit](https://blog.csdn.net/sllailcp/article/details/78595077)

# [Failed To Mount Component](https://stackoverflow.com/questions/45964665/vuejs-failed-to-mount-component)
问题描述：  
```
Failed to mount component: template or render function not defined.

found in
---> <Anonymous>
       <Root>
```
解决方案：  
Try adding `.default` to the end of your require().  
```js
component: require('./index/index.vue').default
```
