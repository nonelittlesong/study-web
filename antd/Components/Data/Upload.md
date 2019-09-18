
- `action<string|(file) => Promise>` - 上传的地址。
- `headers<object>` - 设置上传的请求头。
- `name<string>` - 发到后台的文件参数名，默认 file。


## 例子
### 1、 在 Form 中使用 Upload
```js
normFile = e => {
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
