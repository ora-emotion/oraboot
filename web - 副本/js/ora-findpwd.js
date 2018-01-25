/*
 * ora-findpwd.js
 * 找回密码模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, findpwd */

var findpwd = (function () {
  var
    configMap = {
      wrapper : {
        height : 401
      },
      s01 : {
        top    : 44,
        opacity : 0
      },
      s02 : {
        top     : 0,
        opacity : 1
      },
      time : 500
    },
    stateMap = {
      $findpwd : null,
      uid      : null
    },
    jqueryMap = {},

    copyData, setJqueryMap, showTip, makeReq, changePassword, setPassword, onClick, initModule;

  copyData = function (uid) {
    return { uid : uid };
  };

  setJqueryMap = function () {
    var $findpwd = stateMap.$findpwd;

    jqueryMap = {
      $findpwd : $findpwd,
      $wrapper : $findpwd.find('.ora-findpwd-wrapper'),
      $tip     : $findpwd.find('.ora-findpwd-s01-tip'),
      $s01     : $findpwd.find('.ora-findpwd-s01'),
      $s02     : $findpwd.find('.ora-findpwd-s02'),
      $btn_s01 : $findpwd.find('.ora-findpwd-s01-submit button'),
      $btn_s02 : $findpwd.find('.ora-findpwd-s02-submit button'),
      $password : $findpwd.find('.ora-findpwd-s02-password')
    };
  };

  // Start : showTip()
  // des   : 密保问题验证失败时，显示提示信息
  //
  showTip = function () {
    var $tip = jqueryMap.$tip;
    $tip.addClass('active');
  };
  // End : showTip()

  // Start : changePassword()
  // des   : 验证密保通过后，显示重置密码页面
  //
  changePassword = function () {
    console.log('密保问题已确认，允许重置密码！');

    jqueryMap.$wrapper.animate(
      { height : configMap.wrapper.height },
      configMap.time
    );

    // 调整验证密保容器
    jqueryMap.$s01.animate(
      {
        top     : configMap.s01.top,
        opacity : configMap.s01.opacity
      },
      configMap.time
    );

    // 调整重置密码容器
    jqueryMap.$s02.addClass('active');
    jqueryMap.$s02.animate(
      {
        top     : configMap.s02.top,
        opacity : configMap.s02.opacity
      },
      configMap.time
    );

    jqueryMap.$s02.addClass('active');
  };
  // End : changePassword()

  //  Start : setPassword()
  //  des   : 设置密码
  //
  // setPassword = function (uid, password) {
  //     $.ajax({
  //       type    : 'post',
  //       url     : 'http://localhost:8080/setp',
  //       data : JSON.stringify({uid : uid, password : password}),
  //       contentType : "application/json;charset=UTF-8",
  //       dataType : "json",
  //       success : function (data) {
  //         if (data) {
  //           alert('重置密码成功 ^_^ ');
  //           window.location.href = 'http://localhost:8080/toLogin';
  //         } else {
  //           alert('重置密码失败！！！');
  //         }
  //       },
  //       error   : function (error) {
  //         alert('请求数据失败！！！！！！');
  //       }
  //     });
  // };
  // End : setPassword()

  // Start : makeReq()
  // des   : 请求验证密保答案
  //
  makeReq = function (loginname, encrypted_id, encrypted_result) {
    $.ajax({
      type    : 'post',
      url     : 'findp',
      data : JSON.stringify({loginname : loginname,encrypted_id : encrypted_id,encrypted_result : encrypted_result}),
      contentType : "application/json;charset=UTF-8",
      dataType : "json",
      success : function (data) {
        changePassword();
        $('.uid').val(data.uid);
      },
      error   : function (erroe) {
        showTip();
      }
    });
  };
  // End : makeReq()

  onClick = function () {
    var loginname, encrypted_id, encrypted_result;

    jqueryMap.$btn_s01.click(function () {
      loginname = jqueryMap.$findpwd.find('.ora-findpwd-s01-username input').val();
      encrypted_id = jqueryMap.$findpwd.find('.ora-findpwd-s01-question select').val();
      encrypted_result = jqueryMap.$findpwd.find('.ora-findpwd-s01-answer input').val();

      makeReq(loginname, encrypted_id, encrypted_result);
    });

    jqueryMap.$btn_s02.click(function () {
      var uid, password;
      uid = stateMap.uid;
      password = jqueryMap.$password.find('input');

      // setPassword(uid, password);
      // console.log( );
    });
  };

  initModule = function ($findpwd) {
    stateMap.$findpwd = $findpwd;
    setJqueryMap();

    onClick();

    $('input').bind('input propertychange');
  };

  return { initModule : initModule, copyData : copyData };
}());
