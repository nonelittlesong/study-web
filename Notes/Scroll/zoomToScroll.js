//
// Mouse wheel event listener
//
canvas_panel.addEventListener('wheel', function(e) {
  if (!_via_current_image_loaded) {
    return;
  }

  let w = canvas_panel.clientWidth;
  let h = canvas_panel.clientHeight;

  let h_bar_max = _via_img_canvas.clientWidth - w > 0 ?
                  _via_img_canvas.clientWidth - w : 0;
  let v_bar_max = _via_img_canvas.clientHeight - h > 0 ?
                  _via_img_canvas.clientHeight - h : 0;
  //console.log(h_bar_max);
  //console.log(v_bar_max);

  let h_bar_value = canvas_panel.scrollLeft;
  let v_bar_value = canvas_panel.scrollTop;

  //console.log(parseInt(_via_reg_canvas.style.marginTop));
  let cursor_x = e.offsetX + (e.target === _via_reg_canvas ?
                 parseInt(_via_img_canvas.style.marginLeft) - h_bar_value : 0);
  let cursor_y = e.offsetY + (e.target === _via_reg_canvas ?
                 parseInt(_via_img_canvas.style.marginTop) - v_bar_value : 0);
  //console.log(`${cursor_x}, ${cursor_y}`);

  let boardland = 0.1;
  let x_rate = (cursor_x - boardland * w) / (w - 2 * boardland * w);
  let y_rate = (cursor_y - boardland * h) / (h - 2 * boardland * h);
  x_rate = Math.min(Math.max(x_rate, 0), 1);
  y_rate = Math.min(Math.max(y_rate, 0), 1);

  if (e.ctrlKey) {
    if (e.deltaY < 0) {
      zoom_in();
    } else {
      zoom_out();
    }

    let d_h_bar_max = (_via_img_canvas.clientWidth - w > 0 ?
                       _via_img_canvas.clientWidth - w : 0) - h_bar_max;
    let d_v_bar_max = (_via_img_canvas.clientHeight - h > 0 ?
                       _via_img_canvas.clientHeight - h : 0) - v_bar_max;
    //console.log(`d_h_bar_max: ${d_h_bar_max}, d_v_bar_max: ${d_v_bar_max}`);
    
    canvas_panel.scrollLeft = h_bar_value + x_rate * d_h_bar_max;
    canvas_panel.scrollTop = v_bar_value + y_rate * d_v_bar_max;
  }

}, false);
