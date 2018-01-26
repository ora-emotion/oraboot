/*
 * spa.js
 * Root namespace module
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global $, pagination */

/*
 * Author - smpower
 * Github: https://github.com/smpower/plugin-library/tree/dev
 * Licence: MIT
 * Version: 2.0.0
 * Last Update: 2017.11.16
*/

/**
 pagination.js
 * 功能：
   * 可跳转到指定页面。输入页码，点击 '确定' 按钮或按键盘 Enter 键跳转到指定页面；
   * 从地址栏跳转页面。如，在地址栏 URL 后键入 #!page=3 可跳转到第 3 页。当键入的数值
     为负数或超出页的最大值时，会跳转到之前的页面；若没有浏览历史，默认加载第一页。因为
     使用 URL 来驱动，也就可以对每一个页面添加书签。
   * 支持分组功能并任意自定义每一组的页码数量。如 stateMap.page_per_group = 5 。
 * 调用方法：
   * pagination.initModule( $('.pagination') );
     传入的 .pagination 是插件的最外层元素的 id 名，也可以自定义 id 。
*/

var pagination = (function () {
  var
    stateMap = {
      $container     : null,
      page_per_group : 5,
      anchor_map     : {}
    },
    jqueryMap = {},

    setJqueryMap,   setUri,        setStyles,       togglePage,
    limitPage,      changeAnchorPar, onHashchange,
    onClickPageBtn, onKeyEvent,    initModule;

  // Start : setJqueryMap()
  // des   : 缓存 jQuery 集合
  //   * $container  - 最外层元素
  //   * $jump_input - 跳转页面的输入框
  //   * $page_btn   - 页码按钮
  //   * page        - 页面
  //
  setJqueryMap = function () {
    var $container = stateMap.$container;

    jqueryMap = {
      $container  : $container,
      $first_btn  : $container.find('.pagination-control-first'),
      $last_btn   : $container.find('.pagination-control-last'),
      $prev_btn   : $container.find('.pagination-control-prev'),
      $next_btn   : $container.find('.pagination-control-next'),
      $page_btn   : $container.find('.pagination-control-controllers-num'),
      $jump_btn   : $container.find('.pagination-jump-btn'),
      $jump_input : $container.find('.pagination-jump-input'),
      $page       : $container.find('.pagination-content-page')
    };
  };
  // End : setJqueryMap()

//------------------------------ BEGIN UTILITY METHODS -------------------------
  // Start : setAnchor()
  // des   : 页面初始化时，加载分页器第一页
  //
  setUri = function () {
    var anchor_map;

    anchor_map = $.uriAnchor.makeAnchorMap();

    if (!anchor_map.page || !anchor_map._s_page) {
      $.uriAnchor.setAnchor({ page : 1 });
    }

  };
  // End : setAnchor()

  // Start : setStyles()
  // des   : 初始化样式
  //
  setStyles = function () {
    var
      first_btn,  prev_btn, last_btn,    next_btn,
      anchor_map, key_name, page_length;

    first_btn   = jqueryMap.$first_btn;
    prev_btn    = jqueryMap.$prev_btn;
    last_btn    = jqueryMap.$last_btn;
    next_btn    = jqueryMap.$next_btn;
    page_length = parseInt(jqueryMap.$page_btn.length, 10);
    anchor_map  = $.uriAnchor.makeAnchorMap();

    for (key_name in anchor_map) {
      if (anchor_map.hasOwnProperty(key_name)) {
        first_btn.removeClass('not-allowed');
        last_btn.removeClass('not-allowed');
        prev_btn.removeClass('not-allowed');
        next_btn.removeClass('not-allowed');

        if (parseInt(anchor_map[key_name], 10) === 1) {
          first_btn.addClass('not-allowed');
          prev_btn.addClass('not-allowed');
        }

        if (parseInt(anchor_map[key_name], 10) === page_length) {
          last_btn.addClass('not-allowed');
          next_btn.addClass('not-allowed');
        }
      }
    }
  };
  // End : setStyles()

  // Start : changeAnchorPar()
  // des   : 更新 URL
  //
  changeAnchorPar = function () {
    var anchor_map, key_name, key_name_value, page_length;

    anchor_map = $.uriAnchor.makeAnchorMap();
    page_length = jqueryMap.$page_btn.length;

    KEYVAL:
    for (key_name in anchor_map) {
      if (anchor_map.hasOwnProperty(key_name)) {

        if (key_name.indexOf('_') === 0) { continue KEYVAL; }

        key_name_value = anchor_map[key_name];

        // 大于最大页码时或 page = NaN 时，显示最大页码
        if (key_name_value > page_length || key_name_value === 'NaN') {
          $.uriAnchor.setAnchor({ page : page_length });
          return false;
        }

        // 小于最小页码时，显示第一页
        if (key_name_value <= 0) {
          $.uriAnchor.setAnchor({ page : 1 });
          return false;
        }

        togglePage(key_name_value);
      }
    }
  };
  // End : changeAnchorPar()

  // Start : onHashchange()
  // des   : 监听 URL
  //
  onHashchange = function () {
    // 初始化 URI 和样式
    setUri();
    setStyles();

    changeAnchorPar();
    limitPage();
  };
  // End : onHashchange()
//------------------------------- END UTILITY METHODS --------------------------


//----------------------------- BEGIN : DOM 方法 -------------------------------
  // Start : togglePage()
  // des   : 切换页面
  //
  togglePage = function (key_value) {
    // 激活当前按钮
    jqueryMap.$page_btn.removeClass('active');
    $(jqueryMap.$page_btn[key_value - 1]).addClass('active');

    // 激活当前按钮对应的页面
    jqueryMap.$page.removeClass('active');
    $(jqueryMap.$page[key_value - 1]).addClass('active');
  };
  // End : togglePage()

  // Start : limitPage()
  // des   : 分页器分组
  //
  limitPage = function () {
    var
      i, j, k,
      page_per_group, page_length, num_mid,
      anchor_map,     key_name,    key_value,
      isEven,      isOdd;

    page_per_group = parseInt(stateMap.page_per_group, 10);
    page_length    = parseInt(jqueryMap.$page_btn.length, 10);
    anchor_map     = $.uriAnchor.makeAnchorMap();

    // 隐藏所有按钮
    jqueryMap.$page_btn.hide();

    // 当每一组的按钮为基数时，eg: page_per_group 5 --> num_mid 3
    isEven = function () {
      num_mid = (parseInt(page_per_group, 10) + 1) / 2;

      // 第一组按钮
      if (key_value <= num_mid) {
        for (i = 0; i < parseInt(page_per_group, 10); i++) {
          $(jqueryMap.$page_btn[i]).show();
        }
      }

      // 除去第一组和最后一组，中间的按钮们
      if (key_value > num_mid) {
        // 每一组的第一个按钮 - 从 (key_value - num_mid) 开始
        // 每一组的最后一个按钮 - 到 (key_value + num_mid - 2) 结束
        for (j = key_value - num_mid; j <= key_value + num_mid - 2; j++) {
          $(jqueryMap.$page_btn[j]).show();
        }
      }

      // 最后一组按钮
      if (key_value >= page_length - (num_mid - 1)) {
        // 最后一组的第一个按钮 - 从 (page_length - page_per_group + 1) 开始
        // 最后一组的最后一个按钮 - 到 page_length 结束
        for (k = page_length - page_per_group; k < page_length; k++) {
          $(jqueryMap.$page_btn[k]).show();
        }
      }
    };

    // 当每一组的按钮为偶数时，eg: page_per_group 6 --> num_mid 3
    isOdd = function () {
      num_mid = parseInt(page_per_group, 10) / 2;

      // 第一组按钮
      if (key_value <= num_mid) {
        for (i = 0; i < parseInt(page_per_group, 10); i++) {
          $(jqueryMap.$page_btn[i]).show();
        }
      }

      // 除去第一组和最后一组，中间的按钮们
      if (key_value > num_mid) {
        // 每一组的第一个按钮 - 从 (key_value - num_mid - 1) 开始
        // 每一组的最后一个按钮 - 到 (key_value + num_mid - 2) 结束
        for (j = key_value - num_mid - 1; j <= key_value + num_mid - 2; j++) {
          $(jqueryMap.$page_btn[j]).show();
        }
      }

      // 最后一组按钮
      if (key_value >= page_length - (num_mid - 1)) {
        // 最后一组的第一个按钮 - 从 (page_length - page_per_group + 1) 开始
        // 最后一组的最后一个按钮 - 到 page_length 结束
        for (k = page_length - page_per_group; k < page_length; k++) {
          $(jqueryMap.$page_btn[k]).show();
        }
      }
    };

    for (key_name in anchor_map) {
      if (anchor_map.hasOwnProperty(key_name)) {
        key_value = parseInt(anchor_map[key_name], 10);
        if (page_per_group % 2 === 0) { isOdd(); }
        else { isEven(); }
      }
    }

  };
  // End : limitPage()
//------------------------------ END : DOM 方法 --------------------------------


//--------------------------- Start : 事件处理程序 ------------------------------
  // Start   : onClickPageBtn()
  // des     :
  //   * 点击事件，点击按钮，更新 URL
  // 变量说明 :
  //   * target     - 目标元素
  //   * anchor_map - URI 对象，如 { page : 1, _s_page : 1 }
  //   * first_page - 第一页
  //   * last_page  - 最后一页
  //   * page_btn   - 页码按钮
  //
  onClickPageBtn = function () {
    jqueryMap.$container.unbind('click').click(function (event) {
      var
        target,     anchor_map, key_name,
        first_page, last_page,  prev_page, next_page, page_btn;

      target     = event.target || window.event.target;
      anchor_map = $.uriAnchor.makeAnchorMap();
      first_page = 1;
      last_page  = parseInt(jqueryMap.$page_btn.length, 10);
      page_btn   = parseInt($(target).index() + 1, 10);

      for (key_name in anchor_map) {
        if (anchor_map.hasOwnProperty(key_name)) {
          switch (target.classList[0]) {
            case 'pagination-control-first' :
              $.uriAnchor.setAnchor({ page : first_page });
              break;
            case 'pagination-control-prev' :
              prev_page = parseInt(anchor_map[key_name] - 1, 10);
              $.uriAnchor.setAnchor({ page : prev_page });
              break;
            case 'pagination-control-controllers-num' :
              $.uriAnchor.setAnchor({ page : page_btn });
              break;
            case 'pagination-control-next' :
              next_page = parseInt(anchor_map[key_name], 10) + 1;
              $.uriAnchor.setAnchor({ page : next_page });
              break;
            case 'pagination-control-last' :
              $.uriAnchor.setAnchor({ page : last_page });
              break;
            case 'pagination-jump-btn' :
              $.uriAnchor.setAnchor({ page : parseInt(jqueryMap.$jump_input.val(), 10) });
              break;
            default:
              break;
          }
        }
      }
    });
  };
  // End : onClickPageBtn()

  // Start : onKeyEvent()
  // des   : 键盘事件
  //
  onKeyEvent = function () {
    // document.onkeydown = function (e) {
    //   var input_val;
    //
    //   e = event || window.event;
    //   input_val = parseInt(jqueryMap.$jump_input.val(), 10);
    //
    //   switch (e && e.keyCode) {
    //     case 13 :  // Enter
    //       $.uriAnchor.setAnchor({ page : input_val });
    //       break;
    //     default:
    //       break;
    //   }
    // };
  };
  // End : onKeyEvent()
//---------------------------- End : 事件处理程序 -------------------------------


  // Start : initModule()
  // des   : 初始化模块
  //
  initModule = function ($container) {
    stateMap.$container = $container;
    setJqueryMap();

    jqueryMap.$jump_input.attr('placeholder', jqueryMap.$page_btn.length);

    onClickPageBtn();
    onKeyEvent();

    // 页面加载后立即监听 hashchange 事件
    $(window)
      .bind('hashchange', onHashchange)
      .trigger('hashchange');
  };
  // End : initModule()

  // 导出公开方法
  return { initModule : initModule, stateMap : stateMap };
}());
