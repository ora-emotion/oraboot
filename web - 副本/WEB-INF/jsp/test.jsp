<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>测试</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
	<script type="text/javascript">
		function checkUpdate(){
			var date = {cnumber:"87456",cname:"哈哈",cage:11,csex:"男",bmtime:"2017-12-31",serdata:100,
			uname:"张三",sname:"sd",state:"正在服务",remark:"无",spec:"11",department_id:1,scheme:"方案",moneyAndTime:"待补款和时间",
			secondUpdate:"二次升级",type:"43"};
			$.ajax({
				type : "post",
				url : "customer/add",
				data : JSON.stringify(date),
				contentType : "application/json;charset=UTF-8",
				dataType : "json",
				success : function(data){
					console.log(data);
				},
				error : function(error){
					console.log("与服务器通讯失败");
				}
			});
		}

		//ajax文件上传
        function test(){
            $.ajax({
                url: 'fileAjax',
                type: 'POST',
                cache: false,
                data: new FormData($('#uploadForm')[0]),
                processData: false,
                contentType: false
            }).done(function(res) {
            }).fail(function(res) {});
        }

	</script>
  </head>
  
  <body>
  	<button onclick="checkUpdate()">
  		测试修改
  	</button>
	<form id="uploadForm" enctype="multipart/form-data">
		<input id="file" type="file" name="file"/>
		<button id="upload" type="button" onclick="test()">upload</button>
	</form>
  </body>
</html>
