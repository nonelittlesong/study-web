<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogPost extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }
    
    /**
     * 配置验证器实例.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->somethingElseIsInvalid()) {
                $validator->errors()->add('field', 'Something is wrong with this field!');
            }
        });
    }
    
    /**
 * 获取被定义验证规则的错误消息
 *
 * @return array
 * @translator laravelacademy.org
 */
    public function messages(){
        return [
            'title.required' => 'A title is required',
            'body.required'  => 'A message is required',
        ];
    }
    
}
