<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>用户注册 | 橘子情感</title>

    <!-- import our stylesheet -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/ora.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/ora-register.css">

    <!-- import third-party javascript -->
    <script src="${pageContext.request.contextPath}/js/jq/jquery-3.2.1.min.js" charset="utf-8"></script>

    <!-- import our javascript -->
    <script src="${pageContext.request.contextPath}/js/ora-register.js" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath}/js/ora-register.checkbirthday.js" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath}/js/management/oa.js" charset="utf-8"></script>

    <script type="text/javascript">
      $(function () {
        register.initModule( $('#ora-register') );

        oa.initModule({ $main : $('.ora-register') });
      });
    </script>
  </head>
  <body>
    <div class="ora-register" id="ora-register">
      <div class="ora-register-main">
        <form class="" action="${pageContext.request.contextPath}/register" method="post">
          <!-- Start : 员工编号 -->
          <div class="ora-register-main-mark">
            <span class="text-right">员工编号：</span>
            <input type="text" name="number" value="" placeholder="请输入员工编号">
          </div>
          <!-- End : 员工编号 -->

          <!-- Start : 用户名 -->
          <div class="ora-register-main-username">
            <span class="text-right">用户名：</span>
            <input type="text" name="loginname" value="" placeholder="请输入用户名">
          </div>
          <!-- End : 用户名 -->

          <!-- Start : 密码 -->
          <div class="ora-register-main-password">
            <span class="text-right">密码：</span>
            <input type="password" name="password" value="" placeholder="请设置密码">
          </div>
          <!-- End : 密码 -->

          <!-- Start : 确认密码 -->
          <div class="ora-register-main-confirmpwd">
            <span class="text-right">确认密码：</span>
            <input type="password" name="" value="" placeholder="请确认密码">
          </div>
          <!-- End : 确认密码 -->

          <!-- Start : 姓名 -->
          <div class="ora-register-main-name">
            <span class="text-right">姓名：</span>
            <input type="text" name="uname" value="" placeholder="请输入真实姓名">
          </div>
          <!-- End : 姓名 -->

          <!-- Start : 性别 -->
          <div class="ora-register-main-sex">
            <span class="text-right">性别：</span>
            <label for="male">
              <input id="male" type="radio" name="usex" value="男" checked> 男
            </label>
            <label for="female">
              <input id="female" type="radio" name="usex" value="女"> 女
            </label>
          </div>
          <!-- End : 性别 -->

          <!-- Start : 生日 -->
          <div class="ora-register-main-birthday">
            <span class="text-right">生日：</span>
            <input type="hidden" name="ubirthday" value="">
            <div class="ora-register-main-birthday-choice">
              <span class="text-center ora-register-main-birthday-choice-year">年</span>
              <span class="text-center ora-register-main-birthday-choice-month">月</span>
              <span class="text-center ora-register-main-birthday-choice-day">日</span>
            </div>
            <div class="ora-register-main-birthday-year">
              <div class="ora-register-main-birthday-year-00">
                <span class="ora-register-main-birthday-year-00-title">00：</span>
                <span class="ora-register-main-birthday-year-00-group year-group">
                  <span class="ora-register-main-birthday-year-00-group-item year-item">2009</span>
                  <span class="ora-register-main-birthday-year-00-group-item year-item">2008</span>
                  <span class="ora-register-main-birthday-year-00-group-item year-item">2007</span>
                  <span class="ora-register-main-birthday-year-00-group-item year-item">2006</span>
                  <span class="ora-register-main-birthday-year-00-group-item year-item">2005</span>
                  <span class="ora-register-main-birthday-year-00-group-item year-item">2004</span>
                  <span class="ora-register-main-birthday-year-00-group-item year-item">2003</span>
                  <span class="ora-register-main-birthday-year-00-group-item year-item">2002</span>
                  <span class="ora-register-main-birthday-year-00-group-item year-item">2001</span>
                  <span class="ora-register-main-birthday-year-00-group-item year-item">2000</span>
                </span>
              </div>
              <div class="ora-register-main-birthday-year-90">
                <span class="ora-register-main-birthday-year-90-title">90：</span>
                <span class="ora-register-main-birthday-year-90-group year-group">
                  <span class="ora-register-main-birthday-year-90-group-item year-item">1999</span>
                  <span class="ora-register-main-birthday-year-90-group-item year-item">1998</span>
                  <span class="ora-register-main-birthday-year-90-group-item year-item">1997</span>
                  <span class="ora-register-main-birthday-year-90-group-item year-item">1996</span>
                  <span class="ora-register-main-birthday-year-90-group-item year-item">1995</span>
                  <span class="ora-register-main-birthday-year-90-group-item year-item">1994</span>
                  <span class="ora-register-main-birthday-year-90-group-item year-item">1993</span>
                  <span class="ora-register-main-birthday-year-90-group-item year-item">1992</span>
                  <span class="ora-register-main-birthday-year-90-group-item year-item">1991</span>
                  <span class="ora-register-main-birthday-year-90-group-item year-item">1990</span>
                </span>
              </div>
              <div class="ora-register-main-birthday-year-80">
                <span class="ora-register-main-birthday-year-80-title">80：</span>
                <span class="ora-register-main-birthday-year-80-group year-group">
                  <span class="ora-register-main-birthday-year-80-group-item year-item">1989</span>
                  <span class="ora-register-main-birthday-year-80-group-item year-item">1988</span>
                  <span class="ora-register-main-birthday-year-80-group-item year-item">1987</span>
                  <span class="ora-register-main-birthday-year-80-group-item year-item">1986</span>
                  <span class="ora-register-main-birthday-year-80-group-item year-item">1985</span>
                  <span class="ora-register-main-birthday-year-80-group-item year-item">1984</span>
                  <span class="ora-register-main-birthday-year-80-group-item year-item">1983</span>
                  <span class="ora-register-main-birthday-year-80-group-item year-item">1982</span>
                  <span class="ora-register-main-birthday-year-80-group-item year-item">1981</span>
                  <span class="ora-register-main-birthday-year-80-group-item year-item">1980</span>
                </span>
              </div>
              <div class="ora-register-main-birthday-year-70">
                <span class="ora-register-main-birthday-year-70-title">70：</span>
                <span class="ora-register-main-birthday-year-70-group year-group">
                  <span class="ora-register-main-birthday-year-70-group-item year-item">1979</span>
                  <span class="ora-register-main-birthday-year-70-group-item year-item">1978</span>
                  <span class="ora-register-main-birthday-year-70-group-item year-item">1977</span>
                  <span class="ora-register-main-birthday-year-70-group-item year-item">1976</span>
                  <span class="ora-register-main-birthday-year-70-group-item year-item">1975</span>
                  <span class="ora-register-main-birthday-year-70-group-item year-item">1974</span>
                  <span class="ora-register-main-birthday-year-70-group-item year-item">1973</span>
                  <span class="ora-register-main-birthday-year-70-group-item year-item">1972</span>
                  <span class="ora-register-main-birthday-year-70-group-item year-item">1971</span>
                  <span class="ora-register-main-birthday-year-70-group-item year-item">1970</span>
                </span>
              </div>
            </div>
            <div class="ora-register-main-birthday-month">
              <div class="ora-register-main-birthday-month-item">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
              </div>
              <div class="ora-register-main-birthday-month-item">
                <span>05</span>
                <span>06</span>
                <span>07</span>
                <span>08</span>
              </div>
              <div class="ora-register-main-birthday-month-item">
                <span>09</span>
                <span>10</span>
                <span>11</span>
                <span>12</span>
              </div>
            </div>
            <div class="ora-register-main-birthday-day">
              <!--
              <span>01</span>
              <span>02</span>
              <span>03</span>
              ...
              -->
            </div>
          </div>
          <!-- End : 生日 -->

          <!-- Start : 联系电话 -->
          <div class="ora-register-main-phone">
            <span class="text-right">联系电话：</span>
            <input type="text" name="utel" value="" placeholder="请输入手机号码">
          </div>
          <!-- End : 联系电话 -->

          <!-- Start : 微信号 -->
          <div class="ora-register-main-wechat">
            <span class="text-right">微信号：</span>
            <input type="text" name="uwechat" value="" placeholder="请输入微信号">
          </div>
          <!-- End : 微信号 -->

          <!-- Start : 身份证号码 -->
          <div class="ora-register-main-idnum">
            <span class="text-right">身份证号：</span>
            <input type="text" name="idcode" value="" placeholder="请输入身份证号码">
          </div>
          <!-- End : 身份证号码 -->

          <!-- Start : 密保问题 -->
          <div class="ora-register-main-question">
            <span class="text-right">密保问题：</span>
            <select class="" name="encrypted_id">
              <option value="">请选择密保问题</option>
              <option value="1">对您影响最大的人的名字是？</option>
              <option value="2">您最熟悉的童年好友的名字是？</option>
              <option value="3">您最熟悉的学校宿舍室友名字是？</option>
            </select>
            <input class="ora-register-main-question-answer" type="text" name="encrypted_result" value="" placeholder="请输入密保答案">
          </div>
          <!-- End : 密保问题 -->

          <!-- Start : 立即注册 -->
          <div class="ora-register-main-submit">
            <button type="submit">立即注册</button>
          </div>
          <!-- End : 立即注册 -->
        </form>

        <div class="ora-register-main-login">
          已有账号？
          <a href="${pageContext.request.contextPath}/toLogin">立即登陆</a>
        </div>
        <div class="ora-register-main-tip">
          <span class="ora-register-main-tip-birthday-year">请选择年份!</span>
          <span class="ora-register-main-tip-birthday-month">请选择月份!</span>

          <div class="ora-register-main-tip-mark">
            <span>请输入 8 位员工编号</span>
          </div>
          <div class="ora-register-main-tip-username">
            <span class="username-min-length">用户名最少为 6 位</span>
            <span class="username-max-length">用户名最大为 12 位</span>
            <span class="username-no-space">用户名首尾不包含空格</span>
            <span class="username-letter-num">用户名为英文/数字/英文与数字的组合</span>
          </div>
          <div class="ora-register-main-tip-checkpassword">
            <span class="password-min-length">密码长度大于 8 位</span>
            <span class="password-max-length">密码长度小于 16 位</span>
            <span class="password-no-space">密码不包含空格</span>
          </div>
          <div class="ora-register-main-tip-confirmpwd">
            <span>您输入的密码不匹配</span>
          </div>
          <div class="ora-register-main-tip-name">
            <span>姓名不能为空</span>
          </div>
          <div class="ora-register-main-tip-phone">
            <span>请输入有效的手机号码</span>
          </div>
          <div class="ora-register-main-tip-idnum">
            <span>请输入有效身份证号码</span>
          </div>
          <div class="ora-register-main-tip-question">
            <span>密保答案不能为空</span>
          </div>
          <div class="ora-register-main-tip-submit">
            <span class="text-center">请完善用户信息</span>
          </div>

          <!-- Start : 验证用户名是否已存在 -->
          <div class="ora-register-main-tip-checkusername">
            <span class="text-right">用户名已存在</span>
          </div>
          <!-- End : 验证用户名是否已存在 -->

          <!-- Start : 验证姓名是否已存在 -->
          <div class="ora-register-main-tip-checkname">
            <span class="text-right">姓名已存在</span>
          </div>
          <!-- End : 验证姓名是否已存在 -->
        </div>
      </div>
    </div>
  </body>
</html>
