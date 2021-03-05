<?php

namespace App\Http\Controllers;

use App\DataModel;
use App\GrowthRateModel;
use Illuminate\Http\Request;
use Validator;

class DataController extends Controller
{
    function AddData(Request $request) {
        $validator = Validator::make($request->all(),[
            "prgId" => "required", // 프로그램 id
            "tempValue" => "required", // 데이터 값
            "humiValue" => "required",
        ]);

        if($validator->fails())
            return response($validator->errors(), 400);

        $tempResult = DataModel::insert([
            'prgid' => $request->prgId,
            'value' => $request->tempValue,
            'type' => 'temperature',
        ]);

        if(!$tempResult)
            return response('온도 값 추가 실패', 403);

        $humiResult = DataModel::insert([
            'prgid' => $request->prgId,
            'value' => $request->humiValue,
            'type' => 'humidity',
        ]);

        if(!$humiResult)
            return response('습도 값 추가 실패', 403);

        return response('성공', 201);
    }

    function GetDataToLastlogout(Request $request) {
        $validator = Validator::make($request->all(),[
            "prgId" => "required",
            "date" => "required"
        ]);

        if($validator->fails())
            return response($validator->errors(), 400);

        // 유저 아이디로 마지막 로그인 날짜 획득
        $tempArray = DataModel::select('value', 'date')->whereRaw(
            'type="temperature" and prgid=? and date >= date_format(?, "%Y-%m-%d %H:%i:%S")', [
            $request->prgId,
            $request->date])->orderBy('date')->get();

        $humiArray = DataModel::select('value', 'date')->whereRaw(
            'type="humidity" and prgid=? and date >= date_format(?, "%Y-%m-%d %H:%i:%S")', [
            $request->prgId,
            $request->date])->orderBy('date')->get();

        return response([
            "temperature" => $tempArray,
            "humidity" => $humiArray
        ], 200);
    }

    function GetDataToHour(Request $request) {
        $validator = Validator::make($request->all(),[
            "prgId" => "required",
        ]);

        if($validator->fails())
            return response($validator->errors(), 400);

        $settingTable = DataModel::select('value', 'date');
        $growthTable = GrowthRateModel::select('gr_value')
                        ->where('gr_prgid', '=', $request->prgId);

        $tempTable =  clone $settingTable;
        $tempArray = $tempTable->where([
            'prgid' => $request->prgId,
            'type' => 'temperature'
        ])->orderBy('date')->get();

        $humiTable =  clone $settingTable;
        $humiArray = $humiTable->where([
            'prgid' => $request->prgId,
            'type' => 'humidity'
        ])->orderBy('date')->get();

        return response([
            'growthRate' => $growthTable->get(),
            'temperature' => $tempArray,
            'humidity' => $humiArray
        ], 200);
    }
}