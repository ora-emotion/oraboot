<%--
  User: smpower
  Date: 2018/1/23 10:10
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title>导师部数据统计 | 橘子情感</title>
  <!-- import third-party stylesheet -->
  <link rel="stylesheet" charset="utf-8" href="css/plugin/modal.css">

  <!-- import our stylesheet -->
  <link rel="stylesheet" charset="utf-8" href="css/plugin/pagination.css">
  <link rel="stylesheet" charset="utf-8" href="css/ora.css">
  <link rel="stylesheet" charset="utf-8" href="css/ora-management.css">
  <link rel="stylesheet" charset="UTF-8" href="css/chart_department.css">

  <!-- import third-party javascript -->
  <script src="js/jq/jquery-3.2.1.js"   type="text/javascript" charset="UTF-8"></script>
  <script src="js/echarts/echarts.js"   type="text/javascript" charset="UTF-8"></script>
  <script src="js/plugin/pagination.js" type="text/javascript" charset="utf-8"></script>
  <script src="js/plugin/modal.js"      type="text/javascript" charset="utf-8"></script>
  <script src="js/util.js"              type="text/javascript" charset="utf-8"></script>

  <!-- import our javascript -->
  <script src="js/management/header.js"      type="text/javascript" charset="utf-8"></script>
  <script src="js/management/nav.js"         type="text/javascript" charset="utf-8"></script>
  <script src="js/management/nav.mentor.js"  type="text/javascript" charset="utf-8"></script>
  <script src="js/chart/chart_department.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
  <!-- Start : header -->
  <header class="ora-header" id="ora-header">
    <!-- Start : LOGO -->
    <img class="ora-header-logo" src="images/header/logo.png" alt="橘子情感">
    <!-- End : LOGO -->

    <!-- Start : 职位 -->
    <div class="ora-header-position">
      <!--
        接收职位 0 1 2 3 4
        0 实习导师
        1 导师
        2 主管
        3 总监
        4 超级管理员
      -->
      <span class="active">总监</span>
    </div>
    <!-- End : 职位 -->

    <!-- Start : 上级领导 -->
    <div class="ora-header-superior">
      <!--
          <span class="active">上级 : ${USER_SESSION.supperior}</span>
          -->
      <span class="active">上级 : 花哥</span>
    </div>
    <!-- End : 上级领导 -->

    <!-- Start : 个人资料按钮 -->
    <div class="ora-header-info">
      <span class="ora-header-info-avatar icon"></span>
      <span class="ora-header-info-name" type="button" name="button">${USER_SESSION.uname}</span>
      <span class="ora-header-info-triangle icon"></span>
    </div>
    <!-- End : 个人资料按钮 -->

    <!-- Start : 个人资料菜单 -->
    <div class="ora-header-menu">
      <span>个人资料</span>
      <span>个人业绩</span>
      <a href="${pageContext.request.contextPath}/logout">退出</a>
    </div>
    <!-- End : 个人资料菜单 -->
  </header>
  <!-- End : header -->

  <!-- Start : nav -->
  <nav class="ora-nav" id="ora-nav">
    <!-- Start : 导师管理 -->
    <div class="ora-nav-mentor ora-nav-item">
      <!-- Start : 标题 -->
      <div class="ora-nav-mentor-title ora-nav-title"  title="导师管理">
        <span class="ora-nav-mentor-title-avator"></span>
        <span class="ora-nav-mentor-title-text">导师管理</span>
      </div>
      <!-- Start : 成员 -->

      <!-- Start : 成员 -->
      <div class="ora-nav-mentor-members"></div>
      <!-- End : 成员 -->
    </div>
    <!-- End : 导师管理 -->

    <!-- Start : 用户管理 -->
    <div class="ora-nav-user ora-nav-item">
      <div class="ora-nav-user-title ora-nav-title" title="用户管理">
        <span class="ora-nav-user-title-avator"></span>
        <span class="ora-nav-user-title-text">用户管理</span>
      </div>
    </div>
    <!-- End : 用户管理 -->

    <!-- Start : 权限管理 -->
    <div class="ora-nav-permission ora-nav-item">
      <div class="ora-nav-permission-title ora-nav-title" title="权限管理">
        <span class="ora-nav-permission-title-avator"></span>
        <span class="ora-nav-permission-title-text">权限管理</span>
      </div>
    </div>
    <!-- End : 权限管理 -->

    <!-- Start : 业绩管理 -->
    <div class="ora-nav-performance ora-nav-item">
      <div class="ora-nav-performance-title ora-nav-title" title="权限管理">
        <span class="ora-nav-performance-title-avator"></span>
        <span class="ora-nav-performance-title-text">业绩管理</span>
      </div>
    </div>
    <!-- End : 业绩管理 -->
  </nav>
  <!-- End: nav -->

  <!-- Start : 图表主体 -->
  <div class="chart-wrap">
    <div class="chart"></div>
  </div>
  <!-- End : 图表主体 -->

  <!-- Start : 个人资料模态框 -->
  <div class="ora-personinfo">
    <!-- Start : 模态层 -->
    <div class="ora-personinfo-modal"></div>
    <!-- End : 模态层 -->

    <div class="ora-personinfo-content">
      <!-- Start : 标题 -->
      <div class="ora-personinfo-content-title text-center">
        <span>个人资料</span>
      </div>
      <!-- End : 个人资料 -->

      <!-- Start : 个人资料主体 -->
      <div class="ora-personinfo-content-main">
        <!-- Start : 个人信息 -->
        <div class="ora-personinfo-content-main-item">
          <div class="ora-personinfo-content-main-item-title text-center">
            <span>个人信息</span>
          </div>
          <!-- Start : 姓名 -->
          <div class="ora-personinfo-content-main-item-name item">
            <span class="text-right">姓名</span>
            <!--
              <span>hhh</span>
            -->
            <span>hhh</span>
          </div>
          <!-- End : 姓名 -->

          <!-- Start : 性别 -->
          <div class="ora-personinfo-content-main-item-sex item">
            <span class="text-right">性别</span>
            <span></span>
          </div>
          <!-- End : 性别 -->

          <!-- Start : 籍贯 -->
          <div class="ora-personinfo-content-main-item-address item">
            <span class="text-right">籍贯</span>
            <span>hhh</span>
          </div>
          <!-- End : 籍贯 -->

          <!-- Start : 出生日期 -->
          <div class="ora-personinfo-content-main-item-birthday item">
            <span class="text-right">出生日期</span>
            <span>hhh</span>
          </div>
          <!-- End : 出生日期 -->

          <!-- Start : 身份证号 -->
          <div class="ora-personinfo-content-main-item-idnum item">
            <span class="text-right">身份证号</span>
            <span>hhh</span>
          </div>
          <!-- End : 身份证号 -->

          <!-- Start : 联系电话 -->
          <div class="ora-personinfo-content-main-item-phone item">
            <span class="text-right">联系电话</span>
            <span>hhh</span>
          </div>
          <!-- End : 联系电话 -->

          <!-- Start : 微信号 -->
          <div class="ora-personinfo-content-main-item-wechat item">
            <span class="text-right">微信号</span>
            <span>hhh</span>
          </div>
          <!-- End : 微信号 -->

          <!-- Start : 专业资质证书 -->
          <div class="ora-personinfo-content-main-item-certificate item">
            <span class="text-right">专业资质证书</span>
            <span>hhh</span>
          </div>
          <!-- End : 专业资质证书 -->

          <!-- Start : 密码 -->
          <div class="ora-personinfo-content-main-item-password item">
            <span class="text-right">密码</span>
            <span>hhh</span>
          </div>
          <!-- End : 密码 -->

          <!-- Start : 密保问题 -->
          <div class="ora-personinfo-content-main-item-question item">
            <span class="text-right">密保问题</span>
            <span class="question-answer"></span>
          </div>
          <!-- End : 密保问题 -->

          <!-- Start : 密保答案 -->
          <div class="ora-personinfo-content-main-item-answer item">
            <span class="text-right">密保答案</span>
            <span>hhh</span>
          </div>
          <!-- End : 密保答案 -->
        </div>
        <!-- End : 个人信息 -->

        <!-- Start : 员工信息 -->
        <div class="ora-personinfo-content-main-item">
          <form class="" action="#" method="get">
            <div class="ora-personinfo-content-main-item-title text-center">
              <span>员工信息</span>
            </div>
            <!-- Start : 职位 -->
            <div class="ora-personinfo-content-main-item-position item">
              <span class="text-right">职位</span>
              <span>hhh</span>
            </div>
            <!-- End : 职位 -->

            <!-- Start : 员工编号 -->
            <div class="ora-personinfo-content-main-item-mark item">
              <span class="text-right">员工编号</span>
              <span>hhh</span>
            </div>
            <!-- End : 员工编号 -->

            <!-- Start : 入职时间 -->
            <div class="ora-personinfo-content-main-item-jointime item">
              <span class="text-right">入职时间</span>
              <span>hhh</span>
            </div>
            <!-- End : 入职时间 -->

            <!-- Start : 被投诉次数 -->
            <div class="ora-personinfo-content-main-item-complaints item">
              <span class="text-right">被投诉次数</span>
              <span>hhh</span>
            </div>
            <!-- End : 被投诉次数 -->

            <!-- Start : 创建时间 -->
            <div class="ora-personinfo-content-main-item-createtime item">
              <span class="text-right">创建时间</span>
              <span>hhh</span>
            </div>
            <!-- End : 创建时间 -->

            <!-- Start : 最后更新时间 -->
            <div class="ora-personinfo-content-main-item-updatetime item">
              <span class="text-right">最后更新时间</span>
              <span class="hidden">hhh</span>
            </div>
            <!-- End : 最后更新时间 -->

            <!-- Start : 备注 -->
            <div class="ora-personinfo-content-main-item-remark item">
              <span class="text-right">备注</span>
              <span>
                  发哈回复的萨科技打算考虑空间和萨达飞 黄寺大街开发 划分空间撒大了好飞金坷垃东方红飞飞啊啊时刻牢记好飞飞爱神的箭快递费恢复卡圣诞节快乐恢复开发啥的空间发挥 发空间撒地方和开发挥洒的空间的撒快捷方式好看教案上大家开发恢复
                </span>
            </div>
            <!-- End : 备注 -->
          </form>
        </div>
        <!-- End : 员工信息 -->
      </div>
      <!-- End : 个人资料主体 -->

      <!-- Start : 按钮 -->
      <div class="ora-personinfo-content-btn text-center">
        <button class="modal-btn-change" type="button" name="button">修改</button>
        <button class="modal-btn-submit hidden" type="button" name="button">提交</button>
        <button class="modal-btn-back hidden" type="button" name="button">返回</button>
        <span class="icon-close"></span>
      </div>
      <!-- End : 按钮 -->

      <!-- Start : 提示信息 -->
      <div class="ora-personinfo-content-tips">
        <!-- Start : 选择性别下拉菜单 -->
        <div class="ora-personinfo-content-tips-sex" style="display: none;">
          <span data-sex="男" class="sex-options-item">男</span>
          <span data-sex="女" class="sex-options-item">女</span>
        </div>
        <!-- End : 选择性别下拉菜单 -->

        <!-- Start : 密保问题下拉菜单 -->
        <div class="ora-personinfo-content-tips-questions" style="display: none;">
          <span data-question="1" class="question-options-item">对您影响最大的人的名字是？</span>
          <span data-question="2" class="question-options-item">您最熟悉的童年好友的名字？</span>
          <span data-question="3" class="question-options-item">您最熟悉的学校室友名字是？</span>
        </div>
        <!-- End : 密保问题下拉菜单 -->
      </div>
      <!-- End : 提示信息 -->
    </div>
  </div>
  <!-- End : 个人资料模态框 -->

  <script type="text/javascript" charset="UTF-8">
    var uid, position, superior, uname;

    uid      = ${USER_SESSION.uid};
    position = ${USER_SESSION.position};
    superior = '${USER_SESSION.supperior}';
    uname    = '${USER_SESSION.uname}';

    // uid      = 2;
    // uname    = '姜朝文';
    // position = 5;
    // superior = '花哥';

    // 加载页面头部
    header.initModule({
      $header      : $('.ora-header'),
      $personinfo  : $('.ora-personinfo'),
      uid          : uid
    });

    // 登录人职位
    switch (position) {
      case 0 :
        $('.ora-header-position span').text('实习导师');
        break;
      case 1 :
        $('.ora-header-position span').text('导师');
        break;
      case 2 :
        $('.ora-header-position span').text('主管');
        break;
      case 3 :
        $('.ora-header-position span').text('总监');
        break;
      case 4 :
        $('.ora-header-position span').text('超级管理员');
        break;
      case 5 :
        $('.ora-header-position span').text('客服');
        break;
      default:
        break;
    }
    // 登录人上级
    if (superior == null || superior == '') {
      $('.ora-header-superior span').removeClass('active');
    } else {
      $('.ora-header-superior span').text('上级 : ' + superior);
    }

    // 加载左侧菜单
    nav.initModule($('#ora-nav'), {
      position : position,
      uname    : uname
    });

    // 引入当前文件对应的 js 模块
    departmentChart.initModule( $('body') );
  </script>
</body>
</html>
