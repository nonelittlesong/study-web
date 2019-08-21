def zoomRequest(self, delta):
    # get the current scrollbar positions
    # calculate the percentages ~ coordinates
    h_bar = self.scrollBars[Qt.Horizontal]
    v_bar = self.scrollBars[Qt.Vertical]

    # get the current maximum, to know the difference after zooming
    h_bar_max = h_bar.maximum()
    v_bar_max = v_bar.maximum()

    # get the cursor position and canvas size
    # calculate the desired movement from 0 to 1
    # where 0 = move left
    #       1 = move right
    # up and down analogous
    cursor = QCursor()
    pos = cursor.pos()
    relative_pos = QWidget.mapFromGlobal(self, pos)

    cursor_x = relative_pos.x()
    cursor_y = relative_pos.y()

    w = self.scrollArea.width()
    h = self.scrollArea.height()

    # the scaling from 0 to 1 has some padding
    # you don't have to hit the very leftmost pixel for a maximum-left movement
    margin = 0.1
    move_x = (cursor_x - margin * w) / (w - 2 * margin * w)
    move_y = (cursor_y - margin * h) / (h - 2 * margin * h)

    # clamp the values from 0 to 1
    move_x = min(max(move_x, 0), 1)
    move_y = min(max(move_y, 0), 1)

    # zoom in
    units = delta / (8 * 15)
    scale = 10
    self.addZoom(scale * units)

    # get the difference in scrollbar values
    # this is how far we can move
    d_h_bar_max = h_bar.maximum() - h_bar_max
    d_v_bar_max = v_bar.maximum() - v_bar_max

    # get the new scrollbar values
    new_h_bar_value = h_bar.value() + move_x * d_h_bar_max
    new_v_bar_value = v_bar.value() + move_y * d_v_bar_max

    h_bar.setValue(new_h_bar_value)
    v_bar.setValue(new_v_bar_value)
    
