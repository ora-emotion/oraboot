/*
 * pmself.js
 * 业绩管理模块 - 导师业绩模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, pmself*/

var pmself = (function () {
  var configMap = {},
      stateMap = { $pmself : null },
      jqueryMap = {},

      setJqueryMap, createSelfPm, getListData,
      createList,   searchData,   onClick,
      initModule;

  // Start : setJqueryMap()
  // des   : 缓存 jQuery 集合
  //
  setJqueryMap = function () {
    var $pmself = stateMap.$pmself;
    jqueryMap = {
      $pmself : $pmself
    };
  };
  // End : setJqueryMap()

  // Start : createSelfPm()
  // des   : 渲染个人业绩
  //
  createSelfPm = function (userinfo_map) {
    var
      $plan        = $('.pmself-detail-item02'),
      $reality     = $('.pmself-detail-item03'),
      $updatecusts = $('.pmself-detail-item04'),
      $rate        = $('.pmself-detail-item05');

    $plan.text( userinfo_map.user_plan );
    $reality.text( userinfo_map.user_reality );
    $updatecusts.text( userinfo_map.user_updatecusts );
    $rate.text( userinfo_map.user_rate );
  };
  // End : createSelfPm()

  // Start : getListData()
  // des   : 获取客户列表数据
  //
  getListData = function (userinfo_map) {
    $.ajax({
      type        : 'post',
      url         : 'selectPerformance',
      data        : JSON.stringify({user_id : userinfo_map.uid}),
      contentType : 'application/json;charset=UTF-8',
      dataType    : 'json',
      success     : function (data) {
        console.log(data);
        // 当数据长度为 0 时, 不加载分页器
        if ( data.length === 0 ) {
          $('.pagination-content').hide();
          $('.pagination-control').hide();
          $('.ora-user-pmself-tips-deleted').show();
          return false;
        }
        $('.ora-user-pmself-tips-deleted').hide();
        createList(data);
      },
      error : function (error) {
        console.log('与服务器通信失败!');
      }
    });
  };
  // End : getListData()

  // Start : createList()
  // des   : 创建导师列表
  //
  createList = function (data) {
    var result,     i,             j,                  k,
        group_html, page_num_html, pagination_content, pagination_controllers,
        page_html,  overtime,      ptime,              detailRemark;

    result = [];
    $pagination             = $('.ora-user-pmself-pagination');
    $pagination_content     = $pagination.find('.pagination-content');
    $pagination_controllers = $pagination.find('.pagination-controllers');

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
        '<div class="pagination-content-page active">' +
          '<table>' +
            '<tbody>' +
              '<tr>' +
                '<th>学员编号</th>' +
                '<th>升级金额</th>' +
                '<th class="overtime">延长时间</th>' +
                '<th class="ptime">创建时间</th>' +
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
      $pagination_content.append(group_html);
      $pagination_controllers.append(page_num_html);

      // 渲染每一页中每一行的数据元素
      for (k = 0; k < result[j].length; k++) {
        // overtime  = result[j][k].overtime.split(' ')[0];
        ptime     = result[j][k].ptime.split(' ')[0];

        page_html =
          '<tr data-id="' + result[j][k].id + '">' +
            '<td class="text-center">' + result[j][k].pnumber + '</td>' +
            '<td class="text-center">' + result[j][k].pmoney + '</td>' +
            '<td class="overtime text-center">' + result[j][k].overtime + '</td>' +
            '<td class="ptime text-center">' + ptime + '</td>' +
            '<td class="remark">' + result[j][k].updateRemark + '</td>' +
          '</tr>';

        // 向每一页中渲染 10 条数据
        $( $('.pagination-content-page')[j] ).find('tbody').append(page_html);
      }
    }

    // 加载分页器
    pagination.initModule( $('#pagination') );

    // 调用客户备注模态框
    detailRemark = new Modal($('.ora-user-pmself-remark'), {
      width       : 380,
      height      : 240,
      titleHeight : 40
    });

    // 查看学员备注
    $('.pagination-content-page td.remark').unbind('click').click(function () {
      $('.ora-user-pmself-remark .modal-box-content-text').text(
          $(this).text()
      );
      detailRemark.showModal();
    });
    $('.ora-user-pmself-remark .modal-box-close').unbind('click').click(function () {
      detailRemark.hideModal();
    });

  };
  // End : createList()

  // Start : searchData()
  // des   : 搜索学员
  // args  : arg_map = { pnumber : input.val() }
  //
  searchData = function (arg_map) {
    $.ajax({
      type        : 'post',
      // url  : '../../json/pmselfsearch.json',
      url         : 'findPerformanceByPnumber',
      data        : JSON.stringify(arg_map),
      contentType : 'application/json;charset=UTF-8',
      dataType    : 'json',
      success     : function (data) {
        // 当数据长度为 0 时, 不加载分页器
        if ( data.length === 0 ) {
          $('.pagination-content').hide();
          $('.pagination-control').hide();
          $('.ora-user-pmself-tips-deleted').show();
          return false;
        }
        $('.ora-user-pmself-tips-deleted').hide();
        $('.pagination-content').show();
        $('.pagination-control').show();
        createList(data);
      },
      error : function (error) { console.log('与服务器通信失败!'); }
    });
  };
  // End : searchData()

  // Start : onClick()
  // des   : 事件处理程序
  //
  onClick = function (userinfo_map) {
    // 搜索
    $('.ora-user-pmself-search_add').unbind('click').click(function (event) {
      var target = event.target || window.event.target;

      switch (target) {
        case $('.ora-user-pmself-search-btn')[0] :
          searchData({
            pnumber : $(this).find('input').val(),
            user_id : userinfo_map.uid
          });
          break;
        case $('.ora-user-pmself-search-icon')[0] :
          searchData({
            pnumber : $(this).find('input').val(),
            user_id : userinfo_map.uid
          });
          break;
        case $('.ora-user-pmself-search-input')[0] :
          break;
        case $('.ora-user-pmself-search')[0] :
          break;
        case $('.ora-user-pmself-search_add')[0] :
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
  initModule = function ($pmself, userinfo_map) {
    stateMap.$pmself = $pmself;
    setJqueryMap();
    createSelfPm(userinfo_map);
    getListData(userinfo_map);
    onClick(userinfo_map);
  };
  // End : initModule()

  // 导出公开方法
  return { initModule : initModule };
}());
