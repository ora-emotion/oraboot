/*
 * permission.js
 * 权限管理模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, permission */

/***************************** START DESCRIPTIONS *****************************/
//
// 若当前登录人不为'超级管理员', 不显示'总监'标签, 同时在授予职位时也不能设置'总监'的
// 职位。
//
// 职级 :
//   * 总监(zj) - 3
//   * 主管(zg) - 2
//   * 导师(ds) - 1
//   * 实习导师(sxds) - 0
//
// 权限管理页面共有 6 个 ajax 请求, 分别是 :
//   1.点击总监按钮( getData() )
//     url     -> 'findPermission'
//     arg_map -> { position : 被点击按钮所代表的职级(num) }
//     return  -> [{}, {}, {}, ...]
//   2.点击主管按钮( getData() )
//     url     -> 'findPermission'
//     arg_map -> { position : 被点击按钮所代表的职级(num) }
//     return  -> [{}, {}, {}, ...]
//   3.点击导师按钮( getData() )
//     url     -> 'findPermission'
//     arg_map -> { position : 被点击按钮所代表的职级(num) }
//     return  -> [{}, {}, {}, ...]
//   4.点击实习导师按钮( getData() )
//     url     -> 'findPermission'
//     arg_map -> { position : 被点击按钮所代表的职级(num) }
//     return  -> [{}, {}, {}, ...]
//   5.点击搜索按钮
//     url     -> 'selectPermission'
//     arg_map -> { user_uname : 搜索框内的值 }
//     return  -> [{}, {}, {}, ...]
//   6.点击操作栏确认按钮
//     url     -> 'updatePermission'
//     arg_map -> { key_name : key_name_val, ... } (当前行)
//     return  -> Boolean
//                true  - 更新成功
//                false - 更新失败
//
//   * 所有 ajax 请求均调用 getData() 方法, 该方法接收 4 个参数 :
//     * 第一个参数是发起 ajax 请求的 url
//     * 第二个参数是向后台发送的数据 arg_map
//     * 第三个参数是成功获取数据后执行的函数 suc
//     * 第四个参数是获取数据失败后执行的函数 err
//
/****************************** END DESCRIPTIONS ******************************/

var permission = (function () {
  var configMap = {
        // 当前登录人信息
        // userinfo_map -> { uname : 当前登录人姓名, posiiotn : 当前登录人职级 }
        userinfo_map : {}
      },
      stateMap = {
        permission      : null,
        is_config_state : false
      },
      varMap = {},

      setVarMap,      getData,   toggleTab, createList,
      togglePosition, onClick,   initModule;

  // Start : setVarMap()
  // des   : 缓存变量集合
  //
  setVarMap = function () {
    var permission = stateMap.permission;
    varMap = {
      permission : permission,
      tab        : permission.querySelector('.ora-user-permission-tab'),
      tab_btn    : permission.querySelector('.ora-user-permission-tab-btn'),
      tab_search : permission.querySelector('.ora-user-permission-tab-search'),
      pagination : permission.querySelector('.ora-user-permission-pagination'),
      search_box : permission.querySelector('.ora-user-permission-tab-search input'),
      search_btn : permission.querySelector('.ora-user-permission-tab-search-icon')
    };
  };
  // End : setVarMap()

  // Start : getData()
  // des   : ajax 请求
  //         该方法接收 4 个参数
  //           * 第一个参数是发起 ajax 请求的 url
  //           * 第二个参数是向后台发送的数据 arg_map
  //           * 第三个参数是成功获取数据后执行的函数 suc
  //           * 第四个参数是获取数据失败后执行的函数 err
  //
  getData = function (url, arg_map, suc, err) {
    $.ajax({
      type        : 'post',
      url         : url,
      data        : JSON.stringify(arg_map),
      contentType : 'application/json;charset=UTF-8',
      dataType    : 'json',
      success     : function (data) {
        if(data.length === 0){
          return false;
        }

        if (suc) { suc(data); }
      },
      error : function (error) {
        console.log( arg_map );
        if (err) { err(); }
      }
    });
  };
  // End : getData()

  // Start  : toggleTab()
  // des    : 根据当前登录人职级，判断是否显示 '总监' Tab 选项卡。当登录人职级为
  //          总监(2)时，移除 '总监' Tab 选项卡。
  // return : none
  //
  toggleTab = function () {
    var position, tab_zj;

    position = configMap.userinfo_map.position;
    tab_zj   = varMap.tab_btn.querySelector('.ora-user-permission-tab-btn-zj');

    // 当前登录人职级为总监(3)时，移除 '总监' 选项卡并将第一个选项卡置为激活状态
    if (parseInt(position, 10) === 3) {
      // 移除 '总监' Tab 选项卡
      varMap.tab_btn.removeChild(tab_zj);
      // 将第一个 Tab 选项卡置为激活状态
      varMap.tab_btn.querySelector('span:nth-child(1)').classList.add('active');
    }
  };
  // End : toggleTab()

  // Start  : createList()
  // des    : 根据后台获取的数据渲染对应职级的权限列表
  // return : none
  //
  createList = function (data) {
    var result,     i,             j,                  k,
        group_html, page_num_html, pagination_content, pagination_controllers,
        page_html,  user_position, key_name,           background_img,
        ele_map;

    result = [];
    pagination_content     = varMap.pagination.querySelector('.pagination-content');
    pagination_controllers = varMap.pagination.querySelector('.pagination-controllers');

    $(pagination_content).children().remove();
    $(pagination_controllers).children().remove();

    // 数据分组
    for (i = 0; i < data.length; i += 10) {
      result.push( data.slice(i, i + 10) );
    }

    for (j = 0; j < result.length; j++) {
      group_html =
        '<div class="pagination-content-page">' +
          '<table>' +
            '<tbody>' +
              '<tr>' +
                '<th class="serial-num">序号</th>' +
                '<th class="name">姓名</th>' +
                '<th class="position">职位</th>' +
                '<th class="permission-allow">授予权限</th>' +
                '<th class="delete-file">文件删除</th>' +
                '<th class="delete-customer">学员删除</th>' +
                '<th class="update-customer">学员修改</th>' +
                '<th class="delete-mentor">导师删除</th>' +
                '<th class="update-mentor">导师修改</th>' +
                '<th class="config">操作</th>' +
              '</tr>' +
            '</tbody>' +
          '</table>' +
        '</div>';

      page_num_html =
        '<span class="pagination-control-controllers-num pointer margin-px text-center">' +
          (j + 1) +
        '</span>';

      // 渲染每一页的外部容器
      $(pagination_content).append(group_html);
      $(pagination_controllers).append(page_num_html);

      // 渲染每一页中每一行的数据元素
      for (k = 0; k < result[j].length; k++) {

        // 判断职位
        switch (result[j][k]['user_position']) {
          case 3 :
            user_position = '总监';
            $('.ora-user-permission-tab-btn-zj').addClass('active')
              .siblings().removeClass('active');
            break;
          case 2 :
            user_position = '主管';
            $('.ora-user-permission-tab-btn-zg').addClass('active')
              .siblings().removeClass('active');
            break;
          case 1 :
            user_position = '导师';
            $('.ora-user-permission-tab-btn-ds').addClass('active')
              .siblings().removeClass('active');
            break;
          case 0 :
            user_position = '实习导师';
            $('.ora-user-permission-tab-btn-sxds').addClass('active')
              .siblings().removeClass('active');
            break;
          default:
            break;
        }

        // 授予权限
        switch (result[j][k]['permission_user']) {
          case 0 :
            permission_user = 'default.png';
            break;
          case 1 :
            permission_user = 'active.png';
            break;
          default:
            break;
        }

        // 删除文件
        switch (result[j][k]['delete_file']) {
          case 0 :
            delete_file = 'default.png';
            break;
          case 1 :
            delete_file = 'active.png';
            break;
          default:
            break;
        }

        // 删除客户
        switch (result[j][k]['delete_cust']) {
          case 0 :
            delete_customer = 'default.png';
            break;
          case 1 :
            delete_customer = 'active.png';
            break;
          default:
            break;
        }

        // 更新客户
        switch (result[j][k]['update_cust']) {
          case 0 :
            update_customer = 'default.png';
            break;
          case 1 :
            update_customer = 'active.png';
            break;
          default:
            break;
        }

        // 删除导师
        switch (result[j][k]['delete_user']) {
          case 0 :
            delete_mentor = 'default.png';
            break;
          case 1 :
            delete_mentor = 'active.png';
            break;
          default:
            break;
        }

        // 更新导师
        switch (result[j][k]['update_user']) {
          case 0 :
            update_mentor = 'default.png';
            break;
          case 1 :
            update_mentor = 'active.png';
            break;
          default:
            break;
        }

        page_html =
          '<tr>' +
            '<td class="serial-num text-center">' + result[j][k]['id'] + '</td>' +
            '<td class="name text-center">' + result[j][k]['user_uname'] + '</td>' +
            '<td class="position text-center">' +
              '<span class="position-icon"></span>' +
              '<span data-state="' + result[j][k]['user_position'] + '" class="position-text text-center">' + user_position + '</span>' +
              '<div class="position-select">' +
                '<span data-state="3" class="text-center">总监</span>' +
                '<span data-state="2" class="text-center">主管</span>' +
                '<span data-state="1" class="text-center">导师</span>' +
                '<span data-state="0" class="text-center">实习导师</span>' +
              '</div>' +
            '</td>' +
            '<td class="permission text-center">' +
              '<span data-state="' + result[j][k]['permission_user'] + '" class="permission-check permission-allow" style="background: url(\'images/permission/icon_check_' + permission_user + '\')"></span>' +
            '</td>' +
            '<td class="permission text-center">' +
              '<span data-state="' + result[j][k]['delete_file'] + '" class="permission-check delete-file" style="background: url(\'images/permission/icon_check_' + delete_file + '\')"></span>' +
            '</td>' +
            '<td class="permission text-center">' +
              '<span data-state="' + result[j][k]['delete_cust'] + '" class="permission-check delete-customer" style="background: url(\'images/permission/icon_check_' + delete_customer + '\')"></span>' +
            '</td>' +
            '<td class="permission text-center">' +
              '<span data-state="' + result[j][k]['update_cust'] + '" class="permission-check update-customer" style="background: url(\'images/permission/icon_check_' + update_customer + '\')"></span>' +
            '</td>' +
            '<td class="permission text-center">' +
              '<span data-state="' + result[j][k]['delete_user'] + '" class="permission-check delete-mentor" style="background: url(\'images/permission/icon_check_' + delete_mentor + '\')"></span>' +
            '</td>' +
            '<td class="permission text-center">' +
              '<span data-state="' + result[j][k]['update_user'] + '" class="permission-check update-mentor" style="background: url(\'images/permission/icon_check_' + update_mentor + '\')"></span>' +
            '</td>' +
            '<td class="submit text-center">提交</td>' +
          '</tr>';

        // 向每一页中渲染 10 条数据
        $( $('.pagination-content-page')[j] ).find('tbody').append(page_html);

      }
    }

    // 加载分页器
    pagination.initModule( $('#pagination') );

    ele_map = {
      position : document.querySelectorAll('td.position'),
      submit   : document.querySelectorAll('td.submit')
    };

    onClick(ele_map);
  };
  // End : createList()

  // Start : onClick()
  // des   : 点击事件处理程序
  //
  onClick = function (ele_map) {
    var
      position = ele_map.position,
      submit   = ele_map.submit,
      data_state, toggleDataSstate
    ;

    // 选择职位
    $(position).find('.position-text').unbind('click').click(function () {
      // 下拉菜单
      // $(this).parent().parent().siblings().find('.position-select').animate(
      //   { opacity : 0, height : 0 }, 200, function () { $(this).hide(); }
      // );

      $(this).siblings('.position-select').show();

      $(this).siblings('.position-select').animate(
        {
          opacity : 1,
          height  : $(this).siblings('.position-select').find('span').length *
                    $(this).siblings('.position-select').find('span').height()
        },
        200
      );
    });
    $(position).find('.position-select span').unbind('click').click(function () {
      $(this).parent().siblings('.position-text').text( $(this).text() );
      $(this).parent().siblings('.position-text').attr('data-state', $(this).attr('data-state'));

      $(this).parent().animate(
        { opacity : 0, height : 0 }, 200, function () { $(this).hide(); }
      );

    });

    // 点击某个权限时，切换对应元素的 data-state 值
    // 提交时需要用到这些值
    function toggleDataSstate(that) {
      data_state = that.attr('data-state');
      if (data_state == 0) {
        that.attr('data-state', 1);
        that.css({
          background : 'url("images/permission/icon_check_active.png")'
        });
      }
      if (data_state == 1) {
        that.attr('data-state', 0);
        that.css({
          background : 'url("images/permission/icon_check_default.png")'
        });
      }
    }

    // 授予权限
    $('span.permission-allow').unbind('click').click(function () {
      toggleDataSstate( $(this) );
    });

    // 删除文件
    $('span.delete-file').unbind('click').click(function () {
      toggleDataSstate( $(this) );
    });

    // 删除客户
    $('span.delete-customer').unbind('click').click(function () {
      toggleDataSstate( $(this) );
    });

    // 升级客户
    $('span.update-customer').unbind('click').click(function () {
      toggleDataSstate( $(this) );
    });

    // 删除导师
    $('span.delete-mentor').unbind('click').click(function () {
      toggleDataSstate( $(this) );
    });

    // 升级导师
    $('span.update-mentor').unbind('click').click(function () {
      toggleDataSstate( $(this) );
    });

    // 提交修改
    $('td.submit').click(function () {
      var arg_map,
          id,
          user_uname,
          delete_cust,
          delete_file,
          delete_user,
          permission_user,
          update_cust,
          update_user,
          user_position;

      arg_map = {
        id              : parseInt($(this).siblings('td.serial-num').text(), 10),
        user_uname      : $(this).siblings('td.name').text(),
        user_position   : parseInt($(this).siblings().find('span.position-text').attr('data-state'), 10),
        permission_user : parseInt($(this).siblings().find('span.permission-allow').attr('data-state'), 10),
        delete_file     : parseInt($(this).siblings().find('span.delete-file').attr('data-state'), 10),
        delete_cust     : parseInt($(this).siblings().find('span.delete-customer').attr('data-state'), 10),
        update_cust     : parseInt($(this).siblings().find('span.update-customer').attr('data-state'), 10),
        delete_user     : parseInt($(this).siblings().find('span.delete-mentor').attr('data-state'), 10),
        update_user     : parseInt($(this).siblings().find('span.update-mentor').attr('data-state'), 10)
      };

      console.log( arg_map );

      getData(
        'updatePermission',
        arg_map,
        createList
      );

    });

  };
  // End : onClick

  // Start : initModule()
  // des   : 初始化模块
  //
  initModule = function (permission, userinfo_map) {
    stateMap.permission    = permission;
    configMap.userinfo_map = userinfo_map;
    setVarMap();

    toggleTab();

    getData(
      'findPermission',
      {
        user_position : parseInt(varMap.tab_btn.querySelector('span:nth-child(1)').getAttribute('data-position'), 10)
      },
      createList
    );

    // 点击搜索按钮
    $(varMap.search_btn).unbind('click').click(function () {
      // $('span.ora-user-permission-tab-btn-zj').addClass('active');
      if (varMap.search_box.value === '') {
        $('.ora-user-permission-tab-btn span')
          .css({ background : 'transparent' })
          .removeClass('.active');
      }

      getData(
        'selectPermission',
        { user_uname : $(this).siblings('input').val() },
        createList
      );
    });

    // 点击总监按钮
    $(varMap.tab_btn).unbind('click').find('.ora-user-permission-tab-btn-zj').click(function () {
      // $(this).addClass('active').siblings().removeClass('active');
      $(this).css({ background : '' });
      getData(
        'findPermission',
        { user_position : parseInt($(this).attr('data-position'), 10) },
        createList
      );
    });

    // 点击主管按钮
    $(varMap.tab_btn).unbind('click').find('.ora-user-permission-tab-btn-zg').click(function () {
      // $(this).addClass('active').siblings().removeClass('active');
      $(this).css({ background : '' });
      getData(
        'findPermission',
        { user_position : parseInt($(this).attr('data-position'), 10) },
        createList
      );
    });

    // 点击导师按钮
    $(varMap.tab_btn).unbind('click').find('.ora-user-permission-tab-btn-ds').click(function () {
      // $(this).addClass('active').siblings().removeClass('active');
      $(this).css({ background : '' });
      getData(
        'findPermission',
        { user_position : parseInt($(this).attr('data-position'), 10) },
        createList
      );
    });

    // 点击实习导师按钮
    $(varMap.tab_btn).unbind('click').find('.ora-user-permission-tab-btn-sxds').click(function () {
      // $(this).addClass('active').siblings().removeClass('active');
      $(this).css({ background : '' });
      getData(
        'findPermission',
        { user_position : parseInt($(this).attr('data-position'), 10) },
        createList
      );
    });

  };
  // End : initModule()

  // 导出公开方法
  return {
    initModule : initModule,
    getData    : getData
  };
}());
