/*
 * nav.mentor.js
 * 左侧菜单模块 - 导师管理
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, nav */

nav.mentor = (function () {
  var
    configMap = {
      main_html : String()
        + '<!-- Start : 总监 -->'
        + '<span class="ora-nav-mentor-members-level_01">'
          + '总监'
          + '<span class="icon-plus"></span>'
        + '</span>'
        + '<!-- Start : 主管 -->'
        + '<div class="ora-nav-mentor-level02-group">'
          + '<!-- Start : 导师 -->'
          + '<div class="ora-nav-mentor-members-group">'
            + '<!-- 这里循环遍历插入导师 -->'
            + '<!-- <span class="ora-nav-mentor-members-level_03">导师 01</span> -->'
            + '<span class="ora-nav-mentor-members-level_03">导师 01</span>'
            + '<span class="ora-nav-mentor-members-level_03">导师 01</span>'
            + '<span class="ora-nav-mentor-members-level_03">导师 01</span>'
            + '<span class="ora-nav-mentor-members-level_03">导师 01</span>'
            + '<span class="ora-nav-mentor-members-level_03">导师 01</span>'
            + '<span class="ora-nav-mentor-members-level_03">导师 01</span>'
            + '<span class="ora-nav-mentor-members-level_03">导师 01</span>'
            + '<span class="ora-nav-mentor-members-level_03">导师 01</span>'
            + '<span class="ora-nav-mentor-members-level_03">导师 01</span>'
            + '<span class="ora-nav-mentor-members-level_03">导师 01</span>'
            + '<span class="ora-nav-mentor-members-level_03">导师 01</span>'
          + '</div>'
          + '<!-- End : 导师 -->'
        + '</div>'
        + '<!-- End : 主管 -->'
        + '<!-- End : 总监 -->',
      level_02_html : String() + '二级菜单',
      level_03_html : String() + '一级菜单',

      // 导航菜单展开或收起时的时间
      nav_move_time : 250
    },
    stateMap = {
      $nav     : null,
      uid      : null,
      data_map : [],
      user_map : {}
    },
    jqueryMap = {},

    setJqueryMap,        createLevelTwoEle,   createLevelThreeEle,
    getParamLevel02Data, getParamLevel03Data, getParamLevel04Data,
    checkUserPosition,   toggleMentorMenu,    dataMap,
    userMap,             initModule;

  setJqueryMap = function () {
    var $nav = stateMap.$nav;

    jqueryMap = {
      $nav        : $nav,
      $mentor     : $nav.find('.ora-nav-mentor'),
      $user       : $nav.find('.ora-nav-user'),
      $permission : $nav.find('.ora-nav-permission')
    };
  };

  getParamLevel04Data = function (url, uname) {
    $.ajax({
      type         : 'post',
      url          : 'user/list',
      // url          : '../../js/management/' + url + '.json',
      data         : JSON.stringify({uname : uname}),
      contentType  : 'application/json;charset=UTF-8',
      dataType     : 'json',
      success      : function (data) {
        console.log(name);

          // 执行后续操作
        // ...
      },
      error : function (error) {
        alert('三级菜单数据请求失败！')
      }
    });
  };

  // Start : createLevelThreeEle()
  // des   : 创建三级菜单
  //
  createLevelThreeEle = function (that) {
    var
      i,                data_collection,     data_length,      level03_html,
      menu_ht,          is_extend_lg,        is_extend_st,     is_retract,
      is_sliding,       that_arr,            that_siblings,    that_siblings_ht,
      that_grandfather, that_grandfather_ht, name;

      that_arr         = that[0].className.split(' ');
      that_siblings    = that.siblings('div');
      that_parent      = that.parent();           // 当前点击元素的容器
      that_grandfather = that.parent().parent();  // 当前点击元素的爷爷容器

      // 三级导航下的数据集合
      data_collection = stateMap.data_map['level03_data'];
      // 三级导航下包含的数据条目
      data_length = stateMap.data_map['level03_data'].length;

      menu_ht      = that.siblings().height();
      is_retract   = 0 === menu_ht;
      is_extend_lg = 30 * 7 === menu_ht;
      is_extend_st = 30 * data_length === menu_ht;
      is_sliding   = !is_retract && (!is_extend_lg || !is_extend_st);

      // 判断当前点击元素的兄弟元素下是否有子元素，若无则将三级导航写入，若有则忽略
      if ( $(that_siblings).children().length === 0 ) {
        for (i = 0; i < data_length; i++) {
          level03_html =
          '<span class="ora-nav-mentor-members-level_03">' +
            data_collection[i]['uname'] +
          '</span>';

          $(that_siblings).append(level03_html);
        }

        // 判断二级导航菜单的高度
        // 当三级菜单的条目大于 7 时，二级菜单的高度最高为 30px * 7
        if (data_length > 7) {
          that_siblings_ht    = 30 * 7;
          that_grandfather_ht = 30 * 7 + stateMap.data_map['level02_data'].length * 40 + 40;
        } else {
          // 当三级菜单的条目小于 7 时，二级菜单的高度为 30px * 三级菜单的条目
          that_siblings_ht    = 30 * data_length;
          that_grandfather_ht = 30 * data_length + stateMap.data_map['level02_data'].length * 40 + 40;
        }

        // 三级菜单的高度
        that_siblings.animate(
          { height : that_siblings_ht },
          configMap.nav_move_time,
          function () {
            // 三级菜单展开后的图标样式
            $('.ora-nav-mentor-members-level_02').find('.icon-plus').css({
              background : 'url("../../images/management/icon-plus.png")'
            });
            that.find('.icon-plus').css({
              background : 'url("../../images/management/icon-minus.png")'
            });

            $('.ora-nav-mentor-members-level_03').click(function (event) {
              name = $(this).text();
              getParamLevel04Data('level03', name);

              event.stopPropagation();
            });
          }
        ).parent().siblings().find('.ora-nav-mentor-members-group').animate(
          { height : 0 }, configMap.nav_move_time
        );

        // 增加二级容器的高度
        that_grandfather.animate(
          { height : that_grandfather_ht }, configMap.nav_move_time
        );

        // 增加根容器的高度
        $('.ora-nav-mentor-members').animate(
          {
            height : that_grandfather_ht + (stateMap.data_map['level01_data'].length * 40) - 40
          },
          configMap.nav_move_time
        );

        return true;
      }

      // 展开点击的三级菜单
      if (is_retract) {
        // 当前被点击的元素的兄弟容器展开
        if (data_length > 7) {

          that_siblings.animate(
            { height : 30 * 7 },
            configMap.nav_move_time,
            function () {
              // 三级菜单展开后的图标样式
              $('.ora-nav-mentor-members-level_02').find('.icon-plus').css({
                background : 'url("../../images/management/icon-plus.png")'
              });
              that.find('.icon-plus').css({
                background : 'url("../../images/management/icon-minus.png")'
              });
            }
          ).parent().siblings().find('.ora-nav-mentor-members-group').animate(
            { height : 0 }, configMap.nav_move_time
          );

          // 增加二级容器的高度
          that_grandfather.animate(
            {
              height : 40 + stateMap.data_map['level02_data'].length * 40 + 30 * 7
            }, configMap.nav_move_time
          );

          // 增加根容器的高度
          $('.ora-nav-mentor-members').animate(
            {
              height : stateMap.data_map['level01_data'].length * 40 + stateMap.data_map['level02_data'].length * 40 + 30 * 7
            },
            configMap.nav_move_time
          );

        }


          if (data_length <= 7) {

              that_siblings.animate(
                  { height : 30 * data_length },
                  configMap.nav_move_time,
                  function () {
                      // 三级菜单展开后的图标样式
                      $('.ora-nav-mentor-members-level_02').find('.icon-plus').css({
                          background : 'url("../../images/management/icon-plus.png")'
                      });
                      that.find('.icon-plus').css({
                          background : 'url("../../images/management/icon-minus.png")'
                      });
                  }
              ).parent().siblings().find('.ora-nav-mentor-members-group').animate(
                  { height : 0 }, configMap.nav_move_time
              );

              // 增加二级容器的高度
              that_grandfather.animate(
                  {
                      height : 40 + stateMap.data_map['level02_data'].length * 40 + 30 * data_length
                  }, configMap.nav_move_time
              );

              // 增加根容器的高度
              $('.ora-nav-mentor-members').animate(
                  {
                      height : stateMap.data_map['level01_data'].length * 40 + stateMap.data_map['level02_data'].length * 40 + 30 * 7
                  },
                  configMap.nav_move_time
              );

          }

      }

      // 收起三级菜单
      if ( is_extend_lg || is_extend_st) {
        // 三级
        that_siblings.animate({ height : 0 }, configMap.nav_move_time);

        // 二级
        that_grandfather.animate(
            { height : 40 + stateMap.data_map['level02_data'].length * 40 },
            configMap.nav_move_time
        );

        // 一级
        that_grandfather.parent().animate(
            {
                height : stateMap.data_map['level01_data'].length * 40 + stateMap.data_map['level02_data'].length * 40
            },
            configMap.nav_move_time
        );

        // 折叠后的三级菜单图标样式
        $('.ora-nav-mentor-members-level_02').find('.icon-plus').css({
            background : 'url("../../images/management/icon-plus.png")'
        });


        return true;
      }

  };
  // End : createLevelThreeEle()

  // Start : getParamLevel03Data()
  // des   : 请求三级菜单对应的数据
  //
  getParamLevel03Data = function (url, that, uname) {
    $.ajax({
      type         : 'post',
      url          : 'user/list',
      // url          : '../../js/management/' + url + '.json',
      data         : JSON.stringify({uname : uname}),
      contentType  : 'application/json;charset=UTF-8',
      dataType     : 'json',
      success      : function (data) {
        stateMap.data_map['level03_data'] = data;
        // 创建二级菜单，将被点击元素的最后一个 class 名传入
        createLevelThreeEle(that);
      },
      error : function (error) {
        alert('三级菜单数据请求失败！')
      }
    });
  };
  // End : getParamLevel03Data()

  // Start : createLevelTwoEle()
  // des   : 创建二级菜单
  //
  createLevelTwoEle = function (that) {
    var
      i,        data_collection, data_length, level02_html,
      menu_ht,  is_extend,       is_retract,  is_sliding,
      that_arr, name;

    that_arr    = $(that)[0].className.split(' ');
    that_parent = $(that).parent('.' + that_arr[that_arr.length - 1]);

    // 二级导航下的数据集合
    data_collection = stateMap.data_map['level02_data'];
    // 二级导航下包含的数据条目
    data_length = stateMap.data_map['level02_data'].length;

    menu_ht    = that_parent.height();
    is_retract = 40 === menu_ht;
    is_extend  = 40 + data_length * 40 === menu_ht;
    is_sliding = !is_retract && !is_extend;

    // 当二级菜单数据渲染到页面后，不再渲染第二遍
    if ( that_parent.children('div').length === 0 ) {
      for (i = 0; i < data_length; i++) {
        level02_html =
          '<!-- Start : 主管 -->' +
          '<div class="ora-nav-mentor-level02-group group_' + i + '">' +
            '<span class="ora-nav-mentor-members-level_02 group_' + i + '">' +
              data_collection[i]['uname'] +
              '<span class="icon-plus"></span>' +
            '</span>' +
            '<div class="ora-nav-mentor-members-group group_' + i + '">' +
            '</div>' +
          '</div>' +
          '<!-- End : 主管 -->';

        // 将二级菜单数据渲染到指定位置
        that_parent.append(level02_html);
        that_parent.css({ height : 40 });
      }

      // 展开根元素
      that_parent.parent().animate(
        {
          height : data_length * 40 + stateMap.data_map['level01_data'].length * 40
        },
        configMap.nav_move_time
      );

      // 展开父级元素，折叠父级元素的兄弟元素，并折叠各自的按钮样式
      that_parent.animate(
        { height : data_length * 40 + 40 }, configMap.nav_move_time,
        function () {
          // 设置父级元素展开状态的图标样式
          $('.ora-nav-mentor-members-level_01-wrap>span>span').css({
            background : 'url("../../images/management/icon-plus.png")'

          });
          that.find('.icon-plus').css({
            background : 'url("../../images/management/icon-minus.png")'
          });

          if (stateMap.user_map.position !== 4) {
              $('.ora-nav-mentor-members-level_02').find('.icon-plus').remove();
              return true;
          }

          $('.ora-nav-mentor-members-level_02').click(function (event) {
            // 当前登录人职级为超级管理员(4)时，方可请求三级导航
            if (stateMap.user_map.position === 4) {
              name = $(this).text();
              getParamLevel03Data('level03', $(this), name);
            }
            // 阻止事件传播
            event.stopPropagation();
          });
        }
      ).siblings().animate({ height : 40 }, configMap.nav_move_time);

      // 收起三级容器
      that_parent.siblings('div').find('.ora-nav-mentor-members-group').css({
        height : 0
      }).siblings('span').find('.icon-plus').css({
        background : 'url("../../images/management/icon-plus.png")'
      });

      return true;
    } else {
      // 避免竞争条件
      if (is_sliding) { return false; }

      // 展开二级菜单
      if (is_retract) {
        that_parent.animate(
          { height : data_length * 40 + 40 }, configMap.nav_move_time,
          function () {
            // 设置父级元素展开状态的图标样式
            $('.ora-nav-mentor-members-level_01-wrap>span>span').css({
              background : 'url("../../images/management/icon-plus.png")'
            });
            that.find('.icon-plus').css({
              background : 'url("../../images/management/icon-minus.png")'
            });
          }
        ).siblings().animate({ height : 40 }, configMap.nav_move_time);

        // 展开根容器
        that_parent.parent().animate(
          {
            height : data_length * 40 + stateMap.data_map['level01_data'].length * 40
          },
          configMap.nav_move_time
        );

        // 收起三级容器
        that_parent.siblings('div').find('.ora-nav-mentor-members-group').css({
          height : 0
        }).siblings('span').find('.icon-plus').css({
          background : 'url("../../images/management/icon-plus.png")'
        });
      }

      // 收起二级菜单
      if (is_extend) {
        console.log( that_parent );
        that_parent.animate(
          { height : 40 },
          configMap.nav_move_time,
          function () {
            // 设置父元素折叠状态的图标按钮
            that.find('.icon-plus').css({
              background : 'url("../../images/management/icon-plus.png")'
            });
          }
        );

        // 收起根容器
        that_parent.parent().animate(
          { height : stateMap.data_map['level01_data'].length * 40 },
          configMap.nav_move_time
        );

        // 收起三级容器
        that_parent.siblings('div').find('.ora-nav-mentor-members-group').css({
          height : 0
        }).siblings('span').find('.icon-plus').css({
          background : 'url("../../images/management/icon-plus.png")'
        });
      }

      return true;
    }

  };
  // ENd : createLevelTwoEle()

  // Start : getParamLevel02Data()
  // des   : 请求二级菜单对应的数据
  //
  getParamLevel02Data = function (url, that, uname) {
    $.ajax({
      type         : 'post',
      url          : 'user/list',
      // url          : '../../js/management/' + url + '.json',
      data         : JSON.stringify({uname : uname}),
      contentType  : 'application/json;charset=UTF-8',
      dataType     : 'json',
      success      : function (data) {
        stateMap.data_map['level02_data'] = data;

        // 创建二级菜单
        createLevelTwoEle(that);
      },
      error : function (error) {
        alert('个人信息请求失败！')
      }
    });
  };
  // End : getParamLevel02Data()

  toggleMentorMenu = function () {
    var
      i,          menu_ht, is_extend,    is_retract,
      is_sliding, html,    level01_data, name;

    menu_ht      = $('.ora-nav-mentor-members').height();
    is_retract   = 0 === menu_ht;
    is_extend    = 40 * stateMap.data_map['level01_data'].length === menu_ht;
    is_sliding   = !is_extend && !is_retract;
    level01_data = stateMap.data_map['level01_data'];



    // 当一级导航被写入页面后，不再写入
    if ( $('.ora-nav-mentor-members').children('div').length === 0 ) {
      // 将一级导航渲染到页面指定位置
      for (i = 0; i < stateMap.data_map['level01_data'].length; i++) {
        html =
          '<!-- Start : 总监 -->' +
          '<div class="ora-nav-mentor-members-level_01-wrap group_' + i + '">' +
            '<span class="ora-nav-mentor-members-level_01 group_' + i + '">' +
              stateMap.data_map['level01_data'][i]['uname'] +
              '<span class="icon-plus"></span>' +
            '</span>' +
          '</div>' +
          '<!-- End : 总监 -->';

          $('.ora-nav-mentor-members').append(html);
      }

      // 展开一级导航 - 设置根元素(.ora-nav-mentor-members)的高度
      $('.ora-nav-mentor-members').animate(
        { height  : level01_data.length * 40, opacity : 1 },
        configMap.nav_move_time,
        function () {
          // 设置一级折叠导航的图标样式
          $('.ora-nav-mentor-title-icon').css({
            background : 'url("../../images/management/icon-minus.png") no-repeat center center'
          });

            // 当登录人职位小于主管(3)时，不显示按钮右侧的小按钮
            if ( stateMap.user_map.position < 3 ) {
              $('.ora-nav-mentor-members-level_01').find('.icon-plus').remove();
            }

          $('.ora-nav-mentor-members-level_01').click(function (event) {
            // 当登录人职级为总监(3)或超级管理员(4)时，请求二级菜单的数据
            if (stateMap.user_map.position === 3 ||
              stateMap.user_map.position === 4) {
                name = $(this).text();
                getParamLevel02Data('level02', $(this), name);
            }

            // 阻止事件传播
            event.stopPropagation();
          });
        }
      );

      return true;
    } else {
      // 一级导航展开和收起

      // 避免竞争条件
      if (is_sliding) { return false; }

      // 展开一级导航
      if (is_retract) {
        $('.ora-nav-mentor-members').animate(
          {
            height  : level01_data.length * 40,
            opacity : 1
          },
          configMap.nav_move_time,
          function () {
            // 设置一级折叠导航的图标样式
            $('.ora-nav-mentor-title-icon').css({
              background : 'url("../../images/management/icon-minus.png") no-repeat center center'
            });
          }
        );
        return true;
      }

      // 收起一级导航
      $('.ora-nav-mentor-members').animate(
        {
          height : 0, opacity : 0
        },
        configMap.nav_move_time,
        function () {
          // 设置一级折叠导航的图标样式
          $('.ora-nav-mentor-title-icon').css({
            background : 'url("../../images/management/icon-plus.png") no-repeat center center'
          });
        }
      );
      return true;
    }

  };

  // Start  : checkUserPosition
  // des    : 判断当前登陆用户的职位，决定显示哪些按钮信息
  //   * 职位 - 0 or 1
  //     只显示用户管理，不显示 导师管理 && 权限管理
  //   * 职位 - 2
  //     显示 导师管理 && 用户管理，不显示 权限管理
  //   * 职位 - 3 or 4
  //     显示 导师管理 && 用户管理 && 权限管理
  // return : none
  //
  checkUserPosition = function () {
    var user_position;
    user_position = stateMap.user_map.position;
    console.log('当前登陆用户的职位 : ' + user_position);
    switch (user_position) {
      case 0 :  // 实习导师登陆
        $('.ora-nav-mentor').remove();      // 不显示导师管理
        $('.ora-nav-permission').remove();  // 不显示权限管理
        jqueryMap.$user.css({ marginTop : 50 });
        break;
      case 1 :  // 导师登陆
        $('.ora-nav-mentor').remove();      // 不显示导师管理
        $('.ora-nav-permission').remove();  // 不显示权限管理
        jqueryMap.$user.css({ marginTop : 50 });
        break;
      case 2 :  // 主管登陆
        $('.ora-nav-permission').remove();  // 不显示权限管理
        break;
      case 3 :  // 总监登陆
        $('.ora-nav-mentor-members').css({ height : '0', opacity : 0 });
        $('.ora-nav-mentor-level02-group').css({ height : '0' });
        break;
      case 4 :  // 超级管理员登陆
        $('.ora-nav-mentor-members').css({ height : '0', opacity : 0 });
        $('.ora-nav-mentor-level02-group').css({ height : '0' });
        $('.ora-nav-mentor-members-group').css({ height : '0' });
        break;
      default:
        break;
    }

  };
  // End : checkUserPosition()

  // Start : dataMap()
  // des   : 接收后台请求的数据，当前登陆用户下的导师集合
  //
  dataMap = function (data_map) {
    $.extend(true, stateMap.data_map, data_map);
    stateMap.data_map['level01_data'] = data_map;
    toggleMentorMenu();
  };
  // End : dataMap

  // Start : userMap()
  // des   : 获取当前登陆人的必要信息
  //
  userMap = function (user_map) {
    var key_name;
    for (key_name in user_map) {
      if (user_map.hasOwnProperty(key_name)) {
        stateMap.user_map[key_name] = user_map[key_name];
      }
    }
  };
  // End : userMap()

  initModule = function ($nav) {
    stateMap.$nav = $nav;
    setJqueryMap();

    checkUserPosition();
  };

  return { initModule : initModule, dataMap : dataMap, userMap : userMap };
}());
