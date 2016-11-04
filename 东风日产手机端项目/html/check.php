<?php

$appId = "dd0d3a4f-8882-492e-b1c2-62149dcfe814";
$appSecret = "8bd7022e-9adb-4a0a-a07d-9fd9ec19054d";
$title = "买车吧购车定金";

$out_trade_no = $_POST['oid'];

$amount = $_POST['price'];

//1.生成sign
$sign = md5($appId.$title.$amount.$out_trade_no.$appSecret);
echo  json_encode($sign); exit;

?>