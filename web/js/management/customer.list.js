/*
 * customer.list.js
 * 客户管理模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, customer */

customer.list = (function () {
  var
    configMap = {
      // user_info : 当前登录人信息(姓名和职位)
      user_info : {},

      // customer_map : 客户列表信息
      customer_map : [],

      // 模态框需要用到的元素集合
      modal_ele_map : {}
    },
    stateMap = {
      $list : null
    },
    jqueryMap = {},

    setJqueryMap,       modalEleMap, createCustomerList, initModule
  ;

  // Start : setJqueryMap()
  // des   : 缓存 jQuery 集合
  //
  setJqueryMap = function () {
    var $list = stateMap.$list;
    jqueryMap = {
      $list        : $list,
      $content     : $list.find('.pagination-content'),
      $controllers : $list.find('.pagination-controllers')
    };
  };
  // End : setJqueryMap()

  modalEleMap = function () {
    return configMap.modal_ele_map;
  };

  // Start : createCustomerList()
  // des   : 创建客户信息列表
  //
  createCustomerList = function () {
    var
      $content,     $controllers, $remark,   $update,    $pull,
      customer_map, cmap_length,  page_html, group_html, page_num_html,
      result,       i,            j,         k
    ;

    $content     = jqueryMap.$content;
    $controllers = jqueryMap.$controllers;
    customer_map = configMap.customer_map;  // map of customer's information
    cmap_length  = customer_map.length;
    result       = [];

    // 当客户资料更新后，会再请求一次客户资料列表。
    // 此时，先将主内容区和页码区清空，再进行渲染。
    $('.pagination-content').find('div').remove();
    $('.pagination-controllers').find('span').remove();

    // 为 customer_map 分组 - [[{}, {}, ...], [{}, {}, ...], ...]
    for (i = 0; i < cmap_length; i += 10) {
      result.push(customer_map.slice(i, i + 10));
    }

    for (j = 0; j < result.length; j++) {
      group_html =
        '<div class="pagination-content-page">' +
          '<table>' +
            '<tbody>' +
              '<tr>' +
                '<th class="cid hidden">ID</th>' +
                '<th class="jointime">报名时间</th>' +
                '<th class="cnum">编号</th>' +
                '<th class="cage">分部</th>' +
                '<th class="uname">导师</th>' +
                '<th class="cname">姓名</th>' +
                '<th class="csex">性别</th>' +
                '<th class="type">类型</th>' +               // type
                '<th class="standard">规格</th>' +           // spec(str)
                '<th class="money_time">待补款及时间</th>' +  // moneyAndTime
                '<th class="scheme">方案</th>' +             // scheme(str)
                '<th class="servicetime">服务期（天）</th>' +
                '<th class="leftdays">剩余（天）</th>' +
                '<th class="servicestate">服务状态</th>' +
                '<th class="secondUpdate">二次升级</th>' +    // secondUpdate
                '<th class="payments">金额（元）</th>' +
                '<th class="pagination-remark">备注</th>' +
                '<th class="sname">销售</th>' +
                '<th class="pagination-handle">操作</th>' +
              '</tr>' +
            '</tbody>' +
          '</table>' +
        '</div>';

      page_num_html =
        '<span class="pagination-control-controllers-num pointer margin-px text-center">' +
          (j + 1) +
        '</span>';

      // 渲染每一页的外部容器
      $content.append(group_html);
      $controllers.append(page_num_html);

      for (k = 0; k < result[j].length; k++) {
        var
          bmtime     = result[j][k]['bmtime'].split(' '),
          department = result[j][k].department_id
        ;

        switch (department) {
          case 0 :
            department = '暂未分配';
            break;
          case 1 :
            department = '导师一部';
            break;
          case 2 :
            department = '导师二部';
            break;
          case 3 :
            department = '导师三部';
            break;
          default:
            break;
        }

        // 定义用户列表中一行的元素
        page_html =
          '<tr file_id="'+ result[j][k]['file_id'] +'">' +
            '<td class="text-center cid hidden">'+ result[j][k].cid +'</td>>' +               // ID
            '<td class="text-center jointime">'+ bmtime[0] + '</td>' +                        // 报名时间
            '<td class="text-center cnum">'+ result[j][k]['cnumber'] +'</td>' +               // 编号
            '<td class="text-center department_id">'+ department +'</td>' +                   // 分部
            '<td class="text-center uname">'+ result[j][k]['uname'] +'</td>' +                // 所属导师
            '<td class="text-center cname">'+ result[j][k]['cname'] +'</td>' +                // 姓名
            '<td class="text-center csex">'+ result[j][k]['csex'] +'</td>' +                  // 性别
            '<td class="text-center type">'+ result[j][k].type +'</td>' +                     // 类型
            '<td class="text-center standard">'+ result[j][k]['spec'] +'</td>' +              // 规格
            '<td class="text-center money_time">'+ result[j][k].moneyAndTime +'</td>' +       // 待补款及时间
            '<td class="text-center scheme">'+ result[j][k].scheme +'</td>' +                 // 方案
            '<td class="text-center servicetime">'+ result[j][k]['serdata'] +'</td>' +        // 服务时间
            '<td class="text-center leftdays">'+ result[j][k]['sydata'] +'</td>' +            // 剩余时间
            '<td class="text-center servicestate">'+ result[j][k]['state'] +'</td>' +         // 服务状态
            '<td class="text-center secondUpdate">'+ result[j][k].secondUpdate +'</td>' +     // 二次升级
            '<td class="text-center payments">'+ result[j][k]['money'] +'</td>' +             // 金额
            '<td class="text-center pagination-remark">'+ result[j][k]['remark'] + '</td>' +  // 备注
            '<td class="text-center sname">'+ result[j][k]['sname'] +'</td>' +                // 销售
            '<td class="text-center">'+
              '<span class="icon_btn_edit"></span>'  +
              '<span class="icon_btn_triangle"></span>'  +
            '</td>' +
          '</tr>';

        // 向每一页中渲染 10 条数据
        $($('.pagination-content-page')[j]).find('tbody').append(page_html);
      }

    }

    // 加载分页器
    pagination.initModule($('#pagination'));

    configMap.modal_ele_map =  {
      $remark : $('td.pagination-remark'),
      $update : $('.icon_btn_edit'),
      $pull   : $('.icon_btn_triangle')
    };
  };
  // End : createCustomerList()

  // Start : initModule()
  // des   : 初始化模块
  initModule = function ($list, customer_map) {
    stateMap.$list = $list;
    configMap.customer_map = customer_map;

    setJqueryMap();
    createCustomerList();
  };
  // End : initModule()

  // 导出公开方法
  return {
    initModule         : initModule,
    modalEleMap        : modalEleMap,
    createCustomerList : createCustomerList
  };
}());
