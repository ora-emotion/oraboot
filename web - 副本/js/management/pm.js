/*
 * pm.js
 * 业绩管理模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, pm*/

/***************************** START DESCRIPTIONS *****************************/
//
// 业绩管理页面 :
//   [x] 1. 页面加载后请求数据
//          1.1 请求部门数据
//              url    -> 'selectPerformanceByDid',
//              send   -> none
//              return -> [{}]
//          1.2 请求列表数据
//              url    -> 'user/performance'
//              send   -> none
//              return -> [
//                          {
//                            number(导师编号) : xx(int) - 传回去的时候传 uid(int),
//                            uname(导师姓名) : 'xx'(string),
//                            position(职位) : xx(int),
//                            plan(计划金额) : xx(int),
//                            reality(实际金额) : xx(int),
//                            updatecusts(业绩人次) : xx(int),
//                            rate(完成率) : xx(int),
//                            ...
//                          },
//                          {}, ...
//                        ]
//   [x] 2. 修改计划金额
//          url    -> 'updatePlan'
//          send   -> {
//                      uid  : 要修改的导师的 uid (int),
//                      plan : 要修改的导师的 计划金额 (int)
//                    }
//          return -> Boolean:
//                    true  - 修改成功
//                    false - 修改失败
//   [x] 3. 搜索
//          url    -> 'user/selectPerformance'
//          send   -> { uname : 搜索框内的值 }
//          return -> [{}, {}, ...]
//
// 下面是导师管理跳转导师业绩页面(pmself.jsp & pmself.js & pmself.css) : 
//   [x] 4. 加载个人业绩
//          url    -> 'selectPerformance'
//          send   -> {
//                      uid : 被点击的导师的 uid (int)
//                    }
//          return -> [{}, {}, {}, ...]
//   [x] 5. 个人业绩页面查询学员
//          url     -> 'findPerformanceByPnumber'
//          send    -> { pnumber : 用户编号(string) }
//          receive -> [{}, {}, {}, ...]
//
/****************************** END DESCRIPTIONS ******************************/

var pm = (function () {
  var configMap = {
        // 初始化模块相关信息
        // userinfo_map : {
        //   uname       : uname(当前登录人姓名),
        //   position    : position(当前登录人职级),
        //   uid         : uid(当前登录人 uid),
        //   plan        : plan(计划金额),
        //   reality     : reality(实际金额),
        //   updatecusts : updatecusts(实际人数),
        //   rate        : rate(完成率)
        // }
        userinfo_map : {}
      },
      stateMap = { $pm : null },
      jqueryMap = {},

      setJqueryMap, getData,    getDepartmentData,
      getListData,  createList, updateData,
      searchData,   onClick,      initModule;

  // Start : setJqueryMap()
  // des   : 缓存 jQuery 集合
  //
  setJqueryMap = function () {
    var $pm = stateMap.$pm;
    jqueryMap = {
      $pm             : $pm,
      $search         : $pm.find('.ora-user-pm-sd-search'),
      $search_btn     : $pm.find('.ora-user-pm-sd-search-btn'),
      $search_icon    : $pm.find('.ora-user-pm-sd-search-icon'),
      $search_input   : $pm.find('.ora-user-pm-sd-search-input'),
      $department_one : $pm.find('.ora-user-pm-sd-department-item01'),
      $department_two : $pm.find('.ora-user-pm-sd-department-item02'),
      $pagination     : $pm.find('.ora-user-pm-pagination'),
      $mentor_name    : $pm.find('.ora-user-pm-pagination td.mentor-name')
    };
  };
  // End : setJqueryMap()

  // Start : getData()
  // des   : ajax 请求后台数据
  //
  getData = function (url, arg_map, data) {
    $.ajax({
      type        : 'post',
      url         : url,
      data        : JSON.stringify(arg_map),
      contentType : 'application/json;charset=UTF-8',
      dataType    : 'json',
      success : function (data) {
        // 当数据长度为 0 时, 不加载分页器
        if ( data.length === 0 ) {
          $('.pagination-content').hide();
          $('.pagination-control').hide();
          $('.ora-user-performance-tips-deleted').show();
          return false;
        }

        $('.ora-user-performance-tips-deleted').hide();

        if (fn_map.hasOwnProperty('suc')) { fn_map.suc(data); }
        if (fn_map.hasOwnProperty('hideModal')) { fn_map.hideModal(); }
      },
      error : function (error) {
        if (fn_map.hasOwnProperty('err')) { fn_map.err(error); }
      }
    });
  };
  // End : getData()

  // Start  : getDepartmentData()
  // des    : 初始化页面后请求部门数据
  // return : [{}]
  //
  getDepartmentData = function () {
    var
      $department_one = jqueryMap.$department_one,
      $department_two = jqueryMap.$department_two
    ;

    // Start : toggleDepartment()
    // des   : 通过判断获取的数据来决定渲染哪个部门
    //
    function toggleDepartment(data) {
      // 当数据长度为 2 时, 渲染导师一部和导师二部数据
      if (data.length === 2) {
        $department_one.find('.department-text').text(data[0].dname);        // 导师部门
        $department_one.find('.department-rate').text(data[0].drate + '%');  // 比率
        $department_one.find('.plan-num').text(data[0].dplan);               // 计划金额
        $department_one.find('.reality-num').text(data[0].dreality);         // 实际金额
        $department_one.find('.cust-num').text(data[0].dupdatecusts);        // 业绩人次
        $department_two.find('.department-text').text(data[1].dname);        // 导师部门
        $department_two.find('.department-rate').text(data[1].drate + '%');  // 比率
        $department_two.find('.plan-num').text(data[1].dplan);               // 计划金额
        $department_two.find('.reality-num').text(data[1].dreality);         // 实际金额
        $department_two.find('.cust-num').text(data[1].dupdatecusts);        // 业绩人次
      }

      // 当数据长度为 1 时, 只渲染一个部门的数据
      // 通过判断 data.did 的值, 确定要显示的部门
      //   × 当 data.did === 1 时:
      //     渲染导师一部数据, 隐藏导师二部
      //   × 当 data.did === 2 时:
      //     渲染导师二部数据, 隐藏导师一部
      if (data.length === 1) {
        if (data[0].did === 1) {
          $department_one.find('.department-text').text(data[0].dname);        // 导师部门
          $department_one.find('.department-rate').text(data[0].drate + '%');  // 比率
          $department_one.find('.plan-num').text(data[0].dplan);            // 计划金额
          $department_one.find('.reality-num').text(data[0].dreality);         // 实际金额
          $department_one.find('.cust-num').text(data[0].dupdatecusts);        // 业绩人次
          $department_two.hide();                                              // 隐藏导师二部
        }
        if (data[0].did === 2) {
          $department_two.find('.department-text').text(data[0].dname);        // 导师部门
          $department_two.find('.department-rate').text(data[0].drate + '%');  // 比率
          $department_two.find('.plan-num').text(data[0].dplan);            // 计划金额
          $department_two.find('.reality-num').text(data[0].dreality);         // 实际金额
          $department_two.find('.cust-num').text(data[0].dupdatecusts);        // 业绩人次
          $department_one.hide();                                              // 隐藏导师一部
        }
      }

      // 当没有数据时, 清空页面并给出提示
      if (data.length === 0) {
        alert('暂无业绩');
        return false;
      }
    }
    // End : toggleDepartment()

    $.ajax({
      type    : 'post',
      url     : 'selectPerformanceByDid',
      success : function (data) {
        toggleDepartment(data);
      },
      error : function (error) {}
    });
  };
  // End : getDepartmentData()

  // Start  : getListData()
  // des    : 初始化页面后请求列表数据
  // return : [{}, {}, {}, ...]
  //
  getListData = function () {
    $.ajax({
      type    : 'post',
      url     : 'user/performance',
      success : function (data) {
        createList(data)
      },
      error : function (error) {}
    });
  };
  // End : getListData()

  // Start : updateData()
  // des   : 获取最新数据 -> 更新 '计划金额'
  //         arg_map = {
  //                     previous_plan : parseInt(xx, 10),
  //                     plan : parseInt(xx, 10),
  //                     uid  : parseInt(xx, 10)
  //                   }
  //
  updateData = function (arg_map) {
    $.ajax({
      type        : 'post',
      // url         : '../../json/updatePlan.json',
      url         : 'updatePlan',
      data        : JSON.stringify({plan : arg_map.plan, uid : arg_map.uid}),
      contentType : 'application/json;charset=UTF-8',
      dataType    : 'json',
      success     : function (data) {
        // 计划金额更新成功
        if (data) {
          // 显示修改成功后的金额
          arg_map.that.siblings('.plan-text').text(arg_map.plan);
          // 将当前行的 data-plan 值更新为修改后的金额
          arg_map.that.parent().attr('data-plan', arg_map.plan);
        }

        // 计划金额更新失败
        if (!data) {
          // 将兄弟元素 input 的 value 值设置为修改之前的金额
          arg_map.that.siblings('input').val(arg_map.previous_plan);
          return false;
        }
      },
      error : function (error) { console.log('与服务器通信失败!'); }
    });
  };
  // End : updateData()

  // Start : searchData()
  // des   : 搜索数据
  //
  searchData = function (arg_map) {
    $.ajax({
      type        : 'post',
      // url         : '../../json/searchData.json',
      url         : 'user/selectPerformance',
      data        : JSON.stringify({uname : arg_map.uname}),
      contentType : 'application/json;charset=UTF-8',
      dataType    : 'json',
      success     : function (data) {
        if (data.length === 0) {
          $('.pagination-content').html(
            '<p class="text-center">没有搜索到该导师</p>' +
            '<p class="text-center">搜索框留空搜索所有导师</p>'
          );
          $('.pagination-control').hide();
          return false;
        } else {
          createList(data);
          $('.pagination-control').show();
        }
      },
      error : function (error) { console.log('更新计划金额失败!'); }
    });
  };
  // End : searchData()

  // Start : createList()
  // des   : 创建导师列表
  //
  createList = function (data) {
    var i, j, k,
        result,     $pagination_content, $pagination_controllers,
        group_html, page_num_html,       page_html,
        position;

    result = [];
    $pagination_content     = jqueryMap.$pagination.find('.pagination-content');
    $pagination_controllers = jqueryMap.$pagination.find('.pagination-controllers');

    // 清空分页器主内容区
    $pagination_content.children().remove();
    // 清空分页器页码
    $pagination_controllers.children().remove();

    // 数据分组
    for (i = 0; i < data.length; i += 10) {
      result.push( data.slice(i, i + 10) );
    }

    for (j = 0; j < result.length; j++) {
      group_html =
        '<div class="pagination-content-page">' +
          '<table>' +
            '<thead>' +
              '<th class="text-center">导师编号</th>' +
              '<th class="text-center">导师姓名</th>' +
              '<th class="text-center">职位</th>' +
              '<th class="plan text-center">计划金额</th>' +
              '<th class="text-center">实际金额</th>' +
              '<th class="text-center">业绩人次</th>' +
              '<th class="text-center">完成率</th>' +
            '</thead>' +
            '<tbody></tbody>' +
          '</table>' +
        '</div>';

      page_num_html =
        '<span class="pagination-control-controllers-num pointer margin-px text-center">' +
          (j + 1) +
        '</span>';

      // 渲染每一页的外部容器
      $pagination_content.append(group_html);
      $pagination_controllers.append(page_num_html);

      // 渲染每一页中每一行的数据元素
      for (k = 0; k < result[j].length; k++) {
        // 判断职位
        switch (result[j][k].position) {
          case 3 :
            position = '总监';
            break;
          case 2 :
            position = '主管';
            break;
          case 1 :
            position = '导师';
            break;
          case 0 :
            position = '实习导师';
            break;
          default:
            break;
        }

        page_html =
          '<tr data-uid="' + result[j][k].uid + '">' +
            '<td class="text-center">' + result[j][k].number + '</td>' +
            '<td class="mentor-name text-center">' + result[j][k].uname + '</td>' +
            '<td data-position="' + result[j][k].position + '" class="text-center">' + position + '</td>' +
            '<td data-plan="' + result[j][k].plan + '" class="plan text-center">' +
              '<input class="text-center" type="hidden" value="' + result[j][k].plan + '">' +
              '<button class="submit hidden" type="button">提交</button>' +
              '<span class="plan-text">' + result[j][k].plan + '</span>' +
              '<span class="edit-icon"></span>' +
            '</td>' +
            '<td data-reality="' + result[j][k].reality + '" class="reality text-center">' +
              result[j][k].reality +
            '</td>' +
            '<td data-updatecusts="' + result[j][k].updatecusts + '" class="updatecusts text-center">' +
              result[j][k].updatecusts +
            '</td>' +
            '<td data-rate="' + result[j][k].rate + '" class="rate text-center">' +
              result[j][k].rate +
            '%</td>' +
          '</tr>';

        // 向每一页中渲染 10 条数据
        $( $('.pagination-content-page')[j] ).find('tbody').append(page_html);
      }
    }

    // 加载分页器
    pagination.initModule( $('.ora-user-pm-pagination .pm-pagination') );

    // 点击导师姓名
    $('.ora-user-pm-pagination .pagination-content-page td.mentor-name')
      .unbind('click').click(function () {
        var uid          = $(this).parent().attr('data-uid'),
            plan         = $(this).siblings('td.plan').attr('data-plan'),
            reality      = $(this).siblings('td.reality').attr('data-reality'),
            updatecusts  = $(this).siblings('td.updatecusts').attr('data-updatecusts'),
            rate         = $(this).siblings('td.rate').attr('data-rate');

        window.open(
          'Pmself?uid='   + uid
        );
    });

    // 点击修改计划金额
    $('.ora-user-pm-pagination .pagination-content-page td .edit-icon')
      .unbind('click').click(function () {
        $(this).siblings('input').attr('type', 'text');
        $(this).siblings('button').removeClass('hidden');
        $(this).siblings('.plan-text').hide();
        $(this).hide();
    });

    // 修改计划金额后提交
    $('.ora-user-pm-pagination .pagination-content-page td .submit')
      .unbind('click').click(function () {
        var previous_plan, plan, uid;

        previous_plan = $(this).parent().attr('data-plan'),
        plan = $(this).siblings('input').val();
        uid  = $(this).parent().parent().attr('data-uid'),

        $(this).siblings('.plan-text').show();
        $(this).siblings('.edit-icon').show();
        $(this).siblings('input').attr('type', 'hidden');
        $(this).addClass('hidden');

        // 更新计划金额
        updateData({
          previous_plan : parseInt(previous_plan, 10),
          plan : parseInt(plan, 10),
          uid  : parseInt(uid, 10),
          that : $(this)
        });
    });
  };
  // End : createList()

  // Start : onClick()
  // des   : 点击事件处理程序
  //
  onClick = function (data) {
    var $search, $search_btn, $search_icon, $search_input;

    $search       = jqueryMap.$search;
    $search_btn   = jqueryMap.$search_btn;
    $search_icon  = jqueryMap.$search_icon;
    $search_input = jqueryMap.$search_input;

    // 搜索导师
    $search.unbind('click').click(function (event) {
      var target, uname;

      event  = event || window.event;
      target = event.target;

      switch (target) {
        case $search_btn[0] :
          searchData({ uname : $('.ora-user-pm-sd-search-input').val() });
          break;
        case $search_icon[0] :
          searchData({ uname : $('.ora-user-pm-sd-search-input').val() });
          break;
        case $search_input[0] :
          break;
        default:
          break;
      }
    });

  };
  // End : onClick()

  // Start : initModule()
  // des   : 初始化模块
  //
  initModule = function ($pm, userinfo_map) {
    stateMap.$pm = $pm;
    configMap.userinfo_map = userinfo_map;
    setJqueryMap();

    getDepartmentData();
    getListData();

    onClick();
  };
  // End : initModule()

  // 导出公开方法
  return { initModule : initModule };
}());
