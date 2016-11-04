<?php
$appId = "dd0d3a4f-8882-492e-b1c2-62149dcfe814";
$appSecret = "8bd7022e-9adb-4a0a-a07d-9fd9ec19054d";
$title = "买车吧定金支付";
$amount = 100000;//支付总价
$out_trade_no = "bc".time();//订单号，需要保证唯一性
//1.生成sign
$sign = md5($appId.$title.$amount.$out_trade_no.$appSecret);
?>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>订单支付—买车吧</title>
</head>
<body>
<button id="test">支付</button>


<!--2.添加控制台->APP->设置->秒支付button项获得的script标签-->
<script id='spay-script' src='https://jspay.beecloud.cn/1/pay/jsbutton/returnscripts?appId=dd0d3a4f-8882-492e-b1c2-62149dcfe814'></script>
<script>
    //3. 需要发起支付时(示例中绑定在一个按钮的click事件中),调用BC.click方法
    document.getElementById("test").onclick = function() {
        asyncPay();
    };
    function bcPay() {
        BC.click({
            "title": "<?php echo $title; ?>",
            "amount": <?php echo $amount; ?>,
            "out_trade_no": "<?php echo $out_trade_no;?>", //唯一订单号
            "trace_id" : "testcustomer", //付款人标识,
            "sign" : "<?php echo $sign;?>",
            /**
             * optional 为自定义参数对象，目前只支持基本类型的key ＝》 value, 不支持嵌套对象；
             * 回调时如果有optional则会传递给webhook地址，webhook的使用请查阅文档
             */
            "optional": {"test": "willreturn"}
        });

    }
    function asyncPay() {
        if (typeof BC == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('beecloud:onready', bcPay, false);
            }else if (document.attachEvent){
                document.attachEvent('beecloud:onready', bcPay);
            }
        }else{
            bcPay();
        }
    }
</script>
</body>
</html>