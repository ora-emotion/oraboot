/*
 * oa.js
 * 后台系统
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, oa*/

/***************************** START DESCRIPTIONS *****************************/
//
// Beegin Time : 2017.12.27
// Update Time : 2018.01.03
//
/****************************** END DESCRIPTIONS ******************************/

var oa = (function () {
  var
    configMap = {
      userinfo_map : {}
    },
    stateMap = { selector_map : null },
    jqueryMap = {},

    setJqueryMap, GetData,      CheckPosition,
    parseUrl,     onHashchange, OnClick,  initModule
  ;

  setJqueryMap = function () {
    var selector_map = stateMap.selector_map;
    jqueryMap = {
      selector_map : selector_map,
      $header      : selector_map.$header,
      $nav         : selector_map.$nav
    };
  };

  // Start : GetData()
  // des   : 获取后台数据
  //
  GetData = function () {
    // Start : GetData.booleanData()
    // 当后台返回的值为 Boolean 类型时, 可调用该 ajax 请求方法
    this.booleanData = function (arg_map, fn_map) {
      $.ajax({
        type        : 'post',
        url         : arg_map.url,
        data        : JSON.stringify(arg_map),
        contentType : 'application/json;charset=UTF-8',
        dataType    : 'json',
        success     : function (data) {
          // 当 data = true 时:
          if (data) {
            if (fn_map.suc) { fn_map.suc(); }
          }

          // 当 data = false 时:
          if (!data) {
            if (fn_map.err) { fn_map.err(); }
          }
        },
        error : function (error) {
          console.log('与服务器通讯失败!');
          console.log(error);
        }
      });
    };
    // End : GetData.booleanData()
  };
  // End : GetData()

  // Start : CheckPosition()
  // des   : 检查当前登录人的职位
  //
  CheckPosition = function () {
    // Start : CheckPosition.toggleNavTab()
    // des   : 通过检查当前登录人的职位, 决定是否显示菜单中的某个选项卡。
    // args  : userinfo_map = { user_position : num(int } 当前登录人的职位。
    //
    this.toggleNavTab = function (userinfo_map) {
      var
        user_position = userinfo_map.user_position,
        $nav          = jqueryMap.selector_map.$nav,
        $mentor       = $nav.find('.ora-nav-mentor'),
        $customer     = $nav.find('.ora-nav-user'),
        $permission   = $nav.find('.ora-nav-permission'),
        $performance  = $nav.find('.ora-nav-performance'),
        $chart        = $nav.find('.ora-nav-chart')
      ;

      switch (user_position) {
        case 0 :  // 实习导师
          $mentor.remove();       // 移除 导师管理 选项卡
          $permission.remove();   // 移除 权限管理 选项卡
          $performance.remove();  // 移除 业绩管理 选项卡
          $chart.remove();        // 移除 业绩查看 选项卡
          break;
        case 1 :  // 导师
          $mentor.remove();       // 移除 导师管理 选项卡
          $permission.remove();   // 移除 权限管理 选项卡
          $performance.remove();  // 移除 业绩管理 选项卡
          $chart.remove();        // 移除 业绩查看 选项卡
          break;
        case 2 :  // 主管
          $permission.remove();   // 移除 权限管理 选项卡
          break;
        case 5 :  // 客服
          $customer.remove();     // 移除 用户管理 选项卡
          $permission.remove();   // 移除 权限管理 选项卡
          $performance.remove();  // 移除 业绩管理 选项卡
          $chart.remove();        // 移除 业绩查看 选项卡
        default :
          break;
      }
    };
    // End : CheckPosition.toggleNavTab()
  };
  // End : CheckPosition()

  // Start : parseUrl()
  // des   : 解析浏览器地址
  //
  parseUrl = function (selector_map, userinfo_map) {
    var
      getData       = new GetData(),
      checkPosition = new CheckPosition(),
      onClick       = new OnClick(),
      url           = window.location.href
    ;

    url = url.split('/');
    url = url[url.length - 1].split('#')[0];

    // 当 url 为 toUser, toCustomer, toPermission, toPm 时, 验证当前登录人职位
    switch (url) {
      case 'toRegister' :
        onClick.registerCheckName();               // 检查姓名
        onClick.registerCheckUserName();           // 检查用户名
        break;
      case 'toUser' :                              // 导师管理 模块
        checkPosition.toggleNavTab(userinfo_map);
        break;
      case 'toCustomer' :                          // 用户管理 模块
        checkPosition.toggleNavTab(userinfo_map);
        break;
      case 'toPermission' :                        // 权限管理 模块
        checkPosition.toggleNavTab(userinfo_map);
        break;
      case 'toPm' :                                // 业绩管理 模块
        checkPosition.toggleNavTab(userinfo_map);
        break;
      case 'toDC' :                                // 业绩查看 模块
        checkPosition.toggleNavTab(userinfo_map);
        break;
      default :
        break;
    }

  };
  // End : parseUrl()

  // Start : onHashchange()
  //
  onHashchange = function () {
    var url = window.location.href;

    url = url.split('/');
    url = url[url.length - 1];

    if (url === 'login#!page=1') {
      console.log('hahahah');
      console.log(configMap.userinfo_map);
      switch (configMap.userinfo_map.user_position) {
        case 0 :  // 实习导师
          window.location.href = 'toCustomer';
          break;
        case 1 :  // 导师
          window.location.href = 'toCustomer';
          break;
        case 2 :  // 主管
          window.location.href = 'toCustomer';
          break;
        case 3 :  // 总监
          window.location.href = 'toCustomer';
          break;
        case 4 :  // 超级管理员
          window.location.href = 'toCustomer';
          break;
        case 5 :  // 客服
          window.location.href = 'toUser';
          break;
        default :
          break;
      }
    }
  };
  // End : onHashchange()

  // Start : OnClick()
  // des   : 点击事件处理程序
  //
  OnClick = function () {
    var getData = new GetData();

    // 用户注册时, 检查姓名是否已存在
    this.registerCheckName = function () {
      var
        $name = $('.ora-register-main-name'),
        $tip  = $('.ora-register-main-tip-checkname')
      ;

      $name.find('input').blur(function () {
        getData.booleanData({
          uname : $(this).val(),
          url   : 'user/checkUname'
        }, {
          // 返回 true 时, 姓名可用
          suc : function () { $tip.removeClass('active'); },
          // 返回 false 时, 姓名不可用
          err : function () { $tip.addClass('active'); }
        });
      });
    };

    // 用户注册时, 检查用户名是否已存在
    this.registerCheckUserName = function () {
      var
        $user_name = $('.ora-register-main-username'),
        $tip       = $('.ora-register-main-tip-checkusername')
      ;

      $user_name.find('input').blur(function () {
        getData.booleanData({
          loginname : $(this).val(),
          url       : 'user/checkLoginname'
        }, {
          // 返回 true 时, 姓名可用
          suc : function () { $tip.removeClass('active'); },
          // 返回 false 时, 姓名不可用
          err : function () { $tip.addClass('active'); }
        });
      });
    };
  };
  // End : OnClick()

  initModule = function (selector_map, userinfo_map) {
    stateMap.selector_map = selector_map;
    configMap.userinfo_map = userinfo_map;
    setJqueryMap();
    parseUrl(selector_map, userinfo_map);

    $(window)
      .bind('hashchange', onHashchange)
      .trigger('hashchange');
  };

  return { initModule : initModule };
}());
