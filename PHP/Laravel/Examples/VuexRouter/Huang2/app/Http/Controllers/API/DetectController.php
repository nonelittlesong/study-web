<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class DetectController extends Controller
{
    function getResult() {
        $resultStr = "";

        $handle = fopen('/home/song/Desktop/result.txt', 'r');
        if (!feof($handle)) {
            $resultStr = fgets($handle);
        }

        $resultArray = json_decode($resultStr, true);
        $resultArray["resultStr"] = $resultArray["resultStr"] ? "FAIL" : "PASS";

        return $resultArray; // 自动转为json

        //$resultStr = mt_rand(0, 1) ? 'PASS' : 'FAIL';
        //return response()->json($resultArray);
    }
}
