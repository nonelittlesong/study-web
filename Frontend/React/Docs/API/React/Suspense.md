```jsx
<Suspense fallback={<h1>加载中...</h1>}>
  <ProfilePhoto />
  <ProfileDetails />
</Suspense>
```

`Suspense` 让你的组件在渲染前进行“等待”，并在等待时显示 fallback 的内容。  
