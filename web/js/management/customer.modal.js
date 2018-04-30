/*
 * customer.modal.js
 * 客户管理模块 - 模态框
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, customer */

customer.modal = (function () {
  var
    configMap = {
      // 元素集合
      modal_ele_map : {},

      // 当前登录人信息：姓名及职位
      user_info : {}
    },
    stateMap = {
      clicked_line            : null,
      customerNameState       : false,
      customerNumberState     : false,
      customer_name_changed   : false,
      customer_number_changed : false,
      add_customer_state      : false,
      update_customer_state   : false
    },
    jqueryMap = {},

    setJqueryMap, onClick, initModule
  ;

  // Start : setJqueryMap()
  // des : 缓存 jQuery 集合
  //
  setJqueryMap = function () {
    var modal_ele_map = configMap.modal_ele_map;
    jqueryMap = {
      $remark          : modal_ele_map.$remark,
      $remark_box      : $('.ora-user-customer-remark .modal-box'),
      $remark_close    : $('.ora-user-customer-remark .modal-box-close'),
      $update          : modal_ele_map.$update,
      $update_box      : $('.ora-user-customer-update'),
      $update_close    : $('.ora-user-customer-update .modal-box-close'),
      $update_submit   : $('.ora-user-customer-update .submit'),
      $update_serstate : $('.customer-info-content-group-state')
    };
  };
  // End : setJqueryMap()

  // Start : onClick()
  // des   : 点击事件处理程序
  //
  onClick = function (getCustomerData) {
    var
      remark,        update,          customer_info,
      remark_box,    remark_close,    remark_text,      update_close,
      name_val,      num_val,         age_val,          sex_val,
      jointime_val,  servicetime_val, leftdays_val,     payments_val,
      uname_val,     sname_val,       servicestate_val, remark_val,
      update_submit, remarkModal,     updateModal,      addcustModal,
      pauseServiceModal, update_cust_info_state,
      util = new Util()
    ;

    remark          = jqueryMap.$remark;
    remark_box      = jqueryMap.$remark_box;
    remark_close    = jqueryMap.$remark_close;
    update          = jqueryMap.$update;
    update_box      = jqueryMap.$update_box;
    update_close    = jqueryMap.$update_close;
    update_submit   = jqueryMap.$update_submit;
    update_serstate = jqueryMap.$update_serstate;
    pull            = jqueryMap.$pull;

    // sendCustomerInfo 将数据发往后台
    function sendCustomerInfo(url) {
      var
        jointime, customer_info,
        department = jqueryMap.$update_box.find('.customer-info-content-group-department_id input').val()
      ;

      jointime = $('.customer-info-content-group-jointime input').val();

      // department_id - 部门
      switch (department) {
        case '暂未分配' :
          department = 0;
          break;
        case '0' :
          department = 0;
          break;
        case '导师一部' :
          department = 1;
          break;
        case '1' :
          department = 1;
          break;
        case '导师二部' :
          department = 2;
          break;
        case '2' :
          department = 2;
          break;
        case '导师三部' :
          department = 3;
          break;
        case '3' :
          department = 3;
          break;
        default:
          break;
      }

      // 验证客户的报名时间是否符合规则
      if (
        jointime.charAt(4) === '-' &&
        jointime.charAt(7) === '-' &&
        jointime.length === 10
      ) {
        customer_info = {
          cid           : $(stateMap.clicked_line).find('.cid').text(),
          cname         : jqueryMap.$update_box.find('.customer-info-content-group-name input').val(),
          cnumber       : jqueryMap.$update_box.find('.customer-info-content-group-num input').val(),
          department_id : department,
          csex          : jqueryMap.$update_box.find('.customer-info-content-group-sex input').val(),
          bmtime        : jointime,
          serdata       : jqueryMap.$update_box.find('.customer-info-content-group-servicetime input').val(),
          spec          : jqueryMap.$update_box.find('.customer-info-content-group-standard input').val(),
          type          : jqueryMap.$update_box.find('.customer-info-content-group-type input').val(),
          secondUpdate  : jqueryMap.$update_box.find('.customer-info-content-group-second_update input').val(),
          moneyAndTime  : jqueryMap.$update_box.find('.customer-info-content-group-money_time input').val(),
          scheme        : jqueryMap.$update_box.find('.customer-info-content-group-scheme input').val(),
          uname         : jqueryMap.$update_box.find('.customer-info-content-group-mentor input').val(),
          sname         : jqueryMap.$update_box.find('.customer-info-content-group-sale input').val(),
          state         : jqueryMap.$update_box.find('.customer-info-content-group-state input').val(),
          remark        : jqueryMap.$update_box.find('.customer-info-content-group-remark textarea').val(),
          freeze        : jqueryMap.$update_box.find('.customer-info-content-group-state input').attr('data-pause_date')
        };

        $.ajax({
          type        : 'post',
          url         : url,
          data        : JSON.stringify(customer_info),
          contentType : 'application/json;charset=UTF-8',
          dataType    : 'json',
          success     : function (data) {
            // 更新客户资料后，获取客户列表最新数据
            customer.getCustomerListData('customer/zhuguan', configMap.user_info);
          },
          error : function (error) {
            console.log('更新客户个人资料失败！');
          }
        });
      }
    }

    // 添加客户模态框
    addcustModal = new Modal($('.ora-user-customer-add-modal'), {
      width       : 300,
      height      : 200,
      titleHeight : 40
    });
    // 备注模态框
    remarkModal = new Modal($('.ora-user-customer-remark'), {
      width       : 380,
      height      : 240,
      titleHeight : 40    // 模态框标题高度
    });
    // 修改客户资料模态框
    updateModal = new Modal($('.ora-user-customer-update'), {
      width       : 860,
      height      : 630,
      titleHeight : 58    // 模态框标题高度
    });
    // 冻结服务模态框
    pauseServiceModal = new Modal($('.pause-modal'), {
      width      : 300,
      height     : 150,
      lineHeight : 40
    });

    // 添加客户模态框
    // 调用 添加修改客户信息 容器，并修改标题和按钮
    $('button.ora-user-customer-add-button').unbind('click').click(function () {
      $('.ora-user-customer-update .modal-box-title').text('添加用户');
      $('.ora-user-customer-update button.add').show().siblings('button.submit').hide();
      

      // 添加用户时，先清空字段
      update_box.find('.customer-info-content-group-jointime input').val('');       // 报名时间
      update_box.find('.customer-info-content-group-name input').val('');           // 姓名
      update_box.find('.customer-info-content-group-num input').val('');            // 编号
      update_box.find('.customer-info-content-group-department_id input').val('');  // 部门
      update_box.find('.customer-info-content-group-sex input').val('');            // 性别
      update_box.find('.customer-info-content-group-servicetime input').val('');    // 服务时间
      update_box.find('.customer-info-content-group-mentor input').val('');         // 所属导师
      update_box.find('.customer-info-content-group-standard input').val('');       // 规格
      update_box.find('.customer-info-content-group-scheme input').val('');         // 方案
      update_box.find('.customer-info-content-group-money_time input').val('');     // 待补款及时间
      update_box.find('.customer-info-content-group-second_update input').val('');  // 二次升级
      update_box.find('.customer-info-content-group-type input').val('');           // 类型
      update_box.find('.customer-info-content-group-sale input').val('');           // 销售人
      update_box.find('.customer-info-content-group-state input').val('');          // 服务状态
      update_box.find('.customer-info-content-group-remark textarea').val('');      // 备注

      updateModal.showModal();

      // 监听 '所属导师' input 中的值
      $('.customer-info-content-group-mentor input').unbind('input').bind('input propertychange', function monitorName() {
        stateMap.customer_name_changed = true;
      });
      // 监听 '学员编号' input 中的值
      $('.customer-info-content-group-num input').unbind('input').bind('input propertychange', function monitorNumber() {
        stateMap.customer_number_changed = true;
      });

      stateMap.add_customer_state = true;

      return false;
    });
    // 添加客户
    $('.ora-user-customer-update button.add').unbind('click').click(function () {
      var mentor_name_state, customer_num_state;

      // 验证用户编号
      $.ajax({
        type        : 'post',
        url         : 'customer/checkCnumber',
        data        : JSON.stringify({ cnumber : $('.customer-info-content-group-num input').val() }),
        contentType : 'application/json;charset=UTF-8',
        dataType    : 'json',
        success     : function (data) {
          if (data) {  // 用户编号符合要求
            $('.customer-info-content-group-tips .tips-checknumber').hide();  // 隐藏验证用户编号提示信息

            // 验证用户所属导师
            $.ajax({
              type        : 'post',
              url         : 'customer/checkUname',
              data        : JSON.stringify({ uname : $('.customer-info-content-group-mentor input').val() }),
              contentType : 'application/json;charset=UTF-8',
              dataType    : 'json',
              success     : function (data) {
                if (data) {  // 用户编号符合要求
                  $('.customer-info-content-group-tips .tips-checkname').hide();  // 隐藏验证用户所属导师提示信息
                  updateModal.hideModal( sendCustomerInfo('customer/add') );      // 提交新用户信息并关闭添加用户信息模态框
                } else {
                  $('.customer-info-content-group-tips .tips-checkname').show();  // 显示验证用户所属导师提示信息
                }
              },
              error : function (error) {
                console.log('与服务器通讯失败!');
                console.log(error);
              }
            });
          } else {
            $('.customer-info-content-group-tips .tips-checknumber').show();  // 显示验证用户编号提示信息
            return false;
          }
        },
        error : function (error) {
          console.log('与服务器通讯失败!');
          console.log(error);
        }
      });
    });

    // 显示客户备注模态框
    $(remark).unbind('click').unbind('click').click(function () {
			console.log( $(this).siblings('.cname').text() );
			console.log( $(remark_box) );
      remark_text = $(this).parent().find('.pagination-remark').text();
      $(remark_box).find('.modal-box-content-text').text(remark_text);

			// 更新备注模态框标题
			$(remark_box).find('.modal-box-title')
			  .text( $(this).siblings('.cname').text() + '的备注信息');
      remarkModal.showModal();
    });
    // 关闭客户备注模态框
    $(remark_close).unbind('click').click(function () {
      remarkModal.hideModal();
    });

    // 显示修改客户信息模态框
    $(update).unbind('click').click(function () {
      var
        clicked_line,
        name_val,         num_val,          department_val, sex_val,      jointime_val,
        servicetime_val,  leftdays_val,     payments_val,   standard_val, uname_val,
        sname_val,        servicestate_val, remark,         name,         num,
        age,              sex,              jointime,       servicetime,  leftdays,
        uname,            sname,            servicestate,   remark,       scheme,
        money_time,       second_update,    ser_type,       scheme_val,   money_time_val,
        second_update_val,ser_type_val
      ;
	    
      clicked_line = $(this).parent().parent();
      stateMap.clicked_line = clicked_line;

      $('.ora-user-customer-update .modal-box-title').text('修改用户信息');
      $('.ora-user-customer-update button.submit').show().siblings('button.add').hide();
      jointime_val     = $(this).parent().siblings('.jointime').text();
      name_val         = $(this).parent().siblings('.cname').text();
      num_val          = $(this).parent().siblings('.cnum').text();
      department_val   = $(this).parent().siblings('.department_id').text();
      sex_val          = $(this).parent().siblings('.csex').text();
      servicetime_val  = $(this).parent().siblings('.servicetime').text();
      leftdays_val     = $(this).parent().siblings('.leftdays').text();
      standard_val     = $(this).parent().siblings('.standard').text();
      uname_val        = $(this).parent().siblings('.uname').text();
      sname_val        = $(this).parent().siblings('.sname').text();
      servicestate_val = $(this).parent().siblings('.servicestate').text();
      remark_val       = $(this).parent().siblings('.pagination-remark').text();
      scheme_val       = $(this).parent().siblings('.scheme').text();             // 方案
      money_time_val   = $(this).parent().siblings('.money_time').text();         // 待补款及时间
      second_update_val= $(this).parent().siblings('.secondUpdate').text();       // 二次升级
      ser_type_val     = $(this).parent().siblings('.type').text();               // 类型

      bmtime        = update_box.find('.customer-info-content-group-jointime input').val(jointime_val);
      cname         = update_box.find('.customer-info-content-group-name input').val(name_val);
      cnumber       = update_box.find('.customer-info-content-group-num input').val(num_val);
      department_id = update_box.find('.customer-info-content-group-department_id input').val(department_val);
      csex          = update_box.find('.customer-info-content-group-sex input').val(sex_val);

      serdata       = update_box.find('.customer-info-content-group-servicetime input').val(servicetime_val);
      spec          = update_box.find('.customer-info-content-group-standard input').val(standard_val);
      uname         = update_box.find('.customer-info-content-group-mentor input').val(uname_val);
      sname         = update_box.find('.customer-info-content-group-sale input').val(sname_val);
      state         = update_box.find('.customer-info-content-group-state input').val(servicestate_val);
      remark        = update_box.find('.customer-info-content-group-remark textarea').val(remark_val);
      scheme        = update_box.find('.customer-info-content-group-scheme input').val(scheme_val);
      money_time    = update_box.find('.customer-info-content-group-money_time input').val(money_time_val);
      second_update = update_box.find('.customer-info-content-group-second_update input').val(second_update_val);
      ser_type      = update_box.find('.customer-info-content-group-type input').val(ser_type_val);

      // 显示修改客户个人资料模态框
      updateModal.showModal();

      // 监听 '所属导师' input 中的值
      $('.customer-info-content-group-mentor input').unbind('input').bind('input propertychange', function monitorName() {
        stateMap.customer_name_changed = true;
      });
      // 监听 '学员编号' input 中的值
      $('.customer-info-content-group-num input').unbind('input').bind('input propertychange', function monitorNumber() {
        stateMap.customer_number_changed = true;
      });

      stateMap.update_customer_state = true;

    });
    // 选择客户服务状态
    $(update_serstate).unbind('click').click(function () {
      var that = $(this);

      // 显示下拉菜单
      $(this).find('.options').css({ display : 'flex' });
      // 选择服务状态
      $(this).find('.options span').click(function (event) {
        that.find('input').val( $(this).text() );
        that.find('.options').hide();
        $('.customer-info-content-group-state input').attr('data-pause_date', '');
        event.stopPropagation();
      });
    });
    // 当选择冻结服务时, 调用设置冻结时间的模态框
    $('.customer-info-content-group-state .pause-service').unbind('click').click(function () {
      var now_date = util.formatDate('-');
      if ( stateMap.add_customer_state ) {
        $('.pause-modal .customer-pause-content input').val(now_date.now_date);
        pauseServiceModal.showModal();
      }
    });
    // 关闭设置冻结时间的模态框
    // 当取消设置冻结时间后, 重置服务状态
    $('.pause-modal .modal-box-close').unbind('click').click(function () {
      pauseServiceModal.hideModal(function resetServiceState() {
        $('.customer-info-content-group-state input').val('');  // 重置服务状态
        $('.customer-info-content-group-state input').attr('data-pause_date', '');
      });
    });
    // 选择冻结时间
    $('.pause-modal .pause-confirm').unbind('click').click(function () {
      pauseServiceModal.hideModal(function setServiceState() {
        $('.customer-info-content-group-state input').attr(
          'data-pause_date',
          $('.pause-modal .customer-pause-content input').val()
        );
      });
    });

    // 提交客户资料
    // callback - 当客户资料提交成功之后，获取最新客户资料列表
    $(update_submit).unbind('click').click(function () {
      // 所属导师的 input 被动态监听, 当修改用户资料时, 若所属导师属性值没有改变, 可跳过判断；
      // 所属导师的属性值若有改变, 则向后台发起请求, 若后台返回 true 说明该用户信息可提交, 否则
      // 不可提交
      if (!stateMap.customer_name_changed && !stateMap.customer_number_changed ) {
        updateModal.hideModal( sendCustomerInfo('customer/update') );
      }

      // 验证用户所属导师是否存在
      if (stateMap.customer_name_changed) {
        $.ajax({
          type        : 'post',
          url         : 'customer/checkUname',
          data        : JSON.stringify({ uname : $('.customer-info-content-group-mentor input').val() }),
          contentType : 'application/json;charset-UTF-8',
          dataType    : 'json',
          success     : function (data) {
            if (data) {
              updateModal.hideModal( sendCustomerInfo('customer/update') );
              $('.customer-info-content-group-tips .tips-checkname').hide();
            } else {
              $('.customer-info-content-group-tips .tips-checkname').show();
              return false;
            }
          },
          error : function (error) {
            console.log('与服务器通讯失败!');
            console.log(error);
          }
        });
      }

      // 验证用户编号
      if (stateMap.customer_number_changed) {
        $.ajax({
          type        : 'post',
          url         : 'customer/checkCnumber',
          data        : JSON.stringify({ cnumber : $('.customer-info-content-group-num input').val() }),
          contentType : 'application/json;charset=UTF-8',
          dataType    : 'json',
          success     : function (data) {
            if (data) {
              updateModal.hideModal( sendCustomerInfo('customer/update') );
              $('.customer-info-content-group-tips .tips-checknumber').hide();
            } else {
              $('.customer-info-content-group-tips .tips-checknumber').show();
              return false;
            }
          },
          error : function (error) {
            console.log('与服务器通讯失败!');
            console.log(error);
          }
        });
      }
    });
    // 关闭修改客户信息模态框
    $(update_close).unbind('click').click(function () {
      updateModal.hideModal();
    });

    // 添加或更新用户的分部时提示
    $('.customer-info-content-group-department_id input').focus(function showDepartmentTip() {
      $(this).siblings('div.department_tip').removeClass('hidden');
    });
    $('.customer-info-content-group-department_id input').blur(function hideDepartmentTip() {
      $(this).siblings('div.department_tip').addClass('hidden');
    });
  };
  // End : onClick()

  initModule = function ( modal_ele_map, user_info ) {
    // 将模态框用到的元素映射保存在 configMap.modal_ele_map 中
    configMap.modal_ele_map = modal_ele_map;
    configMap.user_info = user_info;
    setJqueryMap();
    onClick();
  };

  return {
    initModule : initModule,
    stateMap   : stateMap
  };
}());
