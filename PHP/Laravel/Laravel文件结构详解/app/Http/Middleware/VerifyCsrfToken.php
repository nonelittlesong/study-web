<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     * 添加不需要进行CSRF验证的URIs
     * 419状态码
     *
     * @var array
     */
    protected $except = [
        //
    ];
}
