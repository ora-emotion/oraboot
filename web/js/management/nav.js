/*
 * nav.js
 * 左侧菜单 模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, nav */

var nav = (function () {
  var
    configMap = {},
    stateMap = {
      $nav                : null,
      is_mentor_retracted : true,
      name                : null,
      data_map            : []
    },
    jqueryMap = {},

    setJqueryMap, getParam, parseUri, checkPosition, onClick, initModule;

  setJqueryMap = function () {
    var $nav = stateMap.$nav;
    jqueryMap = {
      $nav                  : $nav,
      $nav_item             : $nav.find('.ora-nav-item'),
      $mentor               : $nav.find('.ora-nav-mentor'),
      $mentor_group_level01 : $nav.find('.ora-nav-mentor-members'),
      $mentor_group_level02 : $nav.find('.ora-nav-mentor-level02-group'),
      $mentor_group_level03 : $nav.find('.ora-nav-mentor-members-group'),
      $user                 : $nav.find('.ora-nav-user'),
      $permission           : $nav.find('.ora-nav-permission'),
      $icon_mentor          : $nav.find('.ora-nav-mentor-title-icon')
    };
  };

  // Start  : getParam()
  // des    : 向后台发起请求。将当前登录人姓名发往后台，获取当前登录人下的导师
  // return :
  //   * Array - 包含当前登录人下的所有导师对象，每个导师对象包含该该导师的所有信息
  //
  getParam = function (uname) {
    console.log(uname);
    $.ajax({
      type : "post",
      url : "user/list",
      data : JSON.stringify({uname : uname}),
      contentType : "application/json;charset=UTF-8",
      jsonType : "json",
      success      : function (data) {
          stateMap.data_map['level01_data'] = data;
        // 将登陆人下的用户传入导师管理模块 -> nav.mentor.dataMap()
        nav.mentor.dataMap(data);
        $.extend(true, stateMap.data_map, data);
      },
      error : function (error) {
        alert('个人信息请求失败！')
      }
    });
  };
  // End : getParam()

  // Start : checkPosition()
  // des   : 检查当前登录人职位
  //
  checkPosition = function (user_map) {
    var mentor_position = user_map.position;
    return mentor_position;
  };
  // End : checkPosition()

  // Start : onClick()
  // des   : 点击事件处理程序
  //
  onClick = function () {
    jqueryMap.$nav_item.click(function (event) {
      var href;
      // 切换按钮样式
      $(this)
        .find('.ora-nav-title')
        .css({ background : '#fca12f' })
        .parent('.ora-nav-item').siblings().find('.ora-nav-title')
        .css({ background : '#225486' });

      href = window.location.href.split('/');
      href = href[href.length - 1];

      // 加载页面
      switch ( $(this)[0].className.split(' ')[0] ) {
        case 'ora-nav-mentor' :                       // 加载导师管理页面
          window.location.href = 'toUser';
          break;
        case 'ora-nav-user' :                         // 加载用户管理页面
            window.location.href = 'toCustomer';
          break;
        case 'ora-nav-permission' :                   // 加载权限管理页面
          window.location.href = 'toPermission';
          break;
        case 'ora-nav-performance' :
          window.location.href = 'toPm';              // 加载业绩管理页面
          break;
        case 'ora-nav-chart' :
          window.location.href = 'toDC';              // 加载业绩图表模块
          break;
        case 'ora-nav-mentor-members' :
          console.log('test');
          break;
        default:
          break;
      }
    });

    // 点击二级菜单，屏蔽事件冒泡(屏蔽父元素点击事件)
    if (stateMap.user_map.position === 2) {
      $('.ora-nav-mentor-members').click(function (event) {
        event.stopPropagation();
      });
    }
  };
  // End : onClick()

  // Start : dataMap()
  // des   : 收集用户登陆后的必要信息
  //
  dataMap = function (user_map) {
    var key_name;
    for (key_name in user_map) {
      if (user_map.hasOwnProperty(key_name)) {
        nav.mentor.userMap({ position : user_map.position });
      }
    }
  };
  // End : dataMap()

  // Start : initModule()
  // des   : 初始化模块
  //
  initModule = function ($nav, user_map) {
    var href;

    stateMap.$nav = $nav;
    stateMap.user_map = user_map;

    setJqueryMap();
    checkPosition(user_map);
    href = window.location.href;
    href = href.split('/');
    href = href[href.length-1];

    onClick();

    // 获取当前登录人姓名
    stateMap.name = $('.ora-header-info-name').text();

    // 加载导师管理模块
    // nav.mentor.userMap( user_map );
    // nav.mentor.initModule( jqueryMap.$nav );
  };
  // End : initModule()

  // 导出公开方法
  return { initModule : initModule, dataMap : dataMap };
}());
