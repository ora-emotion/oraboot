/*
 * ora-register.js
 * 用户注册模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, register */

var register = (function () {
  var
    configMap = {},
    stateMap = { $register : null },
    jqueryMap = {},

    setJqueryMap,  checkLeapYear,
    checkusermark, checkusername, checkpassword, checkname, checkphonenum,
    checkidnum,    checkbirthday, checkquestion, checkinfo, onClick,
    initModule;

  setJqueryMap = function () {
    var $register = stateMap.$register;

    jqueryMap = {
      $register   : $register,
      $mark       : $register.find('.ora-register-main-mark'),
      $username   : $register.find('.ora-register-main-username'),
      $password   : $register.find('.ora-register-main-password'),
      $name       : $register.find('.ora-register-main-name'),
      $confirmpwd : $register.find('.ora-register-main-confirmpwd'),
      $birthday   : $register.find('.ora-register-main-birthday'),
      $phone      : $register.find('.ora-register-main-phone'),
      $idnum      : $register.find('.ora-register-main-idnum'),
      $question   : $register.find('.ora-register-main-question'),
      $submit     : $register.find('.ora-register-main-submit')
    };
  };

  // Start : checkusermark()
  // des   :
  //   * 验证员工编号
  //   * 用户编号只能为数字
  // return :
  //   * true  - 员工编号为 number 类型，可提交
  //   * false - 员工编号为 NaN 类型，不可提交
  //
  checkusermark = function () {
    var $mark, $mark_tip, mark_val;

    $mark     = jqueryMap.$mark;
    $mark_tip = $('.ora-register-main-tip-mark');
    mark_val  = $mark.find('input').val();

    $mark.find('input').focus(function () {
      $mark_tip.addClass('active');
    });
    $mark.find('input').blur(function () {
      $mark_tip.removeClass('active');
    });

    if ( /^[0-9]{8}$/.test(mark_val) ) {
      $mark_tip.find('span').addClass('pass');
    } else {
      $mark_tip.find('span').removeClass('pass');
      return false;
    }

    return true;
  };
  // End : checkusermark()

  // Start : checkusername()
  // des   :
  //   * 验证用户名
  //   * 首字符可以为数字
  //   * 只能为英文或数字
  //   * 最少 6 字符，最多 12 字符
  // return :
  //   * true  - 符合规则，可提交
  //   * false - 不符合规则，不可提交
  //
  checkusername = function () {
    var $username, $username_tip, username_val, i;

    $username     = jqueryMap.$username;
    $username_tip = $('.ora-register-main-tip-username');
    username_val  = $username.find('input').val();

    $username.find('input').focus(function () {
      $username_tip.addClass('active');
    });
    $username.find('input').blur(function () {
      $username_tip.removeClass('active');
    });

    // 用户名只能为英文或英文与数字的组合
    if ( /^[a-zA-Z0-9\s]+$/.test(username_val) ) {
      $username_tip.find('.username-letter-num').addClass('pass');
    } else {
      $username_tip.find('.username-letter-num').removeClass('pass');
      return false;
    }

    // 用户名首尾不包含空格
    if ( username_val.charAt([username_val.length - 1]) === ' ' || username_val.charAt(0) === ' ' ) {
      $username_tip.find('.username-no-space').removeClass('pass');
      return false;
    } else {
      $username_tip.find('.username-no-space').addClass('pass');
    }



    // 用户名最多为 12 位
    if (username_val.length > 12) {
      $username_tip.find('.username-max-length').removeClass('pass');
      return false;
    } else {
      $username_tip.find('.username-max-length').addClass('pass');
    }

    // 用户名最少为 6 位
    if (username_val.length < 6) {
      $username_tip.find('.username-min-length').removeClass('pass')
      return false;
    } else {
      $username_tip.find('.username-min-length').addClass('pass');
    }

    return true;
  };
  // End : checkusername()

  // Start : checkpassword()
  // des   :
  //   * 验证密码
  //   * 不包含空格且首尾不能为空格（不能包含空格）
  //   * 最少 8 字符，最多 16 字符
  // return :
  //   * true  - 符合规则，可提交
  //   * false - 不符合规则，不可提交
  //
  checkpassword = function () {
    var
      $password,    $password_tip,  $confirmpwd, $confirmpwd_tip,
      password_val, confirmpwd_val, i, j;

    $password       = jqueryMap.$password;
    $confirmpwd     = jqueryMap.$confirmpwd;
    $password_tip   = $('.ora-register-main-tip-checkpassword');
    $confirmpwd_tip = $('.ora-register-main-tip-confirmpwd');
    password_val    = $password.find('input').val();
    confirmpwd_val  = $confirmpwd.find('input').val();

    // 显示验证密码提示信息
    $password.find('input').focus(function () {
      $password_tip.addClass('active');
    });
    // 隐藏验证密码提示信息
    $password.find('input').blur(function () {
      $password_tip.removeClass('active');
    });
    // 显示确认密码验证信息
    $confirmpwd.find('input').focus(function () {
      $confirmpwd_tip.addClass('active');
    });
    // 隐藏确认密码验证信息
    $confirmpwd.find('input').blur(function () {
      $confirmpwd_tip.removeClass('active');
    });

    // 密码不能包含空格
    for (i = 0; i < password_val.length; i++) {
      if ( /\s/.test(password_val.charAt(i)) ) {
        $('.password-no-space').removeClass('pass');
        return false;
      } else {
        $('.ora-register-main-tip-checkpassword .password-no-space')
          .addClass('pass');
      }
    }

    // 验证密码最大长度
    if (password_val.length > 16) {
      $('.password-max-length').removeClass('pass');
      $confirmpwd_tip.find('span').removeClass('pass');
      return false;
    } else {
      $('.password-max-length').addClass('pass');
    }

    // 验证密码最小长度
    if (password_val.length < 8) {
      $('.password-min-length').removeClass('pass');
      return false;
    } else {
      $('.password-min-length').addClass('pass');
    }

    // 确认密码
    for (j = 0; j < password_val.length; j++) {
      if (
        password_val.charAt(j) === confirmpwd_val.charAt(j) &&
        password_val.length === confirmpwd_val.length &&
        password_val.length <= 16
      ) {
        $confirmpwd_tip.find('span').addClass('pass');
      } else {
        $confirmpwd_tip.find('span').removeClass('pass');
        return false;
      }
    }

    return true;
  };
  // End : checkpassword()

  // Start : checkname()
  // des   :
  // return :
  //   * true  - 符合规则，可提交
  //   * false - 不符合规则，不可提交
  //
  checkname = function () {
    var $name, $name_tip, name_val;

    $name     = jqueryMap.$name;
    $name_tip = $('.ora-register-main-tip-name');
    name_val  = $name.find('input').val();

    $name.find('input').focus(function () {
      $name_tip.addClass('active');
    });
    $name.find('input').blur(function () {
      $name_tip.removeClass('active');
    });

    // 姓名不能为空
    if (name_val === '') {
      $name_tip.find('span').removeClass('pass');
      return false;
    }

    // 姓名不能为空格
    if ( /^\s+$/.test(name_val) ) {
      $name_tip.find('span').removeClass('pass');
      return false;
    }

    $name_tip.find('span').addClass('pass');

    return true;
  };
  // End : checkname()

  // Start : checkphonenum()
  // des   :
  //   * 验证电话号码
  //   * 11 位，纯数字
  // return :
  //   * true  - 符合规则，可提交
  //   * false - 不符合规则，不可提交
  //
  checkphonenum = function () {
    var $phone, $phone_tip, phone_val;

    $phone     = jqueryMap.$phone;
    $phone_tip = $('.ora-register-main-tip-phone');
    phone_val  = $phone.find('input').val();

    $phone.find('input').focus(function () {
      $phone_tip.addClass('active');
    });
    $phone.find('input').blur(function () {
      $phone_tip.removeClass('active');
    });

    // 验证手机号码号段及长度
    if ( /^1[34578][0-9]\d{8}$/.test(phone_val) ) {
      $phone_tip.find('span').addClass('pass');
    } else {
      $phone_tip.find('span').removeClass('pass');
      return false;
    }

    return true;
  };
  // End : checkphonenum()

  // Start : checkidnum()
  // des   :
  //   * 验证身份证号码
  //   * 最短 17 位，最多 18 位，最后一位数字或 X
  //
  checkidnum = function () {
    var
      $idnum, $idnum_tip, idnum_val;

    $idnum     = jqueryMap.$idnum;
    $idnum_tip = $('.ora-register-main-tip-idnum');
    idnum_val  = $idnum.find('input').val();

    $idnum.find('input').focus(function () {
      $idnum_tip.addClass('active');
    });
    $idnum.find('input').blur(function () {
      $idnum_tip.removeClass('active');
    });

    // 判断身份证号长度 - 18 位
    if ( /^[0-9][\d|X]{17}$/.test(idnum_val) ) {
      $idnum_tip.find('span').addClass('pass');
    } else {
      $idnum_tip.find('span').removeClass('pass');
      return false;
    }

    return true;
  };
  // End : checkidnum()

  // Start : checkquestion()
  // des   : 验证密保答案
  // return :
  //   * true  - 符合规则，可提交
  //   * false - 不符合规则，不可提交
  //
  checkquestion = function () {
    var $question, $question_tip, question_val;

    $question     = jqueryMap.$question;
    $question_tip = $('.ora-register-main-tip-question');
    question_val  = $question.find('input').val();

    $question.find('input').focus(function () {
      $question_tip.addClass('active');
    });
    $question.find('input').blur(function () {
      $question_tip.removeClass('active');
    });

    // 密保答案不能为空
    if ( question_val == ''  || question_val == null ) {
      $question_tip.find('span').removeClass('pass');
      return false;
    } else {
      $question_tip.find('span').addClass('pass');
    }

    return true;
  };
  // End : checkquestion()

  // Start : checkinfo()
  // des   :
  //
  checkinfo = function () {
    checkusermark();
    checkusername();
    checkpassword();
    checkname();
    checkphonenum();
    checkidnum();
    checkquestion();

    // 提交信息
    if (
      (checkusermark() && checkusername() && checkpassword() &&
      checkname() && checkphonenum() && checkidnum() && checkquestion() &&
      register.checkbirthday.dateFormat()) === false
    ) {
      jqueryMap.$submit.find('button').click(function () {
        $('.ora-register-main-tip-submit').addClass('active');
        return false;
      });
    } else {
      jqueryMap.$submit.find('button').click(function () {
        $('.ora-register-main-tip-submit').removeClass('active');
        $('form').submit();
      });
    }


    // return true;
  };
  // End : checkinfo()

  // Start : onClick()
  // des   : 点击事件处理程序
  //
  onClick = function () {};
  // End : onClick()

  initModule = function ($register) {
    stateMap.$register = $register;
    setJqueryMap();

    // 验证出生年月模块
    register.checkbirthday.initModule( jqueryMap.$register, jqueryMap.$birthday );

    checkinfo();
    onClick();

    $('input').bind('input propertychange', checkinfo);
  };

  return { initModule : initModule };
}());
