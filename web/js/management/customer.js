/*
 * customer.js
 * 客户管理模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, customer */

/**
 Time : 2017.12.08
 Last Time : 2017.12.08
 author : bzsjxhywrf@outlook.com

 DESCRIPTION
 * setJqueryMap() - 缓存 jQuery 集合
 * initModule() - 初始化模块

 前后台传值
 [x]1. 渲染客户列表 - 页面加载后
   * ajax -> { uname : 当前登录人姓名, position : 当前登陆人职级 }
     返回值 [{}, {}, {}, ...] -> 渲染客户列表
 [x]2. 点击搜索按钮
   * ajax -> { uname : 搜索框内的值, cnumber : 搜索框内的值 }
     返回值 [{}, {}, ...] -> 渲染
     当 [] -> 提示没有查到相关用户信息
 [x]3. 添加用户
   * ajax -> { 用户的所有信息 }
   * 返回值 data -> Boolean
     * true  - 添加成功
     * false - 添加失败
 * 修改客户信息模态框和删除客户文件模态框有冲突
 [x]4. 查看客户备注信息
   * [x]调用模态框插件
   * [x]英文状态下，文本不换行的问题
 [x]5. 修改客户详细信息
   * ajax -> { 所有客户信息 }
   * 返回值 data -> Boolean
     * true  - 修改成功
     * false - 修改失败
   []* 性别    - 不能填写，要选择
   * 报名时间 - yy-mm-dd
   * 服务状态 - 下拉菜单 value='字符串'
 [x]6. 加载客户文件
   * ajax -> { file_id : 文件 ID }
   * 返回值 { fid : 1, fname : "xxx", ... }
 [x]7. 删除客户文件
   * ajax -> { file_id : 文件 ID }
   * 返回值 data - Boolean
     * true  - 删除成功
     * false - 删除失败
 [x]8. 上传文件
   * form 表单 -> { uanme : 当前登陆人姓名, cust_cnumber : 客户编号, uploadfile : 文件 }
   * 无返回值
   * ${msg} - 最后做
 [x]9. 下载文件
   * url -> file_id = num (?file_id=xxx)
   * 无返回值

   * 问题汇总
     []1. 删除文件时，服务器返回 500 状态码
 */

var customer = (function () {
  var
    configMap = {
      // user_info : 当前登录人信息(姓名和职位)
      user_info : {}
    },
    stateMap = {
      $customer    : null,
      submit_state : false
    },
    jqueryMap = {},

    setJqueryMap, getCustomerListData, renderNotice,
    onClick,      initModule
  ;

  copyCustomerMap = function (customer_map) {
    return { customer_map : customer_map };
  };

  // Start : setJqueryMap()
  // des   : 缓存 jQuery 集合
  //
  setJqueryMap = function () {
    var $customer = stateMap.$customer;
    jqueryMap = {
      $customer : $customer,
      $search   : $customer.find('.ora-user-customer-search'),
      $add      : $customer.find('.ora-user-customer-add'),
      $list     : $customer.find('.ora-user-customer-pagination')
    };
  };
  // End : setJqueryMap()

  // Start : getCustomerListData()
  // des   : 获取客户列表数据
  //         url - ajax 请求的地址
  //
  getCustomerListData = function (url, arg_map) {
    var uname, position, modal_ele_map;

    $.ajax({
      type        : 'post',
      url         : url,
      data        : JSON.stringify(arg_map),
      contentType : 'application/json;charset=UTF-8',
      dataType    : 'json',
      success     : function (data) {
        if (data.length === 0) {
          alert('没有用户');

          // 加载模态框模块
          // customer.list.modalEleMap() - 模态框模块需要用到的元素映射
          customer.modal.initModule(customer.list.modalEleMap(), arg_map);

          return false;
        }

        // 客户列表信息
        customer.list.initModule(jqueryMap.$list, data);

        // 加载模态框模块
        // customer.list.modalEleMap() - 模态框模块需要用到的元素映射
        customer.modal.initModule(customer.list.modalEleMap(), arg_map);

        // 加载客户文件模块
        // customer.list.modalEleMap() - 模态框模块需要用到的元素映射
        customer.file.initModule(customer.list.modalEleMap(), arg_map);
      },
      error : function (error) {
        console.log('用户列表信息获取失败！');
        console.log(error);
      }
    });
  };
  // End : getCustomerListData()

  // Start : renderNotice()
  // des   : 渲染公告栏
  //
  renderNotice = function () {
    var i, myNotice;
    $.ajax({
      type    : 'post',
      url     : '/selectPerformanceByDay',
      success : function (data) {
        if (data.length === 0) { console.log('暂无公告数据'); return false; }

        $('.ora-user-customer-notice .swiper-slide').remove();

        for (i = 0; i < data.length; i++) {
          $('.ora-user-customer-notice .swiper-wrapper').append(
            '<div class="swiper-slide">' +
              '<p>' +
                data[i].ptime + ' 恭喜 ' +
                '<span style="color: #fd3232; font-weight: bold;">' +
                  data[i].user_name +
                '</span>' +
                ' 添加一条业绩' +
              '</p>' +
            '</div>'
          );
        }

        myNotice = new Swiper('.ora-user-customer-notice .swiper-container', {
          autoplay  : 3000,
          direction : 'vertical',
          loop      : true
        })
      }
    })
  };
  // End : renderNotice()

  // Start : onClick()
  // des   : 点击事件处理程序，所有点击事件在此处管理
  //
  onClick = function () {
    var mentor_val, customer_val, arg_map;

    // 搜索客户
    jqueryMap.$search.find('button').click(function () {
      mentor_val   = $('.ora-user-customer-search-mentorname').val();
      customer_val = $('.ora-user-customer-search-customername').val();

      arg_map = {
        uname   : mentor_val,
        cname : customer_val
      };

      if (arg_map.uname === '' && arg_map.cname === '') {
        getCustomerListData('customer/zhuguan', configMap.user_info);
      } else {
        // 搜索指定客户
          getCustomerListData('customer/fuzzy', arg_map);
      }

    });
  };
  // End : onClick()

  // Start : initModule()
  // des   : 初始化模块
  //
  initModule = function ($customer, user_info) {
    stateMap.$customer = $customer;
    configMap.user_info = user_info;
    setJqueryMap();
    getCustomerListData('customer/zhuguan', user_info);
    onClick();
    renderNotice();
  };
  // End : initModule()

  // 导出公开方法
  return {
    initModule          : initModule,
    stateMap            : stateMap,
    getCustomerListData : getCustomerListData,
    copyCustomerMap     : copyCustomerMap
  };
}());
