/*
 * pm.self.js
 * 业绩管理模块 - 导师业绩模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, pm*/

pm.self = (function () {
  var configMap = {},
      stateMap = {},
      jqueryMap = {},

      setJqueryMap, createPerformance, getData, createList, initModule;

  // Start : setJqueryMap()
  // des   : 缓存 jQuery 集合
  //
  setJqueryMap = function () {};
  // End : setJqueryMap()

  // Start  : createPerformance()
  // des    : 渲染指定导师的个人业绩
  // args   : { uid : 被点击导师的 uid }
  // return : none
  //
  createPerformance = function (arg_map) {
    var $self        = $('.ora-user-self'),
        $self_detail = $('.ora-user-self-detail');

    $self_detail.find('.self-detail-item02').text(arg_map.plan);
    $self_detail.find('.self-detail-item03').text(arg_map.reality);
    $self_detail.find('.self-detail-item04').text(arg_map.updatecusts);
    $self_detail.find('.self-detail-item05').text(arg_map.rate + '%');
  };
  // End : createPerformance()

  // Start : createList()
  // des   : 生成学员列表
  //
  createList = function (data) {
    var result,     i,             j,                  k,
        group_html, page_num_html, pagination_content, pagination_controllers,
        page_html,  pagination,
        overtime,      ptime,              detailRemark;

    result = [];
    pagination             = $('.ora-user-self-pagination');
    pagination_content     = $('.ora-user-self-pagination .pagination-content');
    pagination_controllers = $('.ora-user-self-pagination .pagination-controllers');

    // 清空分页器主内容区
    pagination_content.children().remove();
    // 清空分页器页码
    pagination_controllers.children().remove();

    // 数据分组
    for (i = 0; i < data.length; i += 10) {
      result.push( data.slice(i, i + 10) );
    }

    for (j = 0; j < result.length; j++) {
      group_html =
        '<div class="pagination-content-page active">' +
          '<table>' +
            '<thead>' +
              '<tr>' +
              '<th>学员编号</th>' +
              '<th>升级金额</th>' +
              '<th class="overtime">延长时间</th>' +
              '<th class="ptime">创建时间</th>' +
              '<th class="remark">备注</th>' +
              '</tr>' +
            '</thead>' +
            '<tbody></tbody>' +
          '</table>' +
        '</div>';

      page_num_html =
        '<span class="pagination-control-controllers-num pointer margin-px text-center">' +
          (j + 1) +
        '</span>';

      // 渲染每一页的外部容器
      pagination_content.append(group_html);
      pagination_controllers.append(page_num_html);

      // 渲染每一页中每一行的数据元素
      for (k = 0; k < result[j].length; k++) {
        // 判断职位
        switch (result[j][k].position) {
          case 3 :
            position = '总监';
            break;
          case 2 :
            postion = '主管';
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

        overtime  = result[j][k].overtime.split(' ')[0];
        ptime     = result[j][k].ptime.split(' ')[0];

        page_html =
          '<tr data-id="' + result[j][k].id + '">' +
            '<td class="text-center">' + result[j][k].pnumber + '</td>' +
            '<td class="text-center">' + result[j][k].pmoney + '</td>' +
            '<td class="overtime text-center">' + overtime + '</td>' +
            '<td class="ptime text-center">' + ptime + '</td>' +
            '<td class="remark">' + result[j][k].updateRemark + '</td>' +
          '</tr>';

        // 向每一页中渲染 10 条数据
        $( $('.ora-user-self-pagination .pagination-content-page')[j] ).find('tbody').append(page_html);
      }
    }

    // 加载分页器
    pagination_self.initModule( $('#self-pagination') );

  };
  // End : createList()

  // Start  : getData()
  // des    : 获取列表数据
  // return : [{}, {}, {}, ...]
  //
  getData = function (url, arg_map) {
    $.ajax({
      type        : 'post',
      url         : url,
      data        : JSON.stringify(arg_map),
      contentType : 'application/json;charset-UTF-8',
      dataType    : 'json',
      success     : function (data) {
        if (data.length === 0) {
          return false;
        } else {
          createList(data);
        }
      },
      error : function (error) {}
    });
  };
  // End : getData()

  // Start : initModule()
  // des   : 初始化模块
  //
  initModule = function (arg_map) {
    createPerformance(arg_map);
    getData(
      '../../json/pm.self.json',
      { uid : arg_map.uid }
    );
  };
  // End : initModule()

  // 导出公开方法
  return { initModule : initModule };
}());
