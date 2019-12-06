

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | [上传文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string | 无 |
| directory | 上传文件夹 | boolean | false |
| beforeUpload | 返回 false 停止上传。支持 Promise | (file, fileList) => boolean \| Promise | 无 |
| fileList | 已经上传的文件列表 | object\[] | 无 |
| listType | 上传文件列表的样式，text，picture和picture-card | string | 'test' |
| multiple | 是否支持多选文件上传 | boolean | false |
| onChange | 长传中、完成、失败都会调用这个函数 | Function | 无 |
| onRemove | 点击移除文件时回调，返回值是 false 时不移除。支持 Promise | Function(file): boolean \| Promise | 无 |


## 例子
### 1、 在 Form 中使用 Upload
```js
formFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

...

<Form.Item label="Upload" extra="longgggggggggggggggggggggggggggggggggg">
  {getFieldDecorator('upload', {
    valuePropName: 'fileList',
    getValueFromEvent: this.normFile,
  })(
    <Upload name="logo" action="/upload.do" listType="picture">
      <Button>
        <Icon type="upload" /> Click to upload
      </Button>
    </Upload>,
  )}
</Form.Item>
```
