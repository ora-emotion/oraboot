
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
  <meta charset="utf-8">
  <title>业绩管理 | 橘子情感</title>

  <!-- import third-party stylesheet -->
  <link rel="stylesheet" charset="utf-8"
        href="../../css/plugin/modal.css">

  <!-- import our styles -->
  <link rel="stylesheet" charset="utf-8" href="css/plugin/pagination.css">
  <link rel="stylesheet" charset="utf-8" href="css/ora.css">
  <link rel="stylesheet" charset="utf-8" href="css/ora-management.css">
  <link rel="stylesheet" charset="utf-8" href="css/pmself.css">

  <!-- import third-party javascript -->
  <script src="js/jq/jquery-3.2.1.js"     charset="utf-8"></script>
  <script src="js/jq/jquery.uriAnchor.js" charset="utf-8"></script>
  <script src="js/plugin/pagination.js"   charset="utf-8"></script>
  <!--
  <script src="js/plugin/pagination_self.js"   charset="utf-8"></script>
  -->
  <script src="js/plugin/modal.js"        charset="utf-8"></script>

  <!-- import our javascript -->
  <script src="js/management/header.js" charset="utf-8"></script>
  <!--
  <script src="js/management/user.js" charset="utf-8"></script>
  -->
  <script src="js/management/nav.js" charset="utf-8"></script>
  <script src="js/management/nav.mentor.js" charset="utf-8"></script>
  <script src="js/management/pmself.js" charset="utf-8"></script>

  <script type="text/javascript">
    $(function () {
      var uid,  position, superior,    uname,
          plan, reality,  updatecusts, rate;

      uid         = ${USER_SESSION.uid};
      position    = ${USER_SESSION.position};
      superior    = '${USER_SESSION.supperior}';
      uname       = '${USER_SESSION.uname}';
      plan        = '${USER_SESSION.plan}';
      reality     = '${USER_SESSION.reality}';
      updatecusts = '${USER_SESSION.updatecusts}';
      rate        = '${USER_SESSION.rate}';

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

      // 加载页面主体
      // user.initModule( $('#user') );

      var
          user_plan        = ${user_plan},
          user_reality     = ${user_reality},
          user_rate        = ${user_rate},
          user_updatecusts = ${user_updatecusts},
          user_id          = ${user_id},
          userinfo_map
      ;

      userinfo_map = {
        uname            : uname,
        user_plan        : user_plan,
        user_reality     : user_reality,
        user_rate        : user_rate,
        user_updatecusts : user_updatecusts,
        uid              : user_id
      };

      // 加载业绩管理模块
      pmself.initModule(
        $('.ora-user-pm'), userinfo_map
      );

    });
  </script>
</head>
<body onselectstart="return false;">
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

<!-- Start : main area -->
<div class="ora-user" id="ora-user">
  <div class="ora-user-pmself">
    <!-- Start : 个人业绩 -->
    <div class="ora-user-pmself-detail">
      <span class="pmself-detail-item01"></span>
      <span class="pmself-detail-item02 text-center"></span>
      <span class="pmself-detail-item03 text-center"></span>
      <span class="pmself-detail-item04 text-center"></span>
      <span class="pmself-detail-item05 text-center"></span>
      <span class="pmself-detail-item06"></span>
    </div>
    <!-- End : 个人业绩 -->

    <!-- Start : 搜索 -->
    <div class="ora-user-pmself-search_add">
      <div class="ora-user-pmself-search">
        <input class="ora-user-pmself-search-input" type="text" placeholder="请输入学员编号查询">
        <span class="ora-user-pmself-search-btn"></span>
        <span class="ora-user-pmself-search-icon"></span>
      </div>
    </div>
    <!-- End : 搜索 -->

    <!-- Start : 学员列表 - 分页器 -->
    <div class="ora-user-pmself-pagination">
      <!-- Start : pagination - customers list -->
      <div class="pagination" id="pagination">
        <!-- Start : 分页器主要内容区域 -->
        <div class="pagination-content"></div>
        <!-- End : 分页器主要内容区域 -->

        <!-- Start : 分页器按钮 -->
        <div class="pagination-control">
          <span class="pagination-control-first pointer margin-px text-center">首页</span>
          <span class="pagination-control-prev pointer margin-px text-center">上页</span>

          <!-- Start : 分页器页码 -->
          <div class="pagination-controllers">
            <!--
            <span class="pagination-control-controllers-num pointer margin-px text-center active">1</span>
            -->
          </div>
          <!-- End : 分页器页码 -->

          <span class="pagination-control-next pointer margin-px text-center">下页</span>
          <span class="pagination-control-last pointer margin-px text-center">尾页</span>

          <!-- Start : 跳转页码 -->
          <div class="pagination-jump">
            <span>跳转到</span>
            <input class="pagination-jump-input" type="text" name="">
            <span>页</span>
            <button class="pagination-jump-btn" type="button" name="button">确定</button>
          </div>
          <!-- End : 跳转页码 -->
        </div>
        <!-- End : 分页器按钮 -->
      </div>
      <!-- End : pagination - customers list -->
    </div>
    <!-- End : 学员列表 - 分页器 -->

    <!-- Start : 客户备注模态框 -->
    <div class="modal ora-user-pmself-remark">
      <!-- Start : 模态框 -->
      <div class="modal-box">
        <!-- Start : 模态框标题 -->
        <p class="modal-box-title text-center">备注</p>
        <!-- End : 模态框标题 -->

        <!-- Start : 关闭模态框的按钮 -->
        <span class="modal-box-close"></span>
        <!-- End : 关闭模态框的按钮 -->

        <div class="modal-box-content">
          <!-- Start : 内容区 -->
          <span class="modal-box-content-text"></span>
          <!-- End : 内容区 -->
        </div>

      </div>
      <!-- End : 模态框 -->
    </div>
    <!-- End : 客户备注模态框 -->

    <!-- Start : 提示信息 -->
    <div class="ora-user-pmself-tips">
      <!-- Start : 删除全部客户之后的提示 -->
      <div class="ora-user-pmself-tips-deleted text-center">
        <span>没有学员，搜索框留空检索所有学员</span>
      </div>
      <!-- End : 删除全部客户之后的提示 -->
    </div>
    <!-- End : 提示信息 -->
  </div>
</div>
<!-- End : main area -->

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
              <span>hhh</span>
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
              <span></span>
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

              <!-- Start : 累计学员数 -->
              <div class="ora-personinfo-content-main-item-students item">
                <span class="text-right">累计学员数</span>
                <span>hhh</span>
              </div>
              <!-- End : 累计学员数 -->

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
                <span></span>
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
</body>
</html>
