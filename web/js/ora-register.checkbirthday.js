/*
 * ora-register.checkbirthday.js
 * 用户注册模块
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, register */

register.checkbirthday = (function () {
  var
    configMap = {},
    stateMap = {
      $register : null,
      $birthday : null,
      birthday_map : {
        year  : null,
        month : null
      }
    },
    jqueryMap = {},

    setJqueryMap, checkLeapYear, checkBirthday,
    onClick,      dateFormat,    initModule;

  setJqueryMap = function () {
    var
      $register = stateMap.$register;
      $birthday = stateMap.$birthday;

    jqueryMap = {
      $register    : $register,
      $birthday    : $birthday,
      $year        : $birthday.find('.ora-register-main-birthday-choice-year'),
      $month       : $birthday.find('.ora-register-main-birthday-choice-month'),
      $day         : $birthday.find('.ora-register-main-birthday-choice-day'),
      $year_group  : $birthday.find('.ora-register-main-birthday-year'),
      $month_group : $birthday.find('.ora-register-main-birthday-month'),
      $day_group   : $birthday.find('.ora-register-main-birthday-day')
    };
  };

  // Start  : checkLeapYear()
  // des    : 检查年份是否为闰年
  // return :
  //   * true  - 闰年(is_leap_year),
  //   * false - 平年(is_nonleap_year)
  //
  checkLeapYear = function () {
    var $birthday_year, year, is_leap_year;

    $birthday_year = jqueryMap.$birthday.find('.ora-register-main-birthday-choice-year');
    year           = parseInt($birthday_year.text(), 10);
    is_leap_yeap   = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    // 若年份为平年，返回 false
    if (!is_leap_yeap) {
      return false;
    }

    return true;
  };
  // End : checkLeapYear()

  // Start : checkbirthday()
  // des   : 验证生日
  //
  checkBirthday = function () {
    var
      birthday_map = stateMap.birthday_map,
      $register,   $birthday,
      $year,       $month,       $day,
      $year_group, $month_group, $day_group,
      $year_item,  $month_item,  $day_item,
      year_text,   month_text,   day_text,
      showYear,    hideYear,     showMonth,
      hideMonth,   showDay,      hideAll,
      checkYear,   createDays,   choseYear,
      choseMonth,  choseDay;

    $register    = jqueryMap.$register;
    $birthday    = jqueryMap.$birthday;
    $year        = jqueryMap.$year;
    $month       = jqueryMap.$month;
    $day         = jqueryMap.$day;
    $year_group  = jqueryMap.$year_group;
    $month_group = jqueryMap.$month_group;
    $day_group   = jqueryMap.$day_group;
    $year_item   = $birthday.find('.year-item');
    $month_item  = $birthday.find('.ora-register-main-birthday-month-item span');

    createDays = function (birthday_map) {
      var key_name, i, main_html, is_leap_year, days_31, days_30, days_29, days_28, otherMonth;
      is_leap_year = checkLeapYear();

      days_31 = /0[13578]|1[02]/.test(month_text);
      days_30 = /0[469]|11/.test(month_text);
      days_29 = is_leap_yeap;
      days_28 = !is_leap_yeap;

      otherMonth = function () {
        if ( /0[13578]|1[02]/.test(month_text) ) {
          $day_group.children('span').remove();
          for (i = 1; i <= 31; i++) {
            main_html = String() + '<span>' + i + '</span>';
            $day_group.append(main_html);
          }
        }

        if ( /0[469]|11/.test(month_text) ) {
          $day_group.children('span').remove();
          for (i = 1; i <= 30; i++) {
            main_html = String() + '<span>' + i + '</span>';
            $day_group.append(main_html);
          }
        }
      };

      if (is_leap_yeap) {
        if ( month_text === '02' ) {
          $day_group.children('span').remove();
          for (i = 1; i <= 29; i++) {
            main_html = String() + '<span>' + i + '</span>';
            $day_group.append(main_html);
          }
        }

        otherMonth();
      } else {
        if ( month_text === '02' ) {
          $day_group.children('span').remove();
          for (i = 1; i <= 28; i++) {
            main_html = String() + '<span>' + i + '</span>';
            $day_group.append(main_html);
          }
        }

        otherMonth();
      }

    };

    checkYear = function (arg) {
      var year_text, month_text, chose_birthday;

      year_text    = parseInt($year.text(), 10);
      month_text   = parseInt($month.text(), 10);
      $chose_year  = $('.ora-register-main-tip-birthday-year');
      $chose_month = $('.ora-register-main-tip-birthday-month');

      if ( arg === $($year)[0] ) {
        showYear();
        $chose_year.removeClass('birthday-month');
        $chose_year.removeClass('birthday-day');
      }

      if ( arg === $($month)[0] ) {
        hideYear();
        hideDay();
        if ( isNaN(year_text) ) {
          $chose_year.addClass('birthday-month');
          $chose_year.removeClass('birthday-day');
        } else {
          showMonth();
          $chose_month.removeClass('birthday-day');
        }
      }

      if ( arg === $($day)[0] ) {
        hideYear();
        hideMonth();
        if ( isNaN(year_text) ) {
          $chose_year.addClass('birthday-day');
          $chose_year.removeClass('birthday-month');
          $chose_month.removeClass('birthday-day');
        } else {
          if ( isNaN(month_text) ) {
            $chose_year.removeClass('birthday-month');
            $chose_year.removeClass('birthday-day');
            $chose_month.addClass('birthday-day');
          } else {
            showDay();
            $chose_year.removeClass('birthday-month');
            $chose_year.removeClass('birthday-day');
            $chose_month.removeClass('birthday-day');
          }
        }
      }

    };

    showYear = function () {
      $($year).addClass('active');
      $($year_group).addClass('active');
      $($month).removeClass('active');
      $($month_group).removeClass('active');
      $($day).removeClass('active');
      $($day_group).removeClass('active');
    };

    hideYear = function () {
      $($year).removeClass('active');
      $($year_group).removeClass('active');
    };

    showMonth = function () {
      $($month).addClass('active');
      $($month_group).addClass('active');
      $($year).removeClass('active');
      $($year_group).removeClass('active');
      $($day).removeClass('active');
      $($day_group).removeClass('active');
    };

    hideMonth = function () {
      $($month).removeClass('active');
      $($month_group).removeClass('active');
    };

    showDay = function () {
      $($day).addClass('active');
      $($day_group).addClass('active');
      $($year).removeClass('active');
      $($year_group).removeClass('active');
      $($month).removeClass('active');
      $($month_group).removeClass('active');
    };

    hideDay = function () {
      $($day).removeClass('active');
      $($day_group).removeClass('active');
    };

    hideAll = function () {
      $($year).removeClass('active');
      $($year_group).removeClass('active');
      $($month).removeClass('active');
      $($month_group).removeClass('active');
      $($day).removeClass('active');
      $($day_group).removeClass('active');
    };

    choseYear = function () {
      $year_item.click(function () {
        $day.text('日');

        year_text = $(this).text();
        $year.text(year_text);

        stateMap.birthday_map.year = parseInt(year_text, 10);
        createDays(stateMap.birthday_map);
      });
    };

    choseMonth = function () {
      $month_item.click(function () {
        $day.text('日');

        month_text = $(this).text();
        $month.text(month_text);

        stateMap.birthday_map.month = parseInt(month_text, 10);
        createDays(stateMap.birthday_map);
      });
    };

    choseDay = function () {
      var birthday;

      $day_item = $birthday.find('.ora-register-main-birthday-day span');

      $day_item.click(function () {
        day_text = $(this).text();

        if (day_text.length === 1) {
          day_text = '0' + day_text;
          $day.text(day_text);
        } else {
          day_text = day_text;
          $day.text(day_text);
        }
      });
    };

    $register.click(function (event) {
      var target;

      event = event || window.event;
      target = event.target;

      switch ( $(target)[0] ) {
        case $($year)[0] :
          checkYear( $(target)[0] );
          choseYear();
          break;
        case $($month)[0] :
          checkYear( $(target)[0] );
          choseMonth();
          break;
        case $($day)[0] :
          checkYear( $(target)[0] );
          choseDay();
          break;
        default:
          hideAll();
          break;
      }

      // 格式化生日
      dateFormat();
    });
  };
  // End : checkbirthday()

  onClick = function() {
    checkBirthday();
  };

  // Start  : dateFormat()
  // des    : 格式化日期。用户要提交表单，必须要选择生日之后方可允许。
  // return :
  //   * true  - 用户生日已选择
  //   * false - 用户未选择生日
  //
  dateFormat = function () {
    var year_text, month_text, day_text, birthday;

    year_text  = parseInt(jqueryMap.$year.text(), 10);
    month_text = parseInt(jqueryMap.$month.text(), 10);
    day_text   = parseInt(jqueryMap.$day.text(), 10);

    if ( isNaN(year_text) || isNaN(month_text) || isNaN(day_text) ) {
      return false;
    }

    // 当用户选择日期后，格式化日期
    if (month_text.toString().length === 1) {
      month_text = '0' + month_text.toString();
      if (day_text.toString().length === 1) {
        day_text = '0' + day_text.toString();
      }
    }
    birthday = year_text + '/' + month_text + '/' + day_text;
    jqueryMap.$birthday.find('input').val(birthday);

    return true;
  };
  // End : dateFormat()

  initModule = function ($register, $birthday) {
    stateMap.$register = $register;
    stateMap.$birthday = $birthday;
    setJqueryMap();

    onClick();
    // dateFormat();

  };

  return { initModule : initModule, dateFormat : dateFormat };
}());
