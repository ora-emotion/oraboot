<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>导师管理 | 橘子情感</title>

    <!-- import third-party styles -->
    <link rel="stylesheet" href="css/plugin/pagination.css">

    <!-- import our styles -->
    <link rel="stylesheet" href="css/ora.css">
    <link rel="stylesheet" href="css/ora-management.css">
    <link rel="stylesheet" href="css/ora-management-user.css">

    <!-- import third-party javascript -->
    <script src="js/jq/jquery-3.2.1.js" charset="utf-8"></script>
    <script src="js/jq/jquery.uriAnchor.js" charset="utf-8"></script>
    <script src="js/plugin/pagination.js" charset="utf-8"></script>
    <script src="js/plugin/modal.js" charset="utf-8"></script>

    <!-- import our javascript -->
    <script src="js/management/header.js" charset="utf-8"></script>
    <script src="js/management/user.js" charset="utf-8"></script>
    <script src="js/management/nav.js" charset="utf-8"></script>
    <script src="js/management/nav.mentor.js" charset="utf-8"></script>
    <script src="js/management/oa.js" charset="utf-8"></script>
    <script type="text/javascript">
      $(function () {
        var uid, position, superior, uname, department_id;
        uid           = ${USER_SESSION.uid};
        position      = ${USER_SESSION.position};
        superior      = '${USER_SESSION.supperior}';
        uname         = '${USER_SESSION.uname}';
        department_id = ${USER_SESSION.department_id};

        // uid           = 2;
        // position      = 4;
        // uname         = '姜朝文';
        // superior      = '花哥';
        // department_id = 1;

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
        nav.initModule( $('#ora-nav'), { position : position, uname : uname });

        // 加载页面主体
        user.initModule($('.ora-user-mentor'), {
          position      : position,
          department_id : parseInt(department_id, 10)
        });

        oa.initModule({
          $header              : $('.ora-header'),
          $nav                 : $('.ora-nav'),
          $main                : $('.ora-user'),
          $personinfo_modal    : $('.ora-personinfo'),
          $majordomoinfo_modal : $('.majordomo-info')
        }, { user_position : position });
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
          接收职位 0 1 2 3 4 5
          0 实习导师
          1 导师
          2 主管
          3 总监
          4 超级管理员
          5 客服人员
        -->
        <span class="active">总监</span>
      </div>
      <!-- End : 职位 -->

      <!-- Start : 上级领导 -->
      <div class="ora-header-superior">
        <span class="active">上级 : ${USER_SESSION.supperior}</span>
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
        <div class="ora-nav-mentor-title ora-nav-title" style="background: #fca12f" title="导师管理">
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

      <!-- Start : 业绩查看 -->
      <div class="ora-nav-chart ora-nav-item">
        <div class="ora-nav-chart-title ora-nav-title">
          <span class="ora-nav-chart-title-avator"></span>
          <span class="ora-nav-chart-title-text">业绩查看</span>
        </div>
      </div>
      <!-- End : 业绩查看 -->
    </nav>
    <!-- End: nav -->

    <div class="ora-user" id="ora-user">
      <!-- Start : 导师管理 -->
      <div class="ora-user-mentor">
        <!-- Start : 总监信息 -->
        <div class="ora-user-mentor-zj">
          <p class="ora-user-mentor-zj-title text-center"></p>
          <table>
            <thead>
              <tr>
                <th>员工编号</th>
                <th>姓名</th>
                <th>性别</th>
                <th>职务</th>
                <th>生日</th>
                <th>投诉次数</th>
                <th>微信号</th>
                <th>联系电话</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <!-- Start : 员工编号 -->
                <td class="employee_number td text-center">
                  <span class="employee_number-text"></span>
                  <input class="employee_number-input text-center" type="hidden" placeholder="20170001">
                </td>
                <!-- End : 员工编号 -->
                <!-- Start : 姓名 -->
                <td class="name td text-center">
                  <span class="name-text"></span>
                  <input class="name-input text-center" type="hidden" placeholder="亚历山大">
                </td>
                <!-- End : 姓名 -->
                <!-- Start : 性别 -->
                <td class="sex td text-center">
                  <span class="sex-text"></span>
                  <input class="sex-input text-center" type="hidden" placeholder="男">
                </td>
                <!-- End : 性别 -->
                <!-- Start : 职务 -->
                <td class="majordomo td text-center">
                  <span class="majordomo-text"></span>
                  <input class="majordomo-input text-center" type="hidden" placeholder="导师">
                </td>
                <!-- End : 职务 -->
                <!-- Start : 生日 -->
                <td class="birthday td text-center">
                  <span class="birthday-text"></span>
                  <input class="birthday-input text-center" type="hidden" placeholder="2017-12-21">
                </td>
                <!-- End : 生日 -->
                <!-- Start : 投诉次数 -->
                <td class="complaint td text-center">
                  <span class="complaint-text"></span>
                  <input class="complaint-input text-center" type="hidden" placeholder="0">
                </td>
                <!-- End : 投诉次数 -->
                <!-- Start : 微信号 -->
                <td class="wechat td text-center">
                  <span class="wechat-text"></span>
                  <input class="wechat-input text-center" type="hidden" placeholder="wxid_rrll98rrjwwxjo">
                </td>
                <!-- End : 微信号 -->
                <!-- Start : 联系电话 -->
                <td class="phone td text-center">
                  <span class="phone-text"></span>
                  <input class="phone-input text-center" type="hidden" placeholder="18888888888">
                </td>
                <!-- End : 联系电话 -->
                <!-- Start : 操作 -->
                <td class="edit text-center">
                  <span class="edit"></span>
                  <span class="edit-text hidden">修改</span>
                </td>
                <!-- End : 操作 -->
                <!-- Start : 当前人信息 -->
                <td class="majordomo-data hidden">
                  <span class="majordomo-number"></span>
                  <span class="majordomo-name"></span>
                  <span class="majordomo-entry_time"></span>
                  <span class="majordomo-department"></span>
                  <span class="majordomo-superior"></span>
                  <span class="majordomo-complaint"></span>
                  <span class="majordomo-remark"></span>
                </td>
                <!-- End : 当前人信息 -->
              </tr>
            </tbody>
          </table>
        </div>
        <!-- End : 总监信息 -->

        <!-- Start : 部门信息 -->
        <div class="ora-user-mentor-department">
          <p class="ora-user-mentor-department-title text-center">所有导师信息</p>
          <!-- Start : 部门标题 -->
          <table class="department-tab">
            <thead>
              <tr>
                <th class="active">导师一部</th>
                <th>导师二部</th>
              </tr>
            </thead>
          </table>
          <!-- End : 部门标题 -->
          <!-- Start : 部门详细信息 -->
          <table class="department-list">
            <tbody>
              <tr>
                <td class="text-center">员工编号</td>
                <td class="text-center">姓名</td>
                <td class="text-center">性别</td>
                <td class="text-center">职务</td>
                <td class="text-center">上级领导</td>
                <td class="text-center">生日</td>
                <td class="text-center">投诉次数</td>
                <td class="text-center">部门</td>
                <td class="text-center">联系电话</td>
                <td class="text-center">操作</td>
              </tr>
              <tr>
                <!-- Start : 员工编号 -->
                <td class="number td text-center">
                  <span class="number-text"></span>
                  <input class="number-input text-center" type="hidden" placeholder="员工编号">
                </td>
                <!-- End : 员工编号 -->
                <!-- Start : 姓名 -->
                <td class="name td text-center">
                  <span class="name-text"></span>
                  <input class="name-input text-center" type="hidden" placeholder="姓名">
                </td>
                <!-- End : 姓名 -->
                <!-- Start : 性别 -->
                <td class="sex td text-center">
                  <span class="sex-text"></span>
                  <input class="sex-input text-center" type="hidden" placeholder="男">
                </td>
                <!-- End : 性别 -->
                <!-- Start : 主管 -->
                <td class="director td text-center">
                  <span class="director-text">主管</span>
                  <input class="director-input text-center" type="hidden" placeholder="主管">
                </td>
                <!-- End : 主管 -->
                <!-- Start : 上级领导 -->
                <td class="superior td text-center">
                  <span class="superior-text"></span>
                  <input class="superior-input text-center" type="hidden" placeholder="上级领导">
                </td>
                <!-- End : 上级领导 -->
                <!-- Start : 生日 -->
                <td class="birthday td text-center">
                  <span class="birthday-text"></span>
                  <input class="birthday-input text-center" type="hidden" placeholder="2017-12-24">
                </td>
                <!-- End : 生日 -->
                <!-- Start : 投诉次数 -->
                <td class="complaint td text-center">
                  <span class="complaint-text">5</span>
                  <input class="complaint-input text-center" type="hidden" placeholder="0">
                </td>
                <!-- End : 投诉次数 -->
                <!-- Start : 部门 -->
                <td class="department td text-center">
                  <span class="department-text"></span>
                  <input class="department-input text-center" type="hidden" placeholder="wxid_rrll98rrjwwxjo">
                </td>
                <!-- End : 部门 -->
                <!-- Start : 联系电话 -->
                <td class="phone td text-center">
                  <span class="phone-text"></span>
                  <input class="phone-input text-center" type="hidden" placeholder="18888888888">
                </td>
                <!-- End : 联系电话 -->
                <!-- Start : 操作 -->
                <td class="edit td text-center">
                  <div class="edit-before">
                    <span class="edit-before-update"></span>
                    <span class="edit-before-delete"></span>
                  </div>
                  <div class="edit-after hidden">
                    <span class="edit-after-confirm">修改</span>
                  </div>
                </td>
                <!-- End : 操作 -->
                <!-- Start : 保存当前行信息 -->
                <td class="director-data hidden">
                  <span class="director-data-number"></span>
                  <span class="director-data-name"></span>
                  <span class="director-data-entry_time"></span>
                  <span class="director-data-department"></span>
                  <span class="director-data-superior"></span>
                  <span class="director-data-complaint"></span>
                  <span class="director-data-remark"></span>
                </td>
                <!-- End : 保存当前行信息 -->
              </tr>
            </tbody>
          </table>
          <!-- End : 部门详细信息 -->
        </div>
        <!-- End : 部门信息 -->

        <!-- Start : 员工列表 -->
        <div class="ora-user-mentor-comployee">
          <!-- Start : pagination - customers list -->
          <div class="comployee-pagination pagination" id="comployee-pagination">
            <!-- Start : 分页器主要内容区域 -->
            <div class="pagination-content">
              <table>
                <thead>
                  <tr>
                    <th class="text-center">员工编号</th>
                    <th class="text-center">姓名</th>
                    <th class="text-center">性别</th>
                    <th class="text-center">职务</th>
                    <th class="text-center">上级领导</th>
                    <th class="text-center">生日</th>
                    <th class="text-center">投诉次数</th>
                    <th class="text-center">微信号</th>
                    <th class="text-center">联系电话</th>
                    <th class="text-center">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- 最多 7 条数据 -->
                </tbody>
              </table>
            </div>
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
        <!-- End : 员工列表 -->
      </div>
      <!-- End : 导师管理 -->
    </div>

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

    <!-- Start : 总监详细信息模态框(其他模块狂共用该模块) -->
    <div class="modal majordomo-info">
      <!-- Start : 模态框 -->
      <div class="modal-box">
        <!-- Start : 模态框标题 -->
        <p class="modal-box-title text-center">xxx的个人信息</p>
        <!-- End : 模态框标题 -->

        <!-- Start : 关闭模态框的按钮 -->
        <span class="modal-box-close"></span>
        <!-- End : 关闭模态框的按钮 -->

        <!-- Start : 模态框内容区 -->
        <div class="majordomo-content">
          <div class="majordomo-content-item">
            <!-- Start : 员工编号 -->
            <div class="majordomo-content-item-number">
              <span class="text-right">员工编号</span>
              <span class="text-left">20170001</span>
            </div>
            <!-- End : 员工编号 -->

            <!-- Start : 姓名 -->
            <div class="majordomo-content-item-uname">
              <span class="text-right">姓名</span>
              <span class="text-left">哈哈哈</span>
            </div>
            <!-- End : 姓名 -->

            <!-- Start : 籍贯 -->
            <div class="majordomo-content-item-birthplace">
              <span class="text-right">籍贯</span>
              <span class="text-left">山东青岛</span>
            </div>
            <!-- End : 籍贯 -->

            <!-- Start : 资质证书 -->
            <div class="majordomo-content-item-certificate">
              <span class="text-right">资质证书</span>
              <span class="text-left">超级导师</span>
            </div>
            <!-- End : 资质证书 -->

            <!-- Start : 创建时间 -->
            <div class="majordomo-content-item-create_date">
              <span class="text-right">创建时间</span>
              <span class="text-left">2017-12-22</span>
            </div>
            <!-- End : 创建时间 -->

            <!-- Start : 学员数 -->
            <div class="majordomo-content-item-cust_count">
              <span class="text-right">学员数</span>
              <span class="text-left">123</span>
            </div>
            <!-- End : 学员数 -->

            <!-- Start : 入职时间 -->
            <div class="majordomo-content-item-entry_time">
              <span class="text-right">入职时间</span>
              <span class="text-left">2017-08-15</span>
            </div>
            <!-- End : 入职时间 -->
          </div>

          <div class="majordomo-content-item">
            <!-- Start : 身份证号 -->
            <div class="majordomo-content-item-id_code">
              <span class="text-right">身份证号</span>
              <span class="text-left">372222222222222222</span>
            </div>
            <!-- End : 身份证号 -->

            <!-- Start : 备注 -->
            <div class="majordomo-content-item-remark">
              <span class="text-right">备注</span>
              <span class="text-left"> </span>
            </div>
            <!-- End : 备注 -->
          </div>

          <!-- Start : 按钮 -->
          <div class="majordomo-content-btn">
            <button class="add" type="button">关 闭</button>
          </div>
          <!-- End : 按钮 -->
        </div>
        <!-- End : 模态框内容区 -->
      </div>
      <!-- End : 模态框 -->
    </div>
    <!-- End : 总监详细信息模态框(其他模块狂共用该模块) -->

    <!-- Start : 删除用户确认框 -->
    <div class="modal deleteuser-modal">
      <div class="modal-box">
        <!-- Start : 模态框标题 -->
        <p class="modal-box-title text-center">警 告</p>
        <!-- End : 模态框标题 -->

        <!-- Start : 模态框关闭按钮 -->
        <span class="modal-box-close"></span>
        <!-- End : 模态框关闭按钮 -->

        <!-- Start : 模态框内容区 -->
        <div class="deleteuser-content">
          <p class="text-center">删除用户后，数据不可恢复！</p>
        </div>
        <!-- End : 模态框内容区 -->

        <!-- Start : 按钮 -->
        <div class="ora-deleteuser-content-btn text-center">
          <button class="modal-btn-confirm" type="button" name="button">删 除</button>
          <button class="modal-btn-cancel" type="button" name="button">取 消</button>
        </div>
        <!-- End : 按钮 -->
      </div>
    </div>
    <!-- End : 删除用户确认框 -->

    <!-- Start : 更新导师信息模态框 -->
    <div class="modal adduser-modal updateuser-modal">
      <div class="modal-box">
        <!-- Start : modal title -->
        <p class="modal-box-title text-center">xxx的个人信息</p>
        <!-- End : modal title -->

        <!-- Start : close button -->
        <span class="modal-box-close"></span>
        <!-- End : close button -->

        <!-- Start : 内容区 -->
        <div class="adduser-content updateuser-content">
          <!-- Start : 内容区左侧 -->
          <div class="adduser-content-group updateuser-content-group">
            <!-- Start : 员工编号 -->
            <div class="ora-adduser-content-number ora-updateuser-content-number ora-adduser-content-item ora-updateuser-content-item">
              <span class="text-right">员工编号</span>
              <input type="text" class="text-left" placeholder="请输入员工编号">
            </div>
            <!-- End : 员工编号 -->

            <!-- Start : 姓名 -->
            <div class="ora-adduser-content-name ora-updateuser-content-name ora-adduser-content-item ora-updateuser-content-item">
              <span class="text-right">姓名</span>
              <input type="text" class="text-left" placeholder="请输入员工姓名">
            </div>
            <!-- End : 姓名 -->

            <!-- Start : 入职时间 -->
            <div class="ora-adduser-content-entry_time ora-updateuser-content-entry_time ora-adduser-content-item ora-updateuser-content-item">
              <span class="text-right">入职时间</span>
              <input type="text" class="text-left" placeholder="如 2017-01-01">
            </div>
            <!-- End : 入职时间 -->

            <!-- Start : 分部 -->
            <div class="ora-adduser-content-department ora-updateuser-content-department ora-adduser-content-item ora-updateuser-content-item">
              <span class="text-right">分部</span>
              <input type="text" class="text-left" placeholder="如: 导师一部">
            </div>
            <!-- End : 分部 -->

            <!-- Start : 上级领导 -->
            <div class="ora-adduser-content-superior ora-updateuser-content-superior ora-adduser-content-item ora-updateuser-content-item">
              <span class="text-right">上级领导</span>
              <input type="text" class="text-left" placeholder="请输入上级领导">
            </div>
            <!-- End : 上级领导 -->
          </div>
          <!-- End : 内容区左侧 -->

          <!-- Start : 内容区右侧 -->
          <div class="adduser-content-group updateuser-content-group">
            <!-- Start : 被投诉次数 -->
            <div class="ora-adduser-content-complaint ora-updateuser-content-complaint ora-adduser-content-item ora-updateuser-content-item">
              <span class="text-right">被投诉次数</span>
              <input type="text" class="text-left" placeholder="请输入被投诉次数">
            </div>
            <!-- End : 被投诉次数 -->

            <!-- Start : 备注 -->
            <div class="ora-adduser-content-remark ora-updateuser-content-remark ora-adduser-content-item ora-updateuser-content-item">
              <span class="text-right">备注</span>
              <textarea placeholder="请输入备注信息"></textarea>
            </div>
            <!-- End : 备注 -->
          </div>
          <!-- End : 内容区右侧 -->
        </div>
        <!-- End: 内容区 -->

        <!-- Start : extra buttons -->
        <div class="ora-adduser-content-btn ora-updateuser-content-btn text-center">
          <button class="modal-button-confirm">提 交</button>
        </div>
        <!-- End : extra buttons -->
      </div>
    </div>
    <!-- End : 添加和更新导师信息模态框 -->
  </body>
</html>
