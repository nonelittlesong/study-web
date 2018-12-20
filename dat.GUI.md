```js

  // GUI
  control = {
    particleNum: 100 // 初始100个粒子
  };
  
  gui = new dat.GUI(); // dat.GUI插件
  
  gui
    .add(control, "particleNum", 0, 500)
    .step(1) // 步长
    .name("Particle Num")
    .onChange(function() { // 拖动进度条事件处理
      var n = (control.particleNum | 0) - particles.length;
      if (n > 0) addParticle(n);
      else if (n < 0) removeParticle(-n);
  });
  
  gui
    .add(GravityPoint, "interferenceToPoint")
    .name("Interference Between Point");
  gui.close();
  
```
