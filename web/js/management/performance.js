/*
 * performance.js
 * 个人业绩模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, performance*/

/***************************** START DESCRIPTIONS *****************************/
//
// 概述 :
//       业绩模块共有 2 大页面, 分别是 :
//       1. 业绩管理,
//       2. 个人业绩
//
// 业绩管理页面 :
//   [ ] 1.
//   [ ] 2.
//   [ ] 3.
//
//
// 个人业绩页面 :
//
//   ☆☆ 调整 : 页面中不再显示 '导师编号' 字段, '延长时间' 改为 '延长日期'
//
//   [ ] 1. 页面加载后, 获取 USER_SESSION 中的值 :
//          1.1 计划金额 - ${USER_SESSION.plan}
//          1.2 实际金额 - ${USER_SESSION.reality}
//          1.3 实际人数 - ${USER_SESSION.updatecusts}
//          1.4 完成率   - ${USER_SESSION.rate}
//       调整 : 换成 ajax 请求
//          url     -> 'aboutme'
//          send    -> none
//          receive -> { key_name : key_name_val, ... }
//   [ ] 2. 页面加载后, 发起 ajax 请求, 获取当前登录人下的所有学员
//          url     -> 'selectPerformance'
//          send    -> {
//                       user_id : uid(int)
//                       (当前登录人的 user_id <- ${USER_SESSION.uid})
//                     }
//          receive -> [{}, {}, {}, ...]
//   [ ] 3. 删除学员
//          点击 '删除' 按钮时, 将当前行学员的 id 发给后台
//          url     -> 'deletePerformance'
//          send    -> {
//                       id      : 获取数据时, 将其中的 id 放在 data-id=id (int),
//                       user_id : ${USER_SESSION.uid} (当前登录人的 uid) (int)
//                     }
//          receive -> [{}, {}, {}, ...]
//   [ ] 4. 添加业绩
//          添加业绩时, '导师编号' 不可修改! 导师编号的值为 ${USER_SESSION.uid}
//          点击的 '添加' 按钮后, 将所有数据发往后台
//          url     -> 'addPerformance'
//          send    -> {
//                       pnumber(学员编号)   : input_val(string),
//                       pmoney(升级金额)    : input_val(int),
//                       overtimer(延长日期) : input_val(string),
//                       user_id(导师编号)   : user_id(int) <- uid,
//                       updateRemark(备注)  : input_val(string)
//                     }
//          receive -> [{}, {}, {}, ...]
//   [ ] 5. 查询
//          url     -> 'findPerformanceByPnumber'
//          send    -> { pnumber : 用户编号(string) }
//          receive -> [{}, {}, {}, ...]
//
/****************************** END DESCRIPTIONS ******************************/

var performance = (function () {
  var
    configMap = {
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
    stateMap = { $performance : null },
    jqueryMap = {},

    setJqueryMap, CheckInfo, getData,
    createList,   onClick,   initModule
  ;

  // Start : setJqueryMap()
  // des   : 缓存 jQuery 集合
  //
  setJqueryMap = function () {
    var $performance = stateMap.$performance;
    jqueryMap = {
      $performance  : $performance,
      $detail       : $performance.find('.ora-user-performance-detail'),
      $search       : $performance.find('.ora-user-performance-search'),
      $search_btn   : $performance.find('.ora-user-performance-search-btn'),
      $search_icon  : $performance.find('.ora-user-performance-search-icon'),
      $search_input : $performance.find('.ora-user-performance-search-input'),
      $add_btn      : $performance.find('.ora-user-performance-add button'),
      $close_modal  : $performance.find('.ora-user-performance-add_performance .modal-box-close'),
      $pnumber      : $performance.find('.add_performance-content-pnumber input'),
      $pmoney       : $performance.find('.add_performance-content-pmoney input'),
      $overtime     : $performance.find('.add_performance-content-overtime input'),
      $mentorid     : $performance.find('.add_performance-content-mentorid input'),
      $updateRemark : $performance.find('.add_performance-content-remark textarea'),
      $number_modal : $performance.find('.add_performance-content-pnumber'),
      $submit_modal : $performance.find('.add_performance-content-btn button'),
      $pagination   : $performance.find('.ora-user-performance-pagination')
    };
  };
  // End : setJqueryMap()

  // Start : CheckInfo()
  // des   : 验证信息
  //
  CheckInfo = function () {
    // Start : CheckInfo.modalNumber()
    // 验证学员编号
    //
    this.modalNumber = function (arg_map) {
      $.ajax({
        type        : 'post',
        url         : arg_map.url,
        data        : JSON.stringify({ pnumber : arg_map.pnumber}),
        contentType : 'application/json;charset=UTF-8',
        dataType    : 'json',
        success     : function (data) {
          // data = true : 有该学员编号, 允许添加
          if (data) {
            $('.add_performance-content-tips-checkname span').removeClass('active');
          }
          // data = false: 无该学员编号, 不允许添加
          if (!data) {
            $('.add_performance-content-tips-checkname span').addClass('active');
          }
        },
        error : function (error) {
          console.log(arg_map);
          console.log('与服务器通讯失败!');
          console.log(error);
        }
      });
    };
    // End : CheckInfo.modalNumber()
  };
  // End : CheckInfo()

  // Start : getData()
  // des   : ajax 请求
  //         该方法接收 3 个参数
  //           * 第一个参数是发起 ajax 请求的 url
  //           * 第二个参数是向后台发送的数据对象 arg_map
  //           * 第三个参数是发起请求后执行的函数, 对应的函数以键值对的形式保存在
  //             fn_map 对象中
  //           * 第四个参数是获取数据失败后执行的函数 err
  //
  getData = function (url, arg_map, fn_map) {
    $.ajax({
      type        : 'post',
      url         : url,
      data        : JSON.stringify(arg_map),
      contentType : 'application/json;charset=UTF-8',
      dataType    : 'json',
      success     : function (data) {
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

  // Start : createList()
  // des   : 创建客户列表
  //
  createList = function (data) {
    var
      result,     i,             j,                  k,
      group_html, page_num_html, pagination_content, pagination_controllers,
      page_html,
      ptime,      detailRemark
    ;

    result = [];
    pagination_content     = jqueryMap.$pagination.find('.pagination-content');
    pagination_controllers = jqueryMap.$pagination.find('.pagination-controllers');

    $(pagination_content).children().remove();
    $(pagination_controllers).children().remove();

    // 数据分组
    for (i = 0; i < data.length; i += 10) {
      result.push( data.slice(i, i + 10) );
    }

    for (j = 0; j < result.length; j++) {
      group_html =
        '<div class="pagination-content-page active">' +
          '<table>' +
            '<tbody>' +
              '<tr>' +
                '<th>学员编号</th>' +
                '<th>升级金额</th>' +
                '<th class="overtime">延长时间</th>' +
                '<th class="ptime">创建时间</th>' +
                '<th>操作</th>' +
                '<th class="remark">备注</th>' +
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
        ptime     = result[j][k].ptime.split(' ')[0];
        page_html =
            '<tr data-id="' + result[j][k].id + '">' +
              '<td class="text-center">' + result[j][k].pnumber + '</td>' +
              '<td class="text-center">' + result[j][k].pmoney + '</td>' +
              '<td class="overtime text-center">' + result[j][k].overtime + '</td>' +
              '<td class="ptime text-center">' + ptime + '</td>' +
              '<td class="edit text-center"></td>' +
              '<td class="remark">' + result[j][k].updateRemark + '</td>' +
            '</tr>';

        // 向每一页中渲染 10 条数据
        $( $('.pagination-content-page')[j] ).find('tbody').append(page_html);
      }
    }

    // 加载分页器
    pagination.initModule( $('#pagination') );

    onClick(data);

    // 调用客户备注模态框
    detailRemark = new Modal($('.ora-user-performance-remark'), {
      width       : 380,
      height      : 240,
      titleHeight : 40
    });

    // 删除业绩
    $('.pagination-content-page .edit').unbind('click').click(function () {
      getData('deletePerformance', {
        id      : parseInt($(this).parent().attr('data-id'), 10),
        user_id : parseInt(data[0].user_id, 10)
      }, { suc : createList });
    });

    // 查看详细备注
    $('.pagination-content-page td.remark').unbind('click').click(function () {
      $('.ora-user-performance-remark .modal-box-content-text').text(
          $(this).text()
      );
      detailRemark.showModal();
    });
    $('.ora-user-performance-remark .modal-box-close').unbind('click').click(function () {
      detailRemark.hideModal();
    });

  };
  // End : createList()

  // Start : onClick()
  // des   : 点击事件处理程序
  //
  onClick = function (userinfo_map) {
    var
      addPerformance,
      checkInfo = new CheckInfo()
    ;

    addPerformance = new Modal($('.ora-user-performance-add_performance'), {
      width       : 500,
      height      : 460,
      titleHeight : 58
    });

    // 搜索业绩
    jqueryMap.$search.unbind('click').click(function (event) {
      var target, $input;

      event  = event || window.event;
      target = event.target;
      $input  = jqueryMap.$search_input;

      // 输入编号查询
      if ($input.val().length !== 0) {
        switch (target) {
          case jqueryMap.$search_btn[0] :
            getData('findPerformanceByPnumber', {
              pnumber : $input.val(),
              user_id : userinfo_map.user_id
            }, { suc : createList });

            $('.pagination-content').show();
            $('.pagination-control').show();
            break;
          case jqueryMap.$search_icon[0] :
            getData('findPerformanceByPnumber', {
              pnumber : $input.val()
            }, { suc : createList });

            $('.pagination-content').show();
            $('.pagination-control').show();
            break;
          case jqueryMap.$search_input[0] :
            break;
          case jqueryMap.$search[0] :
            break;
          default:
            break;
        }
      }

      // 当不输入任何字符查询时, 请求页面加载时客户列表所有数据
      if ($input.val().length === 0) {
        getData('selectPerformance', {
          user_id : parseInt(configMap.userinfo_map.uid, 10)
        }, { suc : createList });

        $('.pagination-content').show();
        $('.pagination-control').show();
      }

    });

    // 弹出添加业绩模态框
    jqueryMap.$add_btn.unbind('click').click(function () {
      addPerformance.showModal();
      // 清空输入框
      $('.ora-user-performance-add_performance input').val('');
      $('.ora-user-performance-add_performance textarea').val('');
      // 设置导师编号
      jqueryMap.$mentorid.val(configMap.userinfo_map.uid);
    });

    // 关闭添加业绩模态框
    jqueryMap.$close_modal.unbind('click').click(function () {
      addPerformance.hideModal();
    });

    // 提交业绩
    jqueryMap.$submit_modal.unbind('click').click(function () {
      getData('addPerformance', {
        pnumber         : jqueryMap.$pnumber.val(),
        pmoney          : parseInt(jqueryMap.$pmoney.val(), 10),
        overtime        : parseInt( jqueryMap.$overtime.val() ),
        user_id         : parseInt(jqueryMap.$mentorid.val(), 10),
        updateRemark    : jqueryMap.$updateRemark.val(),
        user_name       : configMap.userinfo_map.uname,
        user_department : configMap.userinfo_map.department_id
      }, {
        suc       : createList,
        hideModal : addPerformance.hideModal
      });

      if ( $('.pagination-content-page tr').length > 1 ) {
        $('.pagination-content').show();
        $('.pagination-control').show();
      }

    });

    // 验证学员编号
    jqueryMap.$number_modal.find('input').blur(function () {
      checkInfo.modalNumber({
        url     : 'checkPnumber',
        pnumber : $(this).val()
      });
    });

  };
  // End : onClick()

  // Start : initModule()
  // des   : 初始化模块
  //
  initModule = function ($performance, userinfo_map) {
    stateMap.$performance = $performance;
    configMap.userinfo_map = userinfo_map;
    setJqueryMap();
    getData('selectPerformance', {
      user_id : parseInt(configMap.userinfo_map.uid, 10)
    }, { suc : createList });

    onClick(userinfo_map);

    // 渲染个人业绩
    $.ajax({
      type    : 'post',
      url     : 'aboutme',
      success : function (data) {
        var plan,  reality,  updatecusts,  rate;

        plan         = data.plan;         // 计划金额
        reality      = data.reality;      // 实际金额
        updatecusts  = data.updatecusts;  // 实际人数
        rate         = data.rate;         // 完成率

        // 当rate(完成率)为 NaN 时, 将 rate 设置为 0
        if ( isNaN(parseInt(rate, 10)) ) { rate = 0; }

        jqueryMap.$detail.find('.performance-detail-item02').text(plan);
        jqueryMap.$detail.find('.performance-detail-item03').text(reality);
        jqueryMap.$detail.find('.performance-detail-item04').text(updatecusts);
        jqueryMap.$detail.find('.performance-detail-item05').text(rate + '%');
      },
      error : function (error) {
        console.log('请求个人业绩失败！');
        console.log(error);
      }
    });
  };
  // End : initModule()

  // 导出公开方法
  return { initModule : initModule };
}());
