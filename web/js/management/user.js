/*
 * user.js
 * 导师管理模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, user*/

/***************************** START DESCRIPTIONS *****************************/
//
// Time : 2017.11.25
// Last Time : 2017.12.27
//
// 超级管理员、总监和主管登陆后发起多次 ajax 请求
//
// 超级管理员登陆
//   [ ] 1. 页面加载后请求数据
//          1.1 请求总监信息
//              url    : 'user/root/selectMajordomo'
//              send   : none
//              return : [{}]
//          1.2 请求部门信息
//              url    : 'user/root/selectSupervisor'
//              send   : { department_id : xx(int) }
//                       页面加载后, 默认发 1 到后台
//              return : { ..., department_id : xx }
//          1.3 请求导师信息
//              url    : 'user/selectUserDepart'
//              send   : { department_id : xx(int) }
//              return : [{}, {}, ...]
//                       页面加载后, 默认发 1 到后台
//   [ ] 2. 切换部门
//            请求 1
//              url    : 'user/root/selectSupervisor'
//              send   : { department_id : xx(int) }
//              return : { ..., department_id : xx }
//            请求 2
//              url    : 'user/selectUserDepart'
//              send   : { department_id : xx(int) }
//              return : [{}, {}, ...]
//   [ ] 3. 修改信息
//            url    : 'updateme'
//            send   : { 当前行的所有信息 }
//            return : Boolean
//                     true  - 修改成功
//                     false - 修改失败
//            3.1 检查上级领导是否存在
//                url    : 'user/checkUname'
//                send   : { uname : xx(str) }
//                return : Boolean
//                         true  - 不存在上级领导，不可修改
//                         false - 存在上级领导，可以修改
//   [ ] 4. 删除信息
//            url    : 'user/delete'
//            send   : { uid : 返回来的数据中 uid }
//            return : Boolean
//                     true  - 删除成功
//                     false - 删除失败
//
// 总监登陆
//
// 主管登陆
//
/****************************** END DESCRIPTIONS ******************************/

var user = (function () {
  var
    stateMap = { $user : null, userinfo_map : null },
    jqueryMap = {},

    setJqueryMap,    checkPosition, InitStyle,
    CustomerService, Admin,         Majordomo,
    Director,        initModule;

  // Start : setJqueryMap()
  // des   : 缓存 jQuery 集合
  //
  setJqueryMap = function () {
    var $user = stateMap.$user;
    jqueryMap = {
      $user       : $user,
      $zj         : $user.find('.ora-user-mentor-zj'),
      $department : $user.find('.ora-user-mentor-department')
    };
  };
  // End : setJqueryMap()

  // Start : InitStyle()
  // des   : 初始化样式
  //
  InitStyle = function () {
    // Start : InitStyle.director()
    // des   : 初始化 主管 样式
    //
    this.director = function () {
      var
        $department      = jqueryMap.$department,
        $department_list = $department.find('.department-list'),
        $number          = $department_list.find('td.number'),      // 员工编号
        $name            = $department_list.find('td.name'),        // 姓名
        $sex             = $department_list.find('td.sex'),         // 性别
        $superior        = $department_list.find('td.superior'),    // 上级领导
        $birthday        = $department_list.find('td.birthday'),    // 生日
        $complaint       = $department_list.find('td.complaint'),   // 投诉次数
        $department_id   = $department_list.find('td.department'),  // 部门
        $phone           = $department_list.find('td.phone'),       // 联系电话
        $edit            = $department_list.find('td.edit')         // 修改
      ;

      // 员工编号
      $number.find('.number-text').removeClass('hidden')
        .siblings('input').attr('type', 'hidden');

      // 姓名
      $name.find('.name-text').removeClass('hidden')
        .siblings('input').attr('type', 'hidden');

      // 性别
      $sex.find('.sex-text').removeClass('hidden')
        .siblings('input').attr('type', 'hidden');

      // 上级领导
      $superior.find('.superior-text').removeClass('hidden')
        .siblings('input').attr('type', 'hidden');

      // 生日
      $birthday.find('.birthday-text').removeClass('hidden')
        .siblings('input').attr('type', 'hidden');

      // 投诉次数
      $complaint.find('.complaint-text').removeClass('hidden')
        .siblings('input').attr('type', 'hidden');

      // 部门
      $department_id.find('.department-text').removeClass('hidden')
        .siblings('input').attr('type', 'hidden');

      // 联系电话
      $phone.find('.phone-text').removeClass('hidden')
        .siblings('input').attr('type', 'hidden');

      // 修改按钮
      $edit.find('.edit-before').show()
        .siblings('.edit-after').addClass('hidden');

    };
    // End : InitStyle.director()

    // Start : InitStyle.mentor()
    // des   : 初始化 导师 样式
    //
    this.mentor = function (ele_map) {};
    // End : InitStyle.mentor()
  };
  // End : InitStyle()

  // Start : CustomerService()
  // des   :
  //
  CustomerService = function () {
    var
      admin                  = new Admin(),
      $majordomo_edit_btn    = $('.ora-user-mentor-zj td.edit'),
      $director_edit_btn     = $('.department-list .edit-before-update'),
      $director_update_btn   = $('.department-list .edit-after-confirm'),
      $director_delete_btn   = $('.department-list .edit-before-delete')
    ;

    this.updateData = function (arg_map) {
      $.ajax({
        type        : 'post',
        url         : 'updateme',
        // url         : '../../json/updateMajordomoInfo.json',
        data        : JSON.stringify(arg_map),
        contentType : 'application/json;charset=UTF-8',
        dataType    : 'json',
        success     : function (data) {
          if (data.length === 0) { return false; }

          if (!data) {
            alert('update information failed! Please refresh!');
            console.log('update failed!');
          }
        },
        error : function (error) {
          console.log('与服务器通讯失败!');
          console.log(error);
        }
      });
    };

    this.initStyle = function () {
      $director_delete_btn.hide();
    };

    // Start : CustomerService.onClick()
    // des   :
    //
    this.onClick = function () {
      var
        customerService       = new CustomerService(),
        $department_tab       = jqueryMap.$department.find('.department-tab'),
        $majordomo_change_btn = $majordomo_edit_btn.find('span.edit'),
        $majordomo_update_btn = $majordomo_edit_btn.find('span.edit-text'),
        $majordomo_complaint, $majordomo_complaint_text,
        $director_complaint,  $director_complaint_text,
        $this_line
      ;

      // change majordomo's information
      $majordomo_change_btn.unbind('click').click(function () {
        $majordomo_complaint      = $(this).parent().siblings('td.complaint');
        $majordomo_complaint_text = $majordomo_complaint.find('span').text();
        // update button's styles
        $(this).hide().siblings('.edit-text').removeClass('hidden');

        // update complaint
        $majordomo_complaint.find('.complaint-text').hide()
          .siblings('input').attr('type', 'text')
            .val($majordomo_complaint_text);
      });
      // update majordomo's information
      $majordomo_update_btn.unbind('click').click(function () {
        $this_line               = $(this).parent().parent();
        $majordomo_complaint     = $(this).parent().siblings('td.complaint');
        $majordomo_complaint_val = $majordomo_complaint.find('input').val();
        
        // update button's styles
        $(this).addClass('hidden').siblings('.edit').show();

        // update complaint
        $majordomo_complaint.find('.complaint-text').show().text($majordomo_complaint_val)
          .siblings('input').attr('type', 'hidden')
            .attr('placeholder', 0).val($majordomo_complaint_val)
          .parent().attr('data-complaint', $majordomo_complaint_val);

        customerService.updateData({
          complaint : parseInt($majordomo_complaint_val),
          uid       : parseInt($this_line.attr('data-uid'))
        });

      });

      // change director's information
      $director_edit_btn.unbind('click').click(function () {
        $director_complaint      = $(this).parent().parent().siblings('td.complaint');
        $director_complaint_text = $director_complaint.find('.complaint-text').text();

        // update button's styles
        $(this).parent().hide().siblings('.edit-after').removeClass('hidden');

        // update complaint
        $director_complaint.find('.complaint-text').addClass('hidden')
          .siblings('input').attr('type', 'text')
            .val($director_complaint_text);
      });
      // update director's information
      $director_update_btn.unbind('click').click(function () {
        $this_line              = $(this).parent().parent().parent();
        $director_complaint     = $(this).parent().parent().siblings('td.complaint');
        $director_complaint_val = $director_complaint.find('input').val();
        
        // update button's styles
        $(this).parent().addClass('hidden').siblings('.edit-before').show();

        // update complaint
        $director_complaint.find('.complaint-text').removeClass('hidden').text($director_complaint_val)
          .siblings('input').attr('type', 'hidden')
            .attr('placeholder', 0).val($director_complaint_val)
          .parent().attr('data-complaint', $director_complaint_val);

        customerService.updateData({
          complaint : parseInt($director_complaint_val),
          uid       : parseInt($this_line.attr('data-uid'))
        });

      });

      // 切换部门
      $department_tab.unbind('click').click(function (event) {
        var target = event.target || window.event.target,
          index  = $(target).index() + 1;

        switch (target) {
          case $department_tab.find('th')[0] :  // 导师一部
            $(target).addClass('active').siblings('th').removeClass('active');
            admin.getDirectorData({ department_id : parseInt(index, 10) });
            admin.getMentorData({ department_id : parseInt(index, 10) });
            $.uriAnchor.setAnchor({ page :1 });
            break;
          case $department_tab.find('th')[1] :  // 导师二部
            $(target).addClass('active').siblings('th').removeClass('active');
            admin.getDirectorData({ department_id : parseInt(index, 10) });
            admin.getMentorData({ department_id : parseInt(index, 10) });
            $.uriAnchor.setAnchor({ page :1 });
            break;
          default:
            break;
        }
      });

    };
    // End : CustomerService.onClick()

    // Start : CustomerService.updateMentorInfo()
    // des   : update mentor's information
    // args  : ele_map from Admin.editMentor()
    //
    this.updateMentorInfo = function (ele_map) {
      var
        customerService = new CustomerService(),
        $edit_mentor    = ele_map.$edit_mentor,
        $update_mentor  = ele_map.$update_mentor,
        $delete_mentor  = ele_map.$delete_mentor
      ;

      // hide delete button
      $delete_mentor.hide();

      // change mentor's complaint
      $edit_mentor.unbind('click').click(function () {
        var
          $this_line      = $(this).parent().parent().parent(),
          $complaint      = $this_line.find('td.complaint'),
          $complaint_text = $complaint.find('.complaint-text'),
          $complaint_val  = $complaint.find('.complaint-input')
        ;

        // update button styles
        $this_line.find('.edit-before').hide();
        $this_line.find('.edit-after').removeClass('hidden');

        // change complaint
        $complaint_text.addClass('hidden').siblings('input').attr('type', 'text');
      });

      // update mentor's complaint
      $update_mentor.unbind('click').click(function () {
        var
          $this_line       = $(this).parent().parent().parent(),
          $complaint       = $this_line.find('td.complaint'),
          $complaint_text  = $complaint.find('.complaint-text'),
          $complaint_input = $complaint.find('.complaint-input')
        ;
        
        // update button styles
        $this_line.find('.edit-before').show();
        $this_line.find('.edit-after').addClass('hidden');

        // change complaint
        $complaint.find('.complaint-text').removeClass('hidden').text( $complaint_input.val() )
        .siblings('.complaint-input').attr('type', 'hidden')
        .parent().attr('data-complaint', $complaint_input.val());

        customerService.updateData({
          complaint : parseInt($complaint_input.val()),
          uid       : parseInt($this_line.attr('data-uid'))
        });

      });
    };
    // End : CustomerService.updateMentorInfo()

  };
  // End : CustomerService()

  // Start : Admin()
  // des   : 超级管理员登陆
  //
  Admin = function () {
    // 调用模态框组件
    var majordomoModal = new Modal($('.majordomo-info'), {
      width       : 750,
      height      : 420,
      titleHeight : 58
    });

    // 隐藏总监信息模态框
    $('.majordomo-info .modal-box-close').unbind('click').click(function () {
      majordomoModal.hideModal();
    });
    $('.majordomo-content-btn').unbind('click').click(function () {
      majordomoModal.hideModal();
    });

    // Start : Admin.getMajordomoData()
    // des   : 请求总监信息。当超级管理员登陆时, 获取总监信息
    //
    this.getMajordomoData = function () {
      var admin = new Admin();
      $.ajax({
        type    : 'post',
        url     : 'user/root/selectMajordomo',
        success : function (data) {
          if (data.length === 0) { return false; }

          admin.renderMajordomoList(data);
          admin.majordomoModal(data);
        },
        error : function (error) {
          console.log('与服务器通讯失败!');
          console.log(error);
        }
      });
    };
    // End : Admin.getMajordomoData()

    // Start  : Admin.getDirectorData()
    // des    : 请求主管信息。当超级管理员登录时, 获取主管信息
    // args   : arg_map - 向服务器发送的数据映射
    //          suc     - 当获取到服务器数据后执行的方法
    // return : [{}]
    //
    this.getDirectorData = function (arg_map, suc) {
      var
        admin    = new Admin(),
        data_map = {};
      $.ajax({
        type        : 'post',
        url         : 'user/root/selectSupervisor',
        data        : JSON.stringify(arg_map),
        contentType : 'application/json;charset=UTF-8',
        dataType    : 'json',
        success     : function (data) {
          if (data.length === 0) {
            $('.department-list').addClass('hidden');
            return false;
          }

          $('.department-list').removeClass('hidden');
          if (suc) { suc(); }

          data_map.director_data = data;

          // 渲染主管信息
          admin.renderDirectorList(data);
          admin.directorModal(data);
        },
        error : function (error) {
          console.log('与服务器通讯失败!');
          console.log(error);
        }
      });
    };
    // End : Admin.getDirectorData()

    // Start  : Admin.getMentorData()
    // des    : 获取员工列表信息
    // args   : suc      - 成功获取到服务器数据后执行的方法
    //          arg_map - { department_id : num(int) }
    // return : [{}, {}, {}, ...]
    //
    this.getMentorData = function (arg_map, suc) {
      var admin = new Admin();
      $.ajax({
        type        : 'post',
        url         : 'user/selectUserDepart',
        data        : JSON.stringify(arg_map),
        contentType : 'application/json;charset=UTF-8',
        dataType    : 'json',
        success     : function (data) {
          if (data.length === 0) {
            // 当没有主管信息时, 不要渲染导师列表
            $('.comployee-pagination').hide();
            setTimeout('alert(\'无该部门数据\');', 200);
            return false;
          }

          $('.comployee-pagination').show();
          if (suc) { suc(); }

          // 渲染导师列表信息
          // 当列表渲染完成后, 调用 Admin.editMentor() 方法执行相应点击事件处理程序
          admin.renderMentorList(data, admin.editMentor);
          admin.mentorModal();
        },
        error : function (error) {
          console.log('与服务器通讯失败!');
          console.log(error);
        }
      });
    };
    // End : getMentorData()

    // Start   : Admin.updateInfo()
    // des     : 修改总监信息
    // args    : arg_map - 向服务器发送的数据映射
    //           suc     - 当获取到服务器数据后执行的方法
    // return  : Boolean
    //           true  - 修改成功
    //           false - 修改失败
    //
    this.updateInfo = function (arg_map, extra_arg, suc) {
      $.ajax({
        type        : 'post',
        url         : 'updateme',
        data        : JSON.stringify(arg_map),
        contentType : 'application/json;charset=UTF-8',
        dataType    : 'json',
        success     : function (data) {
          // 打印向后台发送的数据
          console.log(arg_map);

          if (data.length === 0) { return false; }

          if (data) {
            // 验证上级领导
            if (extra_arg.$this_line !== null) {
              if (suc) { suc(arg_map); }
            } else {
              $.ajax({
                type  : 'post',
                url   : 'user/checkUname',
                data  : JSON.stringify(
                  { uname : extra_arg.$this_line.find('.superior-input').val() }
                ),
                contentType : 'application/json;charset=UTF-8',
                dataType    : 'json',
                success     : function (data) {
                  if (data) { alert('请检查上级领导是否正确!'); return false; }
                  if (suc) { suc(arg_map); }
                },
                error : function (error) {
                  console.log('与服务器通讯失败!');
                  console.log(error);
                }
              });
            }
          }

          if (!data) {
            console.log('update failed!');
          }
        },
        error : function (error) {
          console.log('与服务器通讯失败!');
          console.log(error);
        }
      });
    };
    // End : Admin.updateInfo()

    // Start  : Admin.deleteUser()
    // des    : 删除用户。
    // args   : { uid : num(int) }
    // return : Boolean
    //          true  - 成功删除用户
    //          false - 删除用户失败
    //
    this.deleteUser = function (arg_map, suc) {
      $.ajax({
        type        : 'post',
        url         : 'user/delete',
        data        : JSON.stringify(arg_map),
        contentType : 'application/json;charset=UTF-8',
        dataType    : 'json',
        success     : function (data) {
          if (data.length === 0) { return false; }
          if (data) {
            console.log('成功删除用户!');
            if (suc) { suc(); }
          } else {
            console.log('删除用户失败!');
          }
        },
        error : function (error) {
          console.log('与服务器通讯失败!');
          console.log(error);
        }
      });
    };
    // End : Admin.deleteUser()

    // Start : Admin.renderMajordomoList()
    // des   : 渲染总监信息
    //
    this.renderMajordomoList = function (data) {
      var
        $zj = jqueryMap.$zj,
        $employee_number = $zj.find('td.employee_number'),  // 员工编号
        $name            = $zj.find('td.name'),             // 姓名
        $sex             = $zj.find('td.sex'),              // 性别
        $majordomo       = $zj.find('td.majordomo'),        // 职务(总监)
        $birthday        = $zj.find('td.birthday'),         // 生日
        $complaint       = $zj.find('td.complaint'),        // 投诉次数
        $wechat          = $zj.find('td.wechat'),           // 微信号
        $phone           = $zj.find('td.phone'),            // 联系电话
        key_name
      ;

      // 当映射中属性值为 null 时, 设置占位符
      for (key_name in data[0]) {
        if (data[0].hasOwnProperty(key_name)) {
          if (data[0][key_name] === null) {
            data[0][key_name] = '';
          }
        }
      }

      // 保存当前行 uid
      $zj.find('tbody tr').attr('data-uid', data[0].uid);

      // 将可以修改的信息保存到当前行下的 .majordomo-data 中
      $zj.find('.majordomo-data .majordomo-number').text(data[0].number);             // 保存用户编号
      $zj.find('.majordomo-data .majordomo-name').text(data[0].uname);                // 保存姓名
      $zj.find('.majordomo-data .majordomo-entry_time').text(data[0].entryTime);      // 保存入职时间
      $zj.find('.majordomo-data .majordomo-department').text(data[0].department_id);  // 保存分部
      $zj.find('.majordomo-data .majordomo-superior').text(data[0].supperior);        // 保存上级领导
      $zj.find('.majordomo-data .majordomo-complaint').text(data[0].complaint);       // 保存被投诉次数
      $zj.find('.majordomo-data .majordomo-remark').text(data[0].remark);             // 保存备注

      // 员工编号
      $employee_number.attr('data-employee_number', data[0].number)
        .find('.employee_number-text').text(data[0].number)      // span
        .siblings('input').attr('placeholder', data[0].number);  // input

      // 姓名
      $name.attr('data-name', data[0].uname)
        .find('.name-text').text(data[0].uname)                 // span
        .siblings('input').attr('placeholder', data[0].uname);  // input

      // 性别
      $sex.attr('data-sex', data[0].usex)
        .find('.sex-text').text(data[0].usex)                  // span
        .siblings('input').attr('placeholder', data[0].usex);  // input

      // 职务(总监)
      $majordomo.attr('data-majordomo', '总监')
        .find('.majordomo-text').text('总监')            // span
        .siblings('input').attr('placeholder', '总监');  // input

      // 生日
      $birthday.attr('data-birthday', data[0].ubirthday)
        .find('.birthday-text').text(data[0].ubirthday)             // span
        .siblings('input').attr('placeholder', data[0].ubirthday);  // input

      // 投诉次数
      $complaint.attr('data-complaint', data[0].complaint)
        .find('.complaint-text').text(data[0].complaint)            // span
        .siblings('input').attr('placeholder', data[0].complaint);  // input

      // 微信号
      $wechat.attr('data-wechat', data[0].uwechat)
        .find('.wechat-text').text(data[0].uwechat)  // span
        .siblings('input').text(data[0].uwechat);    // input

      // 联系电话
      $phone.attr('data-phone', data[0].utel)
        .find('.phone-text').text(data[0].utel)                // span
        .siblings('input').attr('placeholder', data[0].utel);  // input
    };
    // End : Admin.renderMajordomoList()

    // Start : Admin.renderDirectorList()
    // des   : 渲染主管信息
    //
    this.renderDirectorList = function (data) {
      var
        initStyle        = new InitStyle(),
        $department      = jqueryMap.$department,
        $employee_number = $department.find('td.number'),     // 员工编号
        $name            = $department.find('td.name'),       // 姓名
        $sex             = $department.find('td.sex'),        // 性别
        $director        = $department.find('td.director'),   // 职务(总监)
        $superior        = $department.find('td.superior'),   // 上级领导
        $birthday        = $department.find('td.birthday'),   // 生日
        $complaint       = $department.find('td.complaint'),  // 投诉次数
        $department_id   = $department.find('td.department'), // 微信号
        $phone           = $department.find('td.phone'),      // 联系电话
        key_name,
        department_id
      ;

      // 初始化 主管 结构样式
      initStyle.director();

      // 当映射中属性值为 null 时, 设置占位符
      for (key_name in data[0]) {
        if (data[0].hasOwnProperty(key_name)) {
          if (data[0][key_name] === null) {
            data[0][key_name] = '';
          }
        }
      }

      // 格式化 data[0].department_id (部门)
      switch (data[0].department_id) {
        case 1 :
          department_id = '导师一部';
          break;
        case 2 :
          department_id = '导师二部';
          break;
        default :
          break;
      }

      // 保存 uid, 当删除数据时, 需要将 uid 传到后台
      $department.find('table tbody tr:last-child')
        .attr('data-uid', data[0].uid);

      // 将可以修改的信息保存到当前行下的 .majordomo-data 中
      $department.find('.director-data-number').text(data[0].number);             // 保存用户编号
      $department.find('.director-data-name').text(data[0].uname);                // 保存姓名
      $department.find('.director-data-entry_time').text(data[0].entryTime);      // 保存入职时间
      $department.find('.director-data-department').text(data[0].department_id);  // 保存分部
      $department.find('.director-data-superior').text(data[0].supperior);        // 保存上级领导
      $department.find('.director-data-complaint').text(data[0].complaint);       // 保存被投诉次数
      $department.find('.director-data-remark').text(data[0].remark);             // 保存备注

      // 员工编号
      $employee_number.attr('data-employee_number', data[0].number)
        .find('.number-text').text(data[0].number)               // span
        .siblings('input').attr('placeholder', data[0].number);  // input

      // 姓名
      $name.attr('data-name', data[0].uname)
        .find('.name-text').text(data[0].uname)                 // span
        .siblings('input').attr('placeholder', data[0].uname);  // input

      // 性别
      $sex.attr('data-sex', data[0].usex)
        .find('.sex-text').text(data[0].usex)                  // span
        .siblings('input').attr('placeholder', data[0].usex);  // input

      // 职务
      $director.attr('data-director', '主管')
        .find('input').text('主管')                      // span
        .siblings('input').attr('placeholder', '主管');  // input

      // 上级领导
      $superior.attr('data-superior', data[0].supperior)
        .find('.superior-text').text(data[0].supperior)             // span
        .siblings('input').attr('placeholder', data[0].supperior);  // input

      // 生日
      $birthday.attr('data-birthday', data[0].ubirthday)
        .find('.birthday-text').text(data[0].ubirthday)             // span
        .siblings('input').attr('placeholder', data[0].ubirthday);  // input

      // 投诉次数
      $complaint.attr('data-complaint', data[0].complaint)
        .find('.complaint-text').text(data[0].complaint)            // span
        .siblings('input').attr('placeholder', data[0].complaint);  // input

      // 部门
      $department_id.attr('data-department', data[0].department_id)
        .find('.department-text').text(department_id)               // span
        .siblings('input').attr('placeholder', department_id);      // input

      // 联系电话
      $phone.attr('data-phone', data[0].utel)
        .find('.phone-text').text(data[0].utel)                     // span
        .siblings('input').attr('placeholder', data[0].utel);       // input
    };
    // End : Admin.renderDirectorList()

    // Start : Admin.renderMentorList()
    // des   : 渲染导师信息
    //
    this.renderMentorList = function (data, fn) {
      var
        i, j, k,
        result,     $pagination_content, $pagination_controllers,
        group_html, page_num_html,       page_html,
        position,   department_id,       entryTime,
        key_name,
        initStyle = new InitStyle()
      ;

      result = [];
      $pagination_content     = $('.ora-user-mentor-comployee .pagination-content');
      $pagination_controllers = $('.ora-user-mentor-comployee .pagination-controllers');

      // 清空分页器主内容区
      $pagination_content.children().remove();
      // 清空分页器页码
      $pagination_controllers.children().remove();

      // 当映射中属性值为 null 时, 设置占位符
      for (key_name in data[0]) {
        if (data[0].hasOwnProperty(key_name)) {
          if (data[0][key_name] === null) {
            data[0][key_name] = '无';
          }
        }
      }

      // 数据分组
      for (i = 0; i < data.length; i += 7) {
        result.push( data.slice(i, i + 7) );
      }

      for (j = 0; j < result.length; j++) {
        group_html =
          '<div class="pagination-content-page">' +
            '<table>' +
              '<thead>' +
                '<th class="text-center">员工编号</th>' +
                '<th class="text-center">姓名</th>' +
                '<th class="text-center">性别</th>' +
                '<th class="text-center">职务</th>' +
                '<th class="text-center">上级领导</th>' +
                '<th class="text-center">生日</th>' +
                '<th class="text-center">投诉次数</th>' +
                '<th class="text-center">部门</th>' +
                '<th class="text-center">联系电话</th>' +
                '<th class="text-center">操作</th>' +
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

          // 判断部门
          switch (result[j][k].department_id) {
            case 1 :
              department_id = '导师一部';
              break;
            case 2 :
              department_id = '导师二部';
              break;
            default :
              break;
          }

          // 对 null 值做判断
          // entryTime   默认 null
          // uwechat     默认 null
          // supperior   默认 null
          // remark      默认 null
          // birthplace  默认 null
          // certificate 默认 null
          if (result[j][k].entryTime === null) {
            entryTime = '无';
          } else {
            entryTime = result[j][k].entryTime.split(' ')[0];
          }

          page_html =
            '<tr data-uid="' + result[j][k].uid + '">' +
              '<td class="number td text-center" data-number="' + result[j][k].number + '">' +
                '<span class="number-text">' + result[j][k].number +'</span>' +
                '<input class="number-input text-center" type="hidden" placeholder="' + result[j][k].number + '" value="' + result[j][k].number + '">' +
              '</td>' +
              '<td class="name td text-center" data-name="'+ result[j][k].uname +'">' +
                '<span class="name-text">' + result[j][k].uname + '</span>' +
                '<input class="name-input text-center" type="hidden" placeholder="' + result[j][k].uname + '" value="' + result[j][k].uname + '">' +
              '</td>' +
              '<td class="sex td text-center" data-sex="' + result[j][k].usex + '">' +
                '<span class="sex-text">' + result[j][k].usex + '</span>' +
                '<input class="sex-input text-center" type="hidden" placeholder="' + result[j][k].usex + '" value="' + result[j][k].usex + '">' +
              '</td>' +
              '<td class="director td text-center" data-position="' + position + '">' +
                '<span class="director-text">' + position + '</span>' +
                '<input class="director-input text-center" type="hidden" placeholder="' + position + '" value="' + position + '">' +
              '</td>' +
              '<td class="superior td text-center" data-superior="' + result[j][k].supperior + '">' +
                '<span class="superior-text">' + result[j][k].supperior + '</span>' +
                '<input class="superior-input text-center" type="hidden" placeholder="' + result[j][k].supperior + '" value="' + result[j][k].supperior + '">' +
              '</td>' +
              '<td class="birthday td text-center" data-birthday="' + result[j][k].ubirthday + '">' +
                '<span class="birthday-text">' + result[j][k].ubirthday.split(' ')[0] + '</span>' +
                '<input class="birthday-input text-center" type="hidden" placeholder="' + result[j][k].ubirthday.split(' ')[0] + '" value="' + result[j][k].ubirthday.split(' ')[0] + '">' +
              '</td>' +
              '<td class="complaint td text-center" data-complaint="' + result[j][k].complaint + '">' +
                '<span class="complaint-text">' + result[j][k].complaint + '</span>' +
                '<input class="complaint-input text-center" type="hidden" placeholder="' + result[j][k].complaint + '" value="' + result[j][k].complaint + '">' +
              '</td>' +
              '<td class="department td text-center" data-department="' + result[j][k].department_id + '">' +
                '<span class="department-text">' + department_id + '</span>' +
                '<input class="department-input text-center" type="hidden" placeholder="' + department_id + '" value="' + department_id + '">' +
              '</td>' +
              '<td class="phone td text-center" data-phone="' + result[j][k].utel + '">' +
                '<span class="phone-text">' + result[j][k].utel + '</span>' +
                '<input class="phone-input text-center" type="hidden" placeholder="' + result[j][k].utel + '" value="' + result[j][k].utel + '">' +
              '</td>' +
              '<td class="edit td text-center">' +
                '<div class="edit-before">' +
                  '<span class="edit-before-update"></span>' +
                  '<span class="edit-before-delete"></span>' +
                '</div>' +
                '<div class="edit-after hidden">' +
                  '<span class="edit-after-confirm">修改</span>' +
                '</div>' +
              '</td>' +
              '<td class="data-group hidden">' +
                '<span class="data-number">' + result[j][k].number + '</span>' +
                '<span class="data-name">' + result[j][k].uname + '</span>' +
                '<span class="data-birthplace">' + result[j][k].birthplace + '</span>' +
                '<span class="data-certificate">' + result[j][k].certificate + '</span>' +
                '<span class="data-createDate">' + result[j][k].createDate.split(' ')[0] + '</span>' +
                '<span class="data-cust_count">' + result[j][k].cust_count + '</span>' +
                '<span class="data-entryTime">' + entryTime + '</span>' +
                '<span class="data-idcode">' + result[j][k].idcode + '</span>' +
                '<span class="data-remark">' + result[j][k].remark + '</span>' +
              '</td>' +
            '</tr>';

          // 向每一页中渲染 10 条数据
          $( $('.pagination-content-page')[j] ).find('tbody').append(page_html);
        }
      }

      // 加载分页器
      pagination.initModule( $('.ora-user-mentor-comployee .comployee-pagination') );

      // 初始化 导师 结构样式
      initStyle.mentor({
        $number        : $('.pagination-content tbody tr td.number'),
        $name          : $('.pagination-content tbody tr td.name'),
        $sex           : $('.pagination-content tbody tr td.sex'),
        $superior      : $('.pagination-content tbody tr td.superior'),
        $birthday      : $('.pagination-content tbody tr td.birthday'),
        $complaint     : $('.pagination-content tbody tr td.complaint'),
        $department_id : $('.pagination-content tbody tr td.department'),
        $phone         : $('.pagination-content tbody tr td.phone'),
        $edit          : $('.pagination-content tbody tr td.edit')
      });

      if (fn) {
        fn({
          $edit_mentor   : $('.pagination-content .edit-before-update'),
          $update_mentor : $('.pagination-content .edit-after-confirm'),
          $delete_mentor : $('.pagination-content .edit-before-delete'),
          mentor_data    : result
        });
      }

    };
    // End : Admin.renderMentorList()

    // Start : Admin.majordomoModal()
    // des   : 显示总监信息模态框
    // args  : Admin.getMajordomoData() 获取的后台数据 data
    //
    this.majordomoModal = function (majordomo_data) {

      var
        $modal_title       = $('.majordomo-info .modal-box-title'),
        $modal_number      = $('.majordomo-content-item-number'),
        $modal_uname       = $('.majordomo-content-item-uname'),
        $modal_birthplace  = $('.majordomo-content-item-birthplace'),
        $modal_certificate = $('.majordomo-content-item-certificate'),
        $modal_create_date = $('.majordomo-content-item-create_date'),
        $modal_cust_count  = $('.majordomo-content-item-cust_count'),
        $modal_entry_time  = $('.majordomo-content-item-entry_time'),
        $modal_id_code     = $('.majordomo-content-item-id_code'),
        $modal_remark      = $('.majordomo-content-item-remark'),
        cust_count,

        // 格式化 创建时间 字段
        createDate = majordomo_data[0].createDate.split(' ')[0],
        // 格式化 入职时间 字段
        entryTime = majordomo_data[0].entryTime.split(' ')[0]
      ;

      // 显示总监信息模态框
      $('.ora-user-mentor-zj .name-text').unbind('click').click(function () {
        var this_line = $(this).parent().parent();

        majordomoModal.showModal();

        // 模态框标题
        $modal_title.text( $(this).text() + '的个人信息' );

        // 员工编号
          $modal_number.find('span:last-child').text( this_line.find('.employee_number-text').text() );

        // 姓名
        $modal_uname.find('span:last-child').text( this_line.find('.name-text').text() );

        // 籍贯
        $modal_birthplace.find('span:last-child').text(majordomo_data[0].birthplace);

        // 资质证书
        $modal_certificate.find('span:last-child').text(majordomo_data[0].certificate);

        // 创建时间
        $modal_create_date.find('span:last-child').text(createDate);

        // 学员数
        $modal_cust_count.find('span:last-child').text(majordomo_data[0].cust_count);

        // 入职时间
        $modal_entry_time.find('span:last-child').text(entryTime);

        // 身份证号
        $modal_id_code.find('span:last-child').text(majordomo_data[0].idcode);

        // 备注
        $modal_remark.find('span:last-child').text(majordomo_data[0].remark);
      });
    };
    // End : Admin.getMajordomoData()

    // Start : Admin.directorModal()
    // des   : 总监信息模态框
    // args  : Admin.getDirectorData() 获取的后台数据 data
    //
    this.directorModal = function (director_data) {
      var
        $modal_title       = $('.majordomo-info .modal-box-title'),
        $modal_number      = $('.majordomo-content-item-number'),
        $modal_uname       = $('.majordomo-content-item-uname'),
        $modal_birthplace  = $('.majordomo-content-item-birthplace'),
        $modal_certificate = $('.majordomo-content-item-certificate'),
        $modal_create_date = $('.majordomo-content-item-create_date'),
        $modal_cust_count  = $('.majordomo-content-item-cust_count'),
        $modal_entry_time  = $('.majordomo-content-item-entry_time'),
        $modal_id_code     = $('.majordomo-content-item-id_code'),
        $modal_remark      = $('.majordomo-content-item-remark'),
        cust_count,

        // 格式化 创建时间 字段
        createDate = director_data[0].createDate.split(' ')[0],
        // 格式化 入职时间 字段
        entryTime = director_data[0].entryTime.split(' ')[0]
      ;

      // 显示主管信息模块狂
      $('.department-list .name-text').unbind('click').click(function () {
        var this_line = $(this).parent().parent();

        majordomoModal.showModal();

        // 模态框标题
        $modal_title.text( $(this).text() + '的个人信息' );

        // 员工编号
        $modal_number.find('span:last-child').text( this_line.find('.number-text').text() );

        // 姓名
        $modal_uname.find('span:last-child').text( this_line.find('.name-text').text() );

        // 籍贯
        $modal_birthplace.find('span:last-child').text(director_data[0].birthplace);

        // 资质证书
        $modal_certificate.find('span:last-child').text(director_data[0].certificate);

        // 创建时间
        $modal_create_date.find('span:last-child').text(createDate);

        // 学员数
        $modal_cust_count.find('span:last-child').text(director_data[0].cust_count);

        // 入职时间
        $modal_entry_time.find('span:last-child').text(entryTime);

        // 身份证号
        $modal_id_code.find('span:last-child').text(director_data[0].idcode);

        // 备注
        $modal_remark.find('span:last-child').text(director_data[0].remark);
      });
    };
    // End : Admin.directorModal()

    // Start : Admin.mentorModal()
    // des   : 总监信息模态框
    // args  : Admin.getMentorData() 获取的后台数据 data
    //
    this.mentorModal = function () {
      var
        $modal_title       = $('.majordomo-info .modal-box-title'),
        $modal_number      = $('.majordomo-content-item-number'),
        $modal_uname       = $('.majordomo-content-item-uname'),
        $modal_birthplace  = $('.majordomo-content-item-birthplace'),
        $modal_certificate = $('.majordomo-content-item-certificate'),
        $modal_create_date = $('.majordomo-content-item-create_date'),
        $modal_cust_count  = $('.majordomo-content-item-cust_count'),
        $modal_entry_time  = $('.majordomo-content-item-entry_time'),
        $modal_id_code     = $('.majordomo-content-item-id_code'),
        $modal_remark      = $('.majordomo-content-item-remark')
      ;



      $('.pagination-content .name-text').unbind('click').click(function () {
        var
          this_line = $(this).parent().parent()
        ;

        majordomoModal.showModal();

        // 模态框标题
        $modal_title.text( $(this).text() + '的个人信息' );

        // 员工编号
        $modal_number.find('span:last-child').text( this_line.find('.number-text').text() );

        // 姓名
        $modal_uname.find('span:last-child').text( this_line.find('.name-text').text() );

        // 籍贯
        $modal_birthplace.find('span:last-child').text( this_line.find('.data-birthplace').text() );

        // 资质证书
        $modal_certificate.find('span:last-child').text( this_line.find('.data-certificate').text() );

        // 创建时间
        $modal_create_date.find('span:last-child').text( this_line.find('.data-createDate').text() );

        // 学员数
        $modal_cust_count.find('span:last-child').text( this_line.find('.data-cust_count').text() );

        // 入职时间
        $modal_entry_time.find('span:last-child').text( this_line.find('.data-entryTime').text() );

        // 身份证号
        $modal_id_code.find('span:last-child').text( this_line.find('.data-idcode').text() );

        // 备注
        $modal_remark.find('span:last-child').text( this_line.find('.data-remark').text() );
      });
    };
    // End : Admin.getMentorData()

    // Start : Admin.editMentor()
    // des   : 修改导师信息。导师列表渲染完成后调用此方法。
    //
    this.editMentor = function (ele_map) {
      var
        admin           = new Admin(),
        customerService = new CustomerService(),
        $edit_mentor    = ele_map.$edit_mentor,
        $update_mentor  = ele_map.$update_mentor,
        $delete_mentor  = ele_map.$delete_mentor,
        customerModal      = new Modal($('.adduser-modal.updateuser-modal'), {
          width       : 822,
          height      : 477,
          titleHeight : 50
        })
      ;

      if (stateMap.userinfo_map.position === 5) {
        customerService.updateMentorInfo({
          $edit_mentor   : $edit_mentor,
          $update_mentor : $update_mentor,
          $delete_mentor : $delete_mentor
        });
        return false;
      }

      // 修改导师信息
      $edit_mentor.unbind('click').click(function () {
        var
          $this_line     = $(this).parent().parent().parent(),  // 当前行
          $number        = $this_line.find('td.number'),        // 员工编号
          $name          = $this_line.find('td.name'),          // 姓名
          $sex           = $this_line.find('td.sex'),           // 性别
          $superior      = $this_line.find('td.superior'),      // 上级领导
          $birthday      = $this_line.find('td.birthday'),      // 生日
          $department_id = $this_line.find('td.department'),    // 部门
          $phone         = $this_line.find('td.phone')          // 联系电话
        ;

        // 按钮样式
        $(this).parent().hide();
        $(this).parent().siblings('div').removeClass('hidden');

        // 员工编号
        $number.find('.number-text').addClass('hidden')
          .siblings('input').attr('type', 'text');

        // 姓名
        $name.find('.name-text').addClass('hidden')
          .siblings('input').attr('type', 'text');

        // 性别
        $sex.find('.sex-text').addClass('hidden')
          .siblings('input').attr('type', 'text');

        // 上级领导
        $superior.find('.superior-text').addClass('hidden')
          .siblings('input').attr('type', 'text');

        // 生日
        $birthday.find('.birthday-text').addClass('hidden')
          .siblings('input').attr('type', 'text');

        // 部门
        $department_id.find('.department-text').addClass('hidden')
          .siblings('input').attr('type', 'text');

        // 联系电话
        $phone.find('.phone-text').addClass('hidden')
          .siblings('input').attr('type', 'text');
      });

      // 提交导师信息
      $update_mentor.unbind('click').click(function () {
        var
          $this_line     = $(this).parent().parent().parent(),  // 当前行
          $number        = $this_line.find('td.number'),        // 员工编号
          $name          = $this_line.find('td.name'),          // 姓名
          $sex           = $this_line.find('td.sex'),           // 性别
          $superior      = $this_line.find('td.superior'),      // 上级领导
          $birthday      = $this_line.find('td.birthday'),      // 生日
          $department_id = $this_line.find('td.department'),    // 部门
          $phone         = $this_line.find('td.phone'),         // 联系电话
          department_id
        ;

        // 格式化 department_id (部门)
        switch ( $department_id.find('input').val() ) {
          case '导师一部' :
            department_id = 1;
            break;
          case '导师二部' :
            department_id = 2;
            break;
          default :
            break;
        }

        admin.updateInfo({
          number        : parseInt( $number.find('input').val(), 10 ),  // 员工编号
          uname         : $name.find('input').val(),
          usex          : $sex.find('input').val(),
          supperior     : $superior.find('input').val(),
          ubirthday     : $birthday.find('input').val(),
          department_id : department_id,
          utel          : $phone.find('input').val(),
          uid           : parseInt( $this_line.attr('data-uid'), 10 )
        }, { $this_line : $this_line }, function (send_info) {
          // 格式化 department_id (部门)
          switch (department_id) {
            case 1 :
              department_id = '导师一部';
              break;
            case 2 :
              department_id = '导师二部';
              break;
            default :
              break;
          }

          // 按钮样式
          $this_line.find('.edit-before').show();
          $this_line.find('.edit-after').addClass('hidden');

          // 员工编号
          $this_line.find('.number-text').text(send_info.number).removeClass('hidden')
            .siblings('.number-input').attr('type', 'hidden')
              .attr('placeholder', send_info.number)
              .val(send_info.number)
            .parent().attr('data-number', send_info.number);

          // 姓名
          $this_line.find('.name-text').text(send_info.uname).removeClass('hidden')
            .siblings('.name-input').attr('type', 'hidden')
              .attr('placeholder', send_info.uname)
              .val(send_info.uname)
            .parent().attr('data-name', send_info.uname);

          // 性别
          $this_line.find('.sex-text').text(send_info.usex).removeClass('hidden')
            .siblings('.sex-input').attr('type', 'hidden')
              .attr('placeholder', send_info.usex)
              .val(send_info.usex)
            .parent().attr('data-sex', send_info.usex);

          // 上级领导
          $this_line.find('.superior-text').text(send_info.supperior).removeClass('hidden')
            .siblings('.superior-input').attr('type', 'hidden')
              .attr('placeholder', send_info.supperior)
              .val(send_info.supperior)
            .parent().attr('data-superior', send_info.supperior);

          // 生日
          $this_line.find('.birthday-text').text(send_info.ubirthday).removeClass('hidden')
            .siblings('.birthday-input').attr('type', 'hidden')
              .attr('placeholder', send_info.ubirthday)
              .val(send_info.ubirthday)
            .parent().attr('data-birthday', send_info.ubirthday);

          // 部门
          $this_line.find('.department-text').text(department_id).removeClass('hidden')
            .siblings('.department-input').attr('type', 'hidden')
              .attr('placeholder', department_id)
              .val(department_id)
            .parent().attr('data-department', send_info.department_id);

          // 联系电话
          $this_line.find('.phone-text').text(send_info.utel).removeClass('hidden')
            .siblings('.phone-input').attr('type', 'hidden')
              .attr('placeholder', send_info.utel)
              .val(send_info.utel)
            .parent().attr('data-phone', send_info.utel);

        });
      });

      // 删除导师
      $delete_mentor.unbind('click').click(function () {
        var
          deleteuserModal = new Modal($('.deleteuser-modal'), {
            width       : 300,
            height      : 150,
            titleHeight : 40
          }),
          this_line = $(this).parent().parent().parent()
        ;

        deleteuserModal.showModal();

        // 显示删除用户警告模态框
        $('.ora-deleteuser-content-btn .modal-btn-confirm').unbind('click').click(function () {
          deleteuserModal.hideModal();
          admin.deleteUser(
            { uid : parseInt(this_line.attr('data-uid'), 10) },
            function () { $(this_line).remove(); }
          );
        });

        // 隐藏删除用户警告模态框
        $('.ora-deleteuser-content-btn .modal-btn-cancel').unbind('click').click(function () {
          deleteuserModal.hideModal();
        });

        // 隐藏删除用户警告模态框
        $('.deleteuser-modal .modal-box-close').unbind('click').click(function () {
          deleteuserModal.hideModal();
        });

      });

    };
    // End : Admin.editMentor()

    // Start : Admin.onClick()
    // des   : 点击事件处理程序
    //
    this.onClick = function () {
      var
        admin            = new Admin(),
        $majordomo       = $('.ora-user-mentor-zj'),
        $department      = $('.ora-user-mentor-department'),
        $delete_director = $department.find('.edit-before-delete'),
        $department_tab  = jqueryMap.$department.find('.department-tab'),
        customerModal    = new Modal($('.adduser-modal.updateuser-modal'), {
          width       : 822,
          height      : 400,
          titleHeight : 50
        })
      ;

      // 点击总监列表中的修改按钮, 弹出修改总监信息的模态框
      $majordomo.find('span.edit').unbind().click(function () {
        var
          $close_modal = $('.adduser-modal.updateuser-modal .modal-box-close'),      // 关闭模态框按钮
          $update_btn  = $('.adduser-modal.updateuser-modal .modal-button-confirm'), // 提交按钮
          $this_line   = $(this).parent().parent(),                                  // 修改按钮所在行
          send_info, entryTime
        ;

        // 显示修改总监信息的模态框
        customerModal.showModal();

        // 总监无分部信息
        $('.ora-updateuser-content-department').hide();
        // 不可修改被投诉次数字段
        $('.ora-updateuser-content-complaint').hide();

        // 将当前总监信息渲染到模态框中
        // 模态框标题
        $('.updateuser-modal .modal-box-title')
          .text($this_line.find('.majordomo-data .majordomo-name').text() + '的个人信息');
        // 用户编号
        $('.ora-updateuser-content-number input')
          .val($this_line.find('.majordomo-data .majordomo-number').text());
        // 姓名
        $('.ora-updateuser-content-name input')
          .val($this_line.find('.majordomo-data .majordomo-name').text());
        // 入职时间
        $('.ora-updateuser-content-entry_time input')
          .val($this_line.find('.majordomo-data .majordomo-entry_time').text());
        // 上级领导
        $('.ora-updateuser-content-superior input')
          .val($this_line.find('.majordomo-data .majordomo-superior').text());
        // 被投诉次数
        $('.ora-updateuser-content-complaint input')
          .val($this_line.find('.majordomo-data .majordomo-complaint').text());
        // 备注
        $('.ora-updateuser-content-remark textarea')
          .text($this_line.find('.majordomo-data .majordomo-remark').text());

        // 点击模态框右上角的关闭按钮, 关闭模态框, 列表中的总监信息不变
        $close_modal.unbind('click').click(function () {
          // 关闭模态框
          customerModal.hideModal();
        });

        // 点击提交按钮, 更新总监信息并关闭模态框
        // 总监信息修改成功后, 关闭模态框并将模态框中的值更新到列表中
        // 若总监休息修改失败, 关闭模态框, 列表中的总监信息不变
        $update_btn.unbind('click').click(function () {
          admin.updateInfo({
            uid           : parseInt($this_line.attr('data-uid'), 10),
            number        : parseInt($('.ora-updateuser-content-number input').val(), 10),
            uname         : $('.ora-updateuser-content-name input').val(),
            entryTime     : $('.ora-updateuser-content-entry_time input').val(),
            supperior     : $('.ora-updateuser-content-superior input').val(),
            remark        : $('.ora-updateuser-content-remark textarea').val()
          }, { $this_line : $this_line }, function (send_info) {
            // 关闭模态框
            customerModal.hideModal();

            // 更新列表中总监信息(刷新页面);
            setTimeout('window.location.reload();', 500);
          });
        });
      });

      // 点击主管列表中的修改按钮, 弹出修改主管信息的模态框
      $department.find('span.edit-before-update').unbind('click').click(function () {
        var
          admin        = new Admin(),
          $close_modal = $('.adduser-modal.updateuser-modal .modal-box-close'),      // 关闭模态框按钮
          $update_btn  = $('.adduser-modal.updateuser-modal .modal-button-confirm'), // 提交按钮
          $this_line   = $(this).parent().parent().parent(),
          department
        ;

        // 显示修改主管信息的模态框
        customerModal.showModal();

        // 主管有分部信息
        $('.ora-updateuser-content-department').show();
        // 不可修改被投诉次数字段
        $('.ora-updateuser-content-complaint').hide();

        // 判断所在分部
        switch ( $this_line.find('.director-data-department').text() ) {
          case '1' :
            department = '导师一部';
            break;
          case '2' :
            department = '导师二部';
            break;
          case '3' :
            department = '导师三部';
            break;
          default :
            break;
        }

        // 将当前主管信息渲染到模态框
        // 模态框标题
        $('.updateuser-modal .modal-box-title')
          .text($this_line.find('.director-data-name').text() + '的个人信息');
        // 用户编号
        $('.ora-updateuser-content-number input')
          .val($this_line.find('.director-data-number').text());
        // 姓名
        $('.ora-updateuser-content-name input')
          .val($this_line.find('.director-data-name').text());
        // 入职时间
        $('.ora-updateuser-content-entry_time input')
          .val($this_line.find('.director-data-entry_time').text());
        // 分部
        $('.ora-updateuser-content-department input').val(department);
        // 上级领导
        $('.ora-updateuser-content-superior input')
          .val($this_line.find('.director-data-superior').text());
        // 被投诉次数
        $('.ora-updateuser-content-complaint input')
          .val($this_line.find('.director-data-complaint').text());
        // 备注
        $('.ora-updateuser-content-remark textarea')
          .text($this_line.find('.director-data-remark').text());

        // 点击提交按钮, 更新主管信息并关闭模态框
        // 主管信息修改成功后, 关闭模态框并将模态框中的值更新到列表中
        // 若主管信息修改失败, 关闭模态框, 列表中的主管信息不变
        $update_btn.unbind('click').click(function () {
          // 判断分部
          console.log( $('.ora-updateuser-content-department input').val() );
          switch ( $('.ora-updateuser-content-department input').val() ) {
            case '导师一部' :
              department = 1;
              break;
            case '导师二部' :
              department = 2;
              break;
            case '导师三部' :
              break;
            default :
              break;
          }

          admin.updateInfo({
            uid           : parseInt($this_line.attr('data-uid'), 10),
            number        : parseInt($('.ora-updateuser-content-number input').val(), 10),
            uname         : $('.ora-updateuser-content-name input').val(),
            department_id : department,
            entryTime     : $('.ora-updateuser-content-entry_time input').val(),
            supperior     : $('.ora-updateuser-content-superior input').val(),
            remark        : $('.ora-updateuser-content-remark textarea').val()
          }, { $this_line : $this_line }, function () {
            // 关闭模态框
            customerModal.hideModal();

            // 更新列表中主管信息(刷新页面, 获取最新数据)
            setTimeout('window.location.reload();', 500);
          });
        });

        // 点击模态框右上角的关闭按钮, 关闭模态框, 列表中的主管信息不变
        $close_modal.unbind('click').click(function () {
          // 关闭模态框
          customerModal.hideModal();
        });
      });

      // 切换部门
      $department_tab.unbind('click').click(function (event) {
        var target = event.target || window.event.target,
          index  = $(target).index() + 1;

        switch (target) {
          case $department_tab.find('th')[0] :  // 导师一部
            $(target).addClass('active').siblings('th').removeClass('active');
            admin.getDirectorData({ department_id : parseInt(index, 10) });
            admin.getMentorData({ department_id : parseInt(index, 10) });
            $.uriAnchor.setAnchor({ page :1 });
            break;
          case $department_tab.find('th')[1] :  // 导师二部
            $(target).addClass('active').siblings('th').removeClass('active');
            admin.getDirectorData({ department_id : parseInt(index, 10) });
            admin.getMentorData({ department_id : parseInt(index, 10) });
            $.uriAnchor.setAnchor({ page :1 });
            break;
          default:
            break;
        }
      });

      // 删除主管信息
      $delete_director.unbind('click').click(function () {
        var
          deleteuserModal = new Modal($('.deleteuser-modal'), {
            width       : 300,
            height      : 150,
            titleHeight : 40
          }),
          uid = $(this).parent().parent().parent().attr('data-uid')
        ;

        deleteuserModal.showModal();

        // 显示删除用户警告模态框
        $('.ora-deleteuser-content-btn .modal-btn-confirm').unbind('click').click(function () {
          deleteuserModal.hideModal();
          admin.deleteUser({ uid : parseInt(uid, 10) }, function () {
            $('.department-list').addClass('hidden');
          });
        });

        // 隐藏删除用户警告模态框
        $('.ora-deleteuser-content-btn .modal-btn-cancel').unbind('click').click(function () {
          deleteuserModal.hideModal();
        });

        // 隐藏删除用户警告模态框
        $('.deleteuser-modal .modal-box-close').unbind('click').click(function () {
          deleteuserModal.hideModal();
        });

      });

    };
    // End : 点击事件处理程序(总监)

  };
  // End : Admin()

  // Start : Majordomo()
  // des   : 总监登陆
  //
  Majordomo = function () {
    console.log('总监登陆~');
  };
  // End : Majordomo()

  // Start : Director()
  // des   : 主管登陆
  //
  Director = function () {
    // 隐藏部门及主管信息
    $('.department-tab').remove();
    $('.department-list').remove();
  };
  // End : Director()

  // Start : checkPosition()
  // des   : 检查当前登录人职位
  //
  checkPosition = function (userinfo_map) {
    var
      mentor_position  = userinfo_map.position,
      admin, majordomo, director, customerService
    ;
    
    switch (mentor_position) {
      case 0 :  // 实习导师
        window.location.href = 'toCustomer';
        break;
      case 1 :  // 导师
        window.location.href = 'toCustomer';
        break;
      case 2 :  // 主管
        jqueryMap.$zj.remove();  // 移除 总监 个人信息
        // 主管登陆调用 Director() 方法
        // 该方法用于发起 ajax 请求并渲染请求的数据到页面
        director = new Director();
        admin = new Admin();
        admin.getMentorData({ department_id : userinfo_map.department_id });  // 获取对应部门的导师数据
        admin.onClick();
        break;
      case 3 :  // 总监
        jqueryMap.$zj.remove();  // 移除 总监 个人信息
        // 总监登陆调用 Majordomo() 方法
        // 该方法用于发起 ajax 请求并渲染请求的数据到页面
        majordomo = new Majordomo();
        admin = new Admin();
        admin.getDirectorData({ department_id : 1 });  // 获取对应部门的主管数据
        admin.getMentorData({ department_id : 1 });    // 获取对应部门的导师数据
        admin.onClick();
        break;
      case 4 :  // 超级管理员
        // 超级管理员登陆调用 Admin() 方法
        // 该方法用于发起 ajax 请求并渲染请求的数据到页面
        admin = new Admin();
        admin.getMajordomoData();                      // 获取总监信息
        admin.getDirectorData({ department_id : 1 });  // 获取对应部门的主管数据
        admin.getMentorData({ department_id : 1 });    // 获取对应部门的导师数据
        admin.onClick();
        break;
      case 5 :
        admin = new Admin();
        customerService = new CustomerService();

        admin.getMajordomoData();                      // 获取总监信息
        admin.getDirectorData({ department_id : 1 });  // 获取对应部门的主管数据
        admin.getMentorData({ department_id : 1 });    // 获取对应部门的导师数据

        customerService.initStyle();
        customerService.onClick({
          department_id   : 1,
          mentor_position : userinfo_map.position
        });
      default:
        break;
    }
    return mentor_position;
  };
  // End : checkPosition()

  // Start : initModule()
  // des   : 初始化模块
  //
  initModule = function ($user, userinfo_map) {
    stateMap.$user = $user;
    stateMap.userinfo_map = userinfo_map;
    setJqueryMap();

    checkPosition(userinfo_map);
  };
  // End : initModule()

  // 导出公开模块
  return { initModule : initModule };
}());
