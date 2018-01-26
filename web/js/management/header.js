/*
 * @file name : header.js
 * @author    : smpower
 * @email     : bzsjxhywrf@outlook.com
 * @github    : https://github.com/smpower/
 * header 模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, header */

var header = (function () {
  var
    configMap = {
      menu_extend_width    : 100,
      menu_extend_height   : 123,
      menu_retract_width   : 0,
      menu_retract_height  : 0,
      menu_extend_time     : 300,
      menu_retract_time    : 300,
      triangle_toggle_time : 300,
      modal : {
        show         : 'block',
        hide         : 'none',
        show_opacity : .5,
        hide_opacity : 0,
        show_time    : 250,
        hide_time    : 250
      }
    },
    stateMap = {
      $header           : null,
      is_menu_retracted : true,
      data              : null,
      arg_map           : null,
      personal_info_map : {}
    },
    jqueryMap = {},

    setJqueryMap,     togglePersonInfo, getData,            showModal,
    hideModal,        setData,          changePersonalData, updatePersonInfo,
    onClick,          initModule
	;

  // 缓存 jQuery 集合
  setJqueryMap = function () {
    var $header, $modal;

    $header = stateMap.$header;
    $personinfo  = stateMap.$personinfo;

    jqueryMap = {
      $header      : $header,
      $info        : $header.find('.ora-header-info'),
      $menu        : $header.find('.ora-header-menu'),
      $personinfo  : $header.find('.ora-header-menu span:first-child'),
      $performance : $header.find('.ora-header-menu span:nth-child(2)'),
      $chart       : $header.find('.ora-header-menu .menu-chart'),
      $triangle    : $header.find('.ora-header-info-triangle')
    };
  };

  // Start  : togglePersonInfo()
  // des    : 鼠标悬停在个人按钮上时，显示下拉菜单
  // return :
  //   * true  - 菜单已展开
  //   * false - 菜单未展开
  //
  togglePersonInfo = function (do_extend, callback) {
    var
      px_menu_ht = jqueryMap.$menu.height(),
      is_open    = px_menu_ht === configMap.menu_extend_height,
      is_closed  = px_menu_ht === configMap.menu_retract_height,
      is_sliding = !is_open && !is_closed;

    if (is_sliding) { return false; }

    // menu_state : false - 弹出菜单
    if (do_extend){
      // 弹出菜单
      jqueryMap.$menu.animate(
        {
          width   : configMap.menu_extend_width,
          height  : configMap.menu_extend_height,
          opacity : 1
        },
        configMap.menu_extend_time,
        function () {
          stateMap.is_menu_retracted = false;
          if (callback) { callback({}); }
        }
      );

      // 按钮状态
      jqueryMap.$triangle.css(
        {
          'transform' : 'rotate(180deg)',
          '-ms-transform' : 'rotate(180deg)',      // Internet Explorer
          '-moz-transform' : 'rotate(180deg)',     // Firefox
          '-webkit-transform' : 'rotate(180deg)',  // Safari 和 Chrome
          '-o-transform' : 'rotate(180deg)'        // Opera
        },
        configMap.triangle_toggle_time
      );
      return true;
    }

    // menu_state : true - 收起菜单
      jqueryMap.$menu.animate(
        {
          width   : configMap.menu_retract_width,
          height  : configMap.menu_retract_height,
          opacity : 0
        },
        configMap.menu_retract_time,
        function () {
          stateMap.is_menu_retracted = true;
          if (callback) { callback({}); }
        }
      );

      // 按钮状态
      jqueryMap.$triangle.css(
        {
          'transform' : 'rotate(0)',
          '-ms-transform' : 'rotate(0)',      // Internet Explorer
          '-moz-transform' : 'rotate(0)',     // Firefox
          '-webkit-transform' : 'rotate(0)',  // Safari 和 Chrome
          '-o-transform' : 'rotate(0)'        // Opera
        },
        configMap.triangle_toggle_time
      );
      return true;

  };
  // End : togglePersonInfo()

  // Start : showModal()
  // des   : 显示模态框
  //
  showModal = function (data, arg_map) {
    var key_name, $personinfo;

    for (key_name in arg_map) {
      if (arg_map.hasOwnProperty(key_name)) {
        $personinfo = arg_map.$personinfo;
      }
    }

    // 模态框根容器
    $('.ora-personinfo').css({ display : 'flex' });

    // 模态层
    $('.ora-personinfo').find('.ora-personinfo-modal').css({display : configMap.modal.show});
    $('.ora-personinfo').find('.ora-personinfo-modal').animate(
      { opacity : configMap.modal.show_opacity },
      configMap.modal.show_time,
      function () {
        // 模态框
        $('.ora-personinfo').find('.ora-personinfo-content').css({display : 'flex'});
        $('.ora-personinfo').find('.ora-personinfo-content').animate(
          { opacity : 1, top : 0 },
          configMap.modal.show_time
        );
      }
    );

  };
  // End : showModal()

  // Start : hideModal()
  // des   : 隐藏模态框
  //
  hideModal = function (callback) {
    // 模态框
    $personinfo.find('.ora-personinfo-content').animate(
      { opacity : 0, top : -100 },
      configMap.modal.hide_time,
      function () {
        $personinfo.find('.ora-personinfo-content').css({display : configMap.modal.hide});

        // 模态层
        $personinfo.find('.ora-personinfo-modal').animate(
          { opacity : configMap.modal.hide_opacity },
          configMap.modal.hide_time,
          function () {
          $personinfo.find('.ora-personinfo-modal').css({display : configMap.modal.hide});
            // 模态框根容器
            $personinfo.css({ display : configMap.modal.hide });
            if (callback) { callback(); }
          }
        );
      }
    );
  };
  // End : hideModal()

  // Start : getData()
  // des   :
  //   * 请求个人详细资料
  //   * 调用 showModal() 显示模态框
  //
  getData = function (arg_map) {
    var uid = stateMap.uid;
    $.ajax({
      type         : 'post',
      url          : 'aboutme',
      data         : JSON.stringify({uid : stateMap.uid}),
      contentType : 'application/json;charset=UTF-8',
      jsonType    : 'json',
      success      : function (data) {
        setData(data, arg_map, showModal(data, arg_map));
        stateMap.data = data;
        stateMap.arg_map = arg_map;
      },
      error : function (error) {
        alert('个人信息请求失败！')
      }
    });
  };
  // End : getData()

  // Start : setData()
  // des   : 渲染用户资料数据到页面模态框
  //
  setData = function (data, arg_map, callback) {
    var
      key_name, $info,
      $name,    $sex,         $address,  $birthday,   $idnum,        $phone,
      $wechat,  $certificate, $password, $question,   question_text, $answer,  $position,
      $mark,    $jointime,    $students, $complaints, $remark,       $createtime,
      $updatetime
    ;

    $info = $('.ora-personinfo-content-main');
    $name = $info.find('.ora-personinfo-content-main-item-name');
    $sex = $info.find('.ora-personinfo-content-main-item-sex');
    $address = $info.find('.ora-personinfo-content-main-item-address');
    $birthday = $info.find('.ora-personinfo-content-main-item-birthday');
    $idnum = $info.find('.ora-personinfo-content-main-item-idnum');
    $phone = $info.find('.ora-personinfo-content-main-item-phone');
    $wechat = $info.find('.ora-personinfo-content-main-item-wechat');
    $certificate = $info.find('.ora-personinfo-content-main-item-certificate');
    $password = $info.find('.ora-personinfo-content-main-item-password');
    $question = $info.find('.ora-personinfo-content-main-item-question');
    $answer = $info.find('.ora-personinfo-content-main-item-answer');
    $position = $info.find('.ora-personinfo-content-main-item-position');
    $mark = $info.find('.ora-personinfo-content-main-item-mark');
    $jointime = $info.find('.ora-personinfo-content-main-item-jointime');
    $students = $info.find('.ora-personinfo-content-main-item-students');
    $complaints = $info.find('.ora-personinfo-content-main-item-complaints');
    $remark = $info.find('.ora-personinfo-content-main-item-remark');
    $createtime = $info.find('.ora-personinfo-content-main-item-createtime');
    $updatetime = $info.find('.ora-personinfo-content-main-item-updatetime');

    for (key_name in data) {
      if (data.hasOwnProperty(key_name)) {
        // 空字段
        //   * 微信号   - uwechat
        //   * 资质证书 - certificate
        //   * 籍贯     - address
        //   * 入职时间 - jointime
        //   * 备注     - remark

        // 显示密保问题时, 不显示数字而是文字形式
        switch ( data.encrypted_id ) {
          case '1' :
            question_text = '对您影响最大的人的名字是？';
            break;
          case '2' :
            question_text = '您最熟悉的童年好友的名字是？';
            break;
          case '3' :
            question_text = '您最熟悉的学校宿舍室友名字是？';
            break;
          default :
            break;
        }

        $name.find('span:last-child').text(data.uname);
        $sex.find('span:last-child').text(data.usex);
        $address.find('span:last-child').text(data.birthplace);
        $birthday.find('span:last-child').text(data.ubirthday);
        $idnum.find('span:last-child').text(data.idcode);
        $phone.find('span:last-child').text(data.utel);
        $wechat.find('span:last-child').text(data.uwechat);
        $certificate.find('span:last-child').text(data.certificate);
        $password.find('span:last-child').text(data.password);
        $question.find('.question-answer').attr('data-question', data.encrypted_id);  // 1 2 3
        $question.find('.question-answer').text(question_text);
        $answer.find('span:last-child').text(data.encrypted_result);
        $position.find('span:last-child').text(data.position);
        $mark.find('span:last-child').text(data.number);
        $jointime.find('span:last-child').text(data.entryTime);
        $students.find('span:last-child').text(data.cust_count);
        $complaints.find('span:last-child').text(data.complaint);
        $createtime.find('span:last-child').text(data.createDate);
        $updatetime.find('span:last-child').text(data.updateDate);
        $remark.find('span:last-child').text(data.remark);
      }
    }


    // 显示模态框
    if (callback) { callback(); }
    // showModal(data, arg_map);
  };
  // End : setData()

  // Start : changePersonalData()
  // des   : 修改个人资料
  //
  changePersonalData = function () {
    var
      $info,          $item,          $remark,
      $password,      $position,      $students,
      $complaints,    $createtime,    $updatetime, $question,
      $btn_change,    $btn_submit,    $btn_back,
      remark_val,     password_val,   position_val,
      students_val,   complaints_val, createtime_val,
      updatetime_val, input,          detail,      i
    ;

    $info       = $('.ora-personinfo-content-main');
    $item       = $info.find('.item');
    $password   = $('.ora-personinfo-content-main-item-password');
    $position   = $('.ora-personinfo-content-main-item-position');
    $students   = $('.ora-personinfo-content-main-item-students');
    $complaints = $('.ora-personinfo-content-main-item-complaints');
    $createtime = $('.ora-personinfo-content-main-item-createtime');
    $updatetime = $('.ora-personinfo-content-main-item-updatetime');
    $question   = $('.ora-personinfo-content-main-item-question');
    $remark     = $('.ora-personinfo-content-main-item-remark');
    $btn_change = $('.modal-btn-change');
    $btn_submit = $('.modal-btn-submit');
    $btn_back   = $('.modal-btn-back');

    complaints_val = $complaints.find('input').val();
    createtime     = $createtime.find('input').val();
    updatetime     = $updatetime.find('input').val();
    remark         = $remark.find('input').val();

    for (i = 0; i < $item.length; i++) {
      // 获取第二个 span 的值 - 姓名：小王
      detail = $($item[i]).find('span:nth-child(2)').text();

      // 隐藏第二个 span
      $item.find('span:nth-child(2)').hide();

      // 动态创建 input 框
      $($item[i]).append('<input type="text" name="" value="'+ detail +'">');
    }

    // 限制不可修改的字段 - 这里可以大大地优化！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    //   * 密码不可修改
    $password.find('input').hide();
    $password.append(
      '<span>'+ $password.find('input').val() +'</span>'
    ).show();
    //   * 职位不可修改
    $position.find('input').hide();
    $position.append(
      '<span>'+ $position.find('input').val() +'</span>'
    );
    //   * 累计学员数
    $students.find('input').hide();
    $students.append(
      '<span>'+ $students.find('input').val() +'</span>'
    );
    //   * 被投诉次数
    $complaints.find('input').hide();
    $complaints.append(
      '<span>'+ $complaints.find('input').val() +'</span>'
    );
    //   * 创建时间
    $createtime.find('input').hide();
    $createtime.append(
      '<span>'+ $createtime.find('input').val() +'</span>'
    );
    //   * 更新时间
    $updatetime.find('input').hide();
    $updatetime.append(
      '<span>'+ $updatetime.find('input').val() +'</span>'
    );
    //   * 备注
    $remark.find('input').hide();
    $remark.append(
      '<span>'+ $remark.find('input').val() +'</span>'
    );

    //   * 性别 input 不可输入
    $info.find('.ora-personinfo-content-main-item-sex input')
      .attr('disabled', 'disabled');

    //   * 密保问题
    $info.find('.ora-personinfo-content-main-item-question input')
      .attr('disabled', 'disabled');

    // 动态切换提交按钮
    $btn_change
      .addClass('hidden')
      .siblings('button').removeClass('hidden');
  };
  // End : changePersonalData()

  // Start : updatePersonInfo()
  // des   : 更新用户详细资料信息
  //
  updatePersonInfo = function () {
    var
      $info,
      $name,       $sex,          $address,  $birthday,
      $idnum,      $phone,        $wechat,   $certificate,
      $question,   question_text, $answer,   $mark,        $jointime,
      $students,   $complaints,   info_map;

      $info        = $('.ora-personinfo-content-main');
      $name        = $info.find('.ora-personinfo-content-main-item-name');
      $sex         = $info.find('.ora-personinfo-content-main-item-sex');
      $address     = $info.find('.ora-personinfo-content-main-item-address');
      $birthday    = $info.find('.ora-personinfo-content-main-item-birthday');
      $idnum       = $info.find('.ora-personinfo-content-main-item-idnum');
      $phone       = $info.find('.ora-personinfo-content-main-item-phone');
      $wechat      = $info.find('.ora-personinfo-content-main-item-wechat');
      $certificate = $info.find('.ora-personinfo-content-main-item-certificate');
      $question    = $info.find('.ora-personinfo-content-main-item-question');
      $answer      = $info.find('.ora-personinfo-content-main-item-answer');
      $mark        = $info.find('.ora-personinfo-content-main-item-mark');
      $jointime    = $info.find('.ora-personinfo-content-main-item-jointime');
      $students    = $info.find('.ora-personinfo-content-main-item-students');
      $complaints  = $info.find('.ora-personinfo-content-main-item-complaints');
      info_map     = {
        uid              : stateMap.arg_map.uid,
        uname            : $name.find('input').val(),
        usex             : $sex.find('input').val(),
        birthplace       : $address.find('input').val(),
        ubirthday        : $birthday.find('input').val(),
        idcode           : $idnum.find('input').val(),
        utel             : $phone.find('input').val(),
        uwechat          : $wechat.find('input').val(),
        certificate      : $certificate.find('input').val(),
        encrypted_id     : $question.find('span:nth-child(2)').attr('data-question'),
        encrypted_result : $answer.find('input').val(),
        number           : $mark.find('input').val(),
        entryTime        : $jointime.find('input').val(),
        cust_count       : $students.find('input').val(),
        complaint        : $complaints.find('input').val(),
      };

      // 更新后的个人资料
      updateData = function (data) {
        if (data) {
          $info.find('input').remove();
          $info.find('span:nth-child(3)').remove();
          $info.find('span:nth-child(2)').css({ display : 'inline-block' });

          // 显示密保问题时, 由数字形式改为文字形式
          switch ( info_map.encrypted_id ) {
            case '1' :
              question_text = '对您影响最大的人的名字是？';
              break;
            case '2' :
              question_text = '您最熟悉的童年好友的名字是？';
              break;
            case '3' :
              question_text = '您最熟悉的学校宿舍室友名字是？';
              break;
            default :
              break;
          }

          // 姓名
          $name.find('span:nth-child(2)').text(info_map.uname);
          // 性别
          $sex.find('span:nth-child(2)').text(info_map.usex);
          // 籍贯
          $address.find('span:nth-child(2)').text(info_map.birthplace);
          // 出生日期
          $birthday.find('span:nth-child(2)').text(info_map.birthday);
          // 身份证号
          $idnum.find('span:nth-child(2)').text(info_map.idcode);
          // 联系电话
          $phone.find('span:nth-child(2)').text(info_map.utel);
          // 微信号
          $wechat.find('span:nth-child(2)').text(info_map.uwechat);
          // 资质证书
          $certificate.find('span:nth-child(2)').text(info_map.certificate);
          // 密保问题
          $question.find('span:nth-child(2)').text(question_text);
          // 密保答案
          $answer.find('span:nth-child(2)').text(info_map.encrypted_result);
          // 员工编号
          $mark.find('span:nth-child(2)').text(info_map.number);
          // 入职时间
          $jointime.find('span:nth-child(2)').text(info_map.entryTime);
          // 学员数量
          $students.find('span:nth-child(2)').text(info_map.cust_count);
          // 被投诉次数
          $complaints.find('span:nth-child(2)').text(info_map.complaint);

          // 动态切换提交按钮 - 显示修改按钮，隐藏另外两个按钮
          $('.ora-personinfo-content-btn button')
              .addClass('hidden')
              .siblings('.modal-btn-change').removeClass('hidden');
        } else {
          alert('个人资料更新失败！');
        }
      };

      $.ajax({
        type        : 'post',
        url         : 'updateme',
        data        : JSON.stringify(info_map),
        contentType : 'application/json;charset=UTF-8',
        dataType    : 'json',
        success     : function (data) {
          updateData(data);
        },
        error : function (error) {
          alert('请求服务器请求失败！');
        }
      });
  };
  // End : updatePersonInfo()

  onClick = function () {
    var $info, $btn, $item, $remark, input, detail;

    $info = $('.ora-personinfo-content-main');
    $btn  = $('.ora-personinfo-content-btn');

    // 点击登陆者姓名，弹出菜单
    jqueryMap.$info.click(function () {
      togglePersonInfo(stateMap.is_menu_retracted);
    });

    // 点击 '个人资料' 按钮
    jqueryMap.$personinfo.click(function () {
      togglePersonInfo(stateMap.is_menu_retracted, getData(stateMap));
    });

    // 点击叉号关闭个人详细资料模态框
    $btn.find('.icon-close').unbind('click').click(function () {
        var restore;

        restore = function () {
          setData(stateMap.data);
          $('.ora-personinfo-content-main span:nth-child(2)').show()
            .siblings('input').remove()
          $('.ora-personinfo-content-main span:nth-child(3)').remove();

          // 动态切换提交按钮
          $('.ora-personinfo-content-btn button')
            .addClass('hidden')
            .siblings('.modal-btn-change').removeClass('hidden');

          // 隐藏密保问题下拉菜单选择框
          $('.ora-personinfo-content-tips-questions').css({ display : 'none' });
        };

        hideModal(restore);
      });

    // 点击修改按钮修改个人详细资料
    $btn.find('.modal-btn-change').unbind('click').click(function () {
      changePersonalData();

      // 选择性别
      $('.ora-personinfo-content-main-item-sex').unbind('click').click(function chooseSex() {
        $('.ora-personinfo-content-tips-sex').css({ display : 'flex' });
      });
      // 性别选项
      $('.ora-personinfo-content-tips-sex span').unbind('click').click(function clickSex() {
        // 显示选择的性别
        $('.ora-personinfo-content-main-item-sex input')
          .val($(this).text());

        // 隐藏选择性别弹框
        $(this).parent().css({ display : 'none' });
      });

      // 选择密保问题
      $('.ora-personinfo-content-main-item-question').unbind('click').click(function chooseQuestion() {
        $('.ora-personinfo-content-tips-questions').css({ display : 'flex' });
      });
      // 密保问题选项
      $('.ora-personinfo-content-tips-questions span').unbind('click').click(function clickQuestion() {
        $('.ora-personinfo-content-tips-questions').css({ display : 'none' });
        // 保存对应问题的 id, 显示选择的密保问题
        $('.ora-personinfo-content-main-item-question .question-answer')
          .attr('data-question', $(this).attr('data-question'));

        // 显示选择的密保问题
        $('.ora-personinfo-content-main-item-question input')
          .val($(this).text());
      });
    });

    // 点击返回按钮，显示未修改过的个人详细信息资料
    $btn.find('.modal-btn-back').unbind('click').click(function () {
      setData(stateMap.data);
      $('.ora-personinfo-content-main span:nth-child(2)').show()
        .siblings('input').remove();
      $('.ora-personinfo-content-main span:nth-child(3)').remove();

      // 动态切换提交按钮
      $('.ora-personinfo-content-btn button')
        .addClass('hidden')
        .siblings('.modal-btn-change').removeClass('hidden');

      // 隐藏密保问题下拉菜单
      $('.ora-personinfo-content-tips-questions').css({ display : 'none' });
    });

    // 点击提交按钮，更新用户详细资料信息
    $btn.find('.modal-btn-submit').unbind('click').click(function () {;
      updatePersonInfo();
    });

    // 个人业绩按钮
    jqueryMap.$performance.unbind('click').click(function () {
      window.location.href = 'toPerformance';
    });

    // 点击"个人业绩图表"按钮
    jqueryMap.$chart.unbind('click').click(function () {
      console.log('打开"个人业绩图表"~');
    });
  };

  initModule = function (arg_map) {
    var key_name;

    for (key_name in arg_map) {
      if (arg_map.hasOwnProperty(key_name)) {
        stateMap.$header      = arg_map.$header;
        stateMap.$personinfo  = arg_map.$personinfo;
        stateMap.uid          = arg_map.uid;
      }
    }

    setJqueryMap();
    onClick();
  };

  return { initModule : initModule };
}());
