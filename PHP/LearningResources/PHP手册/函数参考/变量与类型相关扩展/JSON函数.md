# json_decode
说明：  
`json_decode( string $json [, bool $assoc = false [, int $depth = 512 [, int $options = 0 ]]] ) : mixed`  
参数：  
* assoc - 当该参数为true时，将返回array而非object。  
* options - JSON解码的掩码选项。 现在有两个支持的选项。 第一个是JSON_BIGINT_AS_STRING， 用于将大整数转为字符串而非默认的float类型。第二个是 JSON_OBJECT_AS_ARRAY， 与将assoc设置为 TRUE 有相同的效果。  
