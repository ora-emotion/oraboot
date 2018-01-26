<%--
  Created by IntelliJ IDEA.
  User: JZW
  Date: 2017/12/19
  Time: 17:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>橘子情感薪资计算器</title>
    <meta content="telephone=no" name="format-detection" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
    <script src="js/jq/jquery-3.2.1.min.js"></script>
    <style>
        input, textarea, select{font-family:inherit;font-size:inherit;font-weight:inherit;-webkit-appearance: none;outline:none;-webkit-outline:none;} .box-1{width: 90%; height: auto; float: left; border: 1px solid #e6a74b; margin-left: 5%; border-radius: 5px; margin-top: 30px; padding-top: 15px; padding-bottom: 15px; margin-bottom: 15px;} .box-1 input{width: 80%; height: 35px; float: left; margin-left: 10%; border: 1px solid #e4e4e4; background: none; font-size: 13px; color: #e6a74b; margin-bottom: 5px; box-sizing: border-box; padding-left: 10px; border-radius: 4px;} .box-1 label{line-height: 16px; padding-top: 3px; padding-bottom: 3px; font-size: 14px; float: left; color: #e6a74b; margin-left: 10%; border: 1px dashed #e6a74b; border-radius: 3px; padding-left: 10px; padding-right: 10px; margin-bottom: 10px;} .box-1 span{line-height: 11px; font-size: 11px; float: left; color: #a5a5a5; margin-left: 10%; border-radius: 20px; padding-left: 10px; padding-right: 10px; margin-top: 2px; margin-bottom: 17px; width: 80%;} .box-1 .h-box{width: 80%; height: auto; float: left; margin-left: 10%; border: 1px solid #e6a74b; padding-top: 10px; padding-bottom: 10px; margin-bottom: 25px;} .box-1 .h-box .bo{width: 14%; height: 25px; border: 1px solid #8e8e8e; text-align: center; line-height: 25px; font-size: 14px; color: #8e8e8e; float: left; border-radius: 3px; margin-left: 5%; margin-right: 5%; margin-top: 3px; margin-bottom: 3px;} .box-1 .h-box .bos{width: 22.4%; height: 25px; border: 1px solid #8e8e8e; text-align: center; line-height: 25px; font-size: 14px; color: #8e8e8e; float: left; border-radius: 3px; margin-left: 5%; margin-right: 5%; margin-top: 3px; margin-bottom: 3px;} .box-1 .h-box .opt{border: 1px dashed #ffb854; color: #fff; background: #cc8851; border-radius: 18px 0px 18px 0px ;} .box-1 .qq{width: 80%; height: 40px; text-align: center; background: #e6a74b; color: #fff; line-height: 40px; border-radius: 5px; font-size: 16px; float: left; margin-top: 20px; margin-bottom: 15px; margin-left: 10%;} .box-2{width: 90%; height: auto; float: left; border: 1px solid #e6a74b; margin-left: 5%; border-radius: 5px; margin-top: 30px; padding-top: 15px; padding-bottom: 15px; margin-bottom: 15px; display: none;} .box-2 .lis-n{width: 100%; float: left; line-height: 30px;} .box-2 .lis-n em{font-size: 16px; color: #e6a74b; font-style: normal; font-weight: bold; text-indent: 15px; float: left;} .box-2 .lis-n label{height: 30px; line-height: 30px; color: #444; font-weight: bold; font-size: 18px; margin-left: 10px; border: 1px dashed #e6a74b; border-radius: 5px; padding-left: 5px; padding-right: 5px; padding-top: 3px; padding-bottom: 3px;} #aas{color: #fc7c00;} .box-2 .lis-n span{width: 100%; float: left; color: #999; text-align: center;} .box-2 .lis-n span i{font-style: normal; color: #e6a74b;} .box-2 .back-s{width: 80%; height: 40px; text-align: center; background: #e6a74b; color: #fff; line-height: 40px; border-radius: 5px; font-size: 16px; float: left; margin-top: 20px; margin-bottom: 15px; margin-left: 10%;} #date{border: 0; font-size: 14px; color: #444;}
    </style>
</head>
<body style="background: #2b2b2b">
<!--主体-->
<div class="main-box">
    <div>
        <div class="box-1">
            <label>请输入每天平均收入</label>
            <input type="text" id="zq" placeholder="请输入总金额">
            <span>"平均收入=到手薪资/上班天数"</span>
            <label>请选择上班时间</label>
            <input type="hidden" id="shij" value="2017/5/22 09:30:00"  placeholder="请输入上班时间 例:2017/5/22 09:30:00">
            <div class="h-box">
                <div class="bos opt">06:00</div>
                <div class="bos">06:30</div>
                <div class="bos">07:00</div>
                <div class="bos">07:30</div>
                <div class="bos">08:00</div>
                <div class="bos">08:30</div>
                <div class="bos">09:00</div>
                <div class="bos">09:30</div>
                <div class="bos">10:00</div>
                <div class="bos">10:30</div>
                <div class="bos">11:00</div>
                <div class="bos">11:30</div>
                <div class="bos">12:00</div>
            </div>
            <label>请选择上班小时数</label>
            <div class="h-box">
                <div class="bo opt">5</div>
                <div class="bo">6</div>
                <div class="bo">7</div>
                <div class="bo">8</div>
                <div class="bo">9</div>
                <div class="bo">10</div>
                <div class="bo">11</div>
                <div class="bo">12</div>
            </div>
            <span>(上班小时数,必须包括午休时间)</span>
            <input type="hidden" id="hhs" placeholder="请输入上班小时数 例:9">
            <div class="qq">开始计算</div>
        </div>

        <div class="box-2">
            <div class="lis-n">
                <em>实时进账:</em>
                <label id="aas">$3513</label>
            </div>

            <div class="lis-n">
                <em>每毫秒:</em>
                <label id="a2"></label>
            </div>

            <div class="lis-n">
                <em>每秒:</em>
                <label id="aa"></label>
            </div>

            <div class="lis-n">
                <em>每分钟:</em>
                <label id="a1"></label>
            </div>


            <div class="lis-n">
                <em>每小时:</em>
                <label id="a"></label>
            </div>

            <div class="lis-n">
                <em>每天:</em>
                <label id="as"></label>
            </div>

            <div class="lis-n">
                <em>当前时间:</em>
                <label id="date"></label>
            </div>

            <div class="lis-n">
                <span>距离下班时间还剩:<i id="a123"></i></span>
            </div>

            <div class="back-s">返回-重新计算</div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(".bo").click(function(){
        $(".bo").removeClass('opt');
        $(this).addClass("opt");
        var hhs = $(this).text();
        $("#hhs").val(hhs);
    });
    $('.bos').click(function(){
        $('.bos').removeClass('opt');
        $(this).addClass("opt");
        var hs = $(this).text(); /*时间*/
        var dates=new Date(); /*日期*/
        $("#shij").val(dates.toLocaleDateString()+" "+hs);
    });
    var aas;
    function aa(zq,shij,hhs){
        var me = zq; /*总*/
        var mm = 3600*hhs; /*1小时 = 3600秒   9小时*3600 = 32400秒*/
        var ms = (me/mm); /*每秒 - m*/

        var date1=new Date(shij);    //开始时间
        var date2=new Date();//当前时间
        var date3=date1.getTime()-date2.getTime(); //时间差秒
        //计算出相差天数
        var days=Math.floor(date3/(24*3600*1000));
        //计算出小时数
        var leave1=date3%(24*3600*1000); //计算天数后剩余的毫秒数
        var hours=Math.abs(Math.floor(leave1/(3600*1000))+1);
        //计算相差分钟数
        var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
        var minutes=Math.abs(Math.floor(leave2/(60*1000)));
        var leave3=leave2%(60*1000);     //计算分钟数后剩余的毫秒数
        var seconds=Math.abs(Math.round(leave3/1000));
        var sh = (3600*hours)+(minutes*60)+seconds;
        var va = sh;
        function formatSeconds(value) {
            var theTime = parseInt(value);// 秒
            var theTime1 = 0;// 分
            var theTime2 = 0;// 小时
            if(theTime > 60) {
                theTime1 = parseInt(theTime/60);
                theTime = parseInt(theTime%60);
                if(theTime1 > 60) {
                    theTime2 = parseInt(theTime1/60);
                    theTime1 = parseInt(theTime1%60);
                }
            }
            var result = ""+parseInt(theTime)+"秒";
            if(theTime1 > 0) {
                result = ""+parseInt(theTime1)+"分"+result;
            }
            if(theTime2 > 0) {
                result = ""+parseInt(theTime2)+"小时"+result;
            }
            return result;
        }

        aas =  setInterval(function(){
            va++;
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            $("#aas").html("￥:"+(va*ms).toFixed(2));
            $("#a2").html((ms/10).toFixed(4));
            $("#aa").html(ms.toFixed(3));
            $("#a1").html((ms*60).toFixed(2));
            $("#a").html((me/9).toFixed(2));
            $("#date").html(year+'年'+month+'月'+day+'日'+hour+':'+minute+':'+second);
            $("#as").html(me/9*9);
//            console.log(formatSeconds(mm-va));
            $("#a123").html(formatSeconds(mm-va));
        },1000);
    }

    $('.qq').click(function(){
        clearInterval(aas);
        var zq = $("#zq").val();
        var shij = $("#shij").val();
        var hhs = $("#hhs").val();
        aa(zq,shij,hhs);
        $(".box-1").hide();
        $(".box-2").show();
    });

    $(".back-s").click(function(){
        $(".box-2").hide();
        $(".box-1").show();
    });

</script>
</body>
</html>
