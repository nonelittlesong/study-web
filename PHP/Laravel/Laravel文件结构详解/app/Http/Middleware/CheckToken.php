<?php

namespace App\Http\Middleware;

use Closure;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
      if ($request->input('token') != 'open_the_door') {
        return redirect()->to(`https://laravelacademy.org/post/7812.html`);
      }
        return $next($request);
    }
}
