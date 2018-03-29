/**
 * @file name    : chart_self
 * @created time : 2018/1/26 13:15
 * @author       : smpower
 * @email        : bzsjxhywrf@outlook.com
 * @github       : https://github.com/smpower/
 */

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    manerr   : 50,
  newcap : true, nomen   : true, plueplue : true
  regexp : true, sloppy  : true, vars     : true,
  white  : true
*/

/*global chartSelf */

var chartSelf = (function () {
  // ---------------------- BEGIN MODULE SCOPE VARIABLES ---------------------
  var
    configMap = { userinfo_map : null },
    stateMap  = { $container : null },
    jqueryMap = {},

    setJqueryMap,   getData, getMonthData, createMonthMenu, renderChart,
    renderDayChart, onClick, initModule
  ;
  // ----------------------- END MODULE SCOPE VARIABLES ----------------------

  // -------------------------- BEGIN UTILITY METHODS ------------------------
  // Begin Utility method /GetData/
  // Argument :
  //           * url    - 用来获取数据的后台地址
  //           * fn_map - 获取数据成功或失败后执行的方法
  //
  getData = function (url, fn_map) {
    $.ajax({
      type : 'post',
      url  : url,
      success : function (data) {
        if (data.length === 0) { alert('暂无数据'); }
        $('.chart-wrap .chart').remove();
        $('.chart-wrap').append('<div class="chart"></div>');

        // data [[], [], []] - 计划 实际 完成率
        if (fn_map.hasOwnProperty('suc')) {
          fn_map.suc(data);
          fn_map.createMonthMenu(data);  // 自动生成月份选择菜单
        }
      },
      error : function (error) {
        alert('与服务器通讯失败！');
        console.log(error);
      }
    });
  };
  // End Utility method /GetData/

  // Begin Utility method /getMonthData/
  getMonthData = function (url, arg_map, fn_map) {
    $.ajax({
      type        : 'post',
      url         : url,
      data        : JSON.stringify(arg_map),
      contentType : 'application/json;charset=UTF-8',
      dataType    : 'json',
      success     : function (data) {
        if (data.length === 0) { alert('暂无数据'); }
        $('.chart-wrap .chart').remove();
        $('.chart-wrap').append('<div class="chart"></div>');
        if (fn_map.hasOwnProperty('suc')) { fn_map.suc(data); }
      },
      error : function (error) {
        console.log('与服务器通讯失败!');
        console.log(error);
      }
    });
  };
  // End Utility method /getMonthData/
  // -------------------------- BEGIN UTILITY METHODS ------------------------

  // ---------------------------- BEGIN DOM METHODS --------------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = { $container : $container };
  };
  // End DOM method /setJqueryMap/

  // Begin DOM method /createMonthMenu/
  createMonthMenu = function (data) {
    var i;

    $('.chart_nav span').remove();
    $('.chart_nav').append('<span class="chart_nav_item text-center chart_nav_item_active" data-month="0">总图表</span>')

    for (i = 1; i < data.length + 1; i++) {
      $('.chart_nav').append(
        '<span class="chart_nav_item text-center" data-month=' + i + '>' +
          i + '月' +
        '</span>'
      );
    }
  };
  // Begin DOM method /createMonthMenu/

  // Begin DOM method /renderChart/
  renderChart = function (data) {
    var i, month_arr = [], myChart, year;

    // 确定有数据的月份
    for (i = 0; i < data[0].length; i++) {
      month_arr.push(i + 1 + '月');
    }

    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementsByClassName('chart')[0]);

    // 指定图表的配置项和数据
    year = {
      title : {
        text : '导师部业绩图表'
      },
      tooltip : {
        trigger : 'axis',
        axisPointer : { type : 'shadow', label : { show : true } }
      },
      toolbox : {  // 右上角工具箱
        show : true,
        feature : {
          mark        : { show : true },
          dataView    : { show : true, readOnly : false },
          magicType   : { show : true, type     : ['bar', 'bar'] },
          restore     : { show : true },
          saveAsImage : { show : true }
        }
      },
      calculable : true,
      legend : { data : ['升级金额(元)', '升级次数(次)'], itemGap : 5 },
      grid   : { top : '12%', left : '1%', right : '10%', containLabel : true },
      xAxis  : [
        {
          type        : 'category',
          data        : month_arr,
          axisPointer : { type : 'shadow' }
        }
      ],
      yAxis  : [
        {
          type : 'value',
          name : '升级金额(元)',
          min  : 0,
          max  : 500000,
          interval : 50000
        },
        {
          type : 'value',
          name : '升级次数(次)',
          min  : 0,
          max  : 100,
          interval : 10
        }
      ],
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 100
        },
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          show: true,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 30,
          height: '80%',
          showDataShadow: false,
          left: '93%'
        }
      ],
      series : [
        {
          name: '升级金额(元)',
          type: 'bar',
          data: data[0]
        },
        {
          name : '升级次数(次)',
          type : 'bar',
          yAxisIndex : 1,
          data : data[1]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(year);
  };
  // End DOM method /renderChart/

  // Begin DOM method /renderDayChart/
  renderDayChart = function (data) {
    var i, day_arr = [], myChart, option;
    for (i = 0; i < data[0].length; i++) {
      day_arr.push(i + 1);
    }
    myChart = echarts.init(document.getElementsByClassName('chart')[0]);
    option = {
      title : {
        text : '导师部业绩图表'
      },
      tooltip : {
        trigger : 'axis',
        axisPointer : { type : 'shadow', label : { show : true } }
      },
      toolbox : {  // 右上角工具箱
        show : true,
        feature : {
          mark        : { show : true },
          dataView    : { show : true, readOnly : false },
          magicType   : { show : true, type     : ['bar', 'bar'] },
          restore     : { show : true },
          saveAsImage : { show : true }
        }
      },
      calculable : true,
      legend : { data : ['升级金额(元)', '升级次数(次)'], itemGap : 5 },
      grid   : { top : '12%', left : '1%', right : '10%', containLabel : true },
      xAxis  : [
        {
          type        : 'category',
          data        : day_arr,
          axisPointer : { type : 'shadow' }
        }
      ],
      yAxis  : [
        {
          type : 'value',
          name : '升级金额(元)',
          min  : 0,
          max  : 30000,
          interval : 3000
        },
        {
          type : 'value',
          name : '升级次数(次)',
          min  : 0,
          max  : 10,
          interval : 1
        }
      ],
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 100
        },
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          show: true,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 30,
          height: '80%',
          showDataShadow: false,
          left: '93%'
        }
      ],
      series : [
        {
          name: '升级金额(元)',
          type: 'bar',
          data: data[0]
        },
        {
          name : '升级次数(次)',
          type : 'bar',
          yAxisIndex : 1,
          data : data[1]
        }
      ]
    };
    myChart.setOption(option);
  };
  // End DOM method /renderDayChart/
  // ----------------------------- END DOM METHODS ---------------------------

  // -------------------------- BEGIN EVENT HANDLERS -------------------------
  onClick = function () {
    $('.chart_nav').unbind('click').click(function (event) {
      var target = event.target || window.event.target;

      switch ( $(target).attr('data-month') ) {
        case '0' :   // 总图表
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          $('.chart_nav_item:nth-child(1)').addClass('chart_nav_item_active');
          $('.chart-wrap .chart').remove();
          getData('selectMyMonthPerformance', {
            suc             : renderChart,
            createMonthMenu : createMonthMenu
          });
          break;
        case '1' :   // 1 月
          // 移除所有按钮的激活样式
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          // 为当前按钮添加激活的样式
          $('.chart_nav_item:nth-child(2)').addClass('chart_nav_item_active');

          // 请求并渲染当前月份的图表数据
          getMonthData(
            'selectMyDayPerformance',
            { ptime : '2018-01-01' },
            { suc : renderDayChart }
          );
          break;
        case '2' :   // 2 月// 移除所有按钮的激活样式
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          // 为当前按钮添加激活的样式
          $('.chart_nav_item:nth-child(3)').addClass('chart_nav_item_active');

          // 请求并渲染当前月份的图表数据
          getMonthData(
            'selectMyDayPerformance',
            { ptime : '2018-02-01' },
            { suc : renderDayChart }
          );
          break;
        case '3' :   // 3 月
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          // 为当前按钮添加激活的样式
          $('.chart_nav_item:nth-child(4)').addClass('chart_nav_item_active');

          // 请求并渲染当前月份的图表数据
          getMonthData(
            'selectMyDayPerformance',
            { ptime : '2018-03-01' },
            { suc : renderDayChart }
          );
          break;
        case '4' :   // 4 月
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          // 为当前按钮添加激活的样式
          $('.chart_nav_item:nth-child(5)').addClass('chart_nav_item_active');

          // 请求并渲染当前月份的图表数据
          getMonthData(
            'selectMyDayPerformance',
            { ptime : '2018-04-01' },
            { suc : renderDayChart }
          );
          break;
        case '5' :   // 5 月
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          // 为当前按钮添加激活的样式
          $('.chart_nav_item:nth-child(6)').addClass('chart_nav_item_active');

          // 请求并渲染当前月份的图表数据
          getMonthData(
            'selectMyDayPerformance',
            { ptime : '2018-05-01' },
            { suc : renderDayChart }
          );
          break;
        case '6' :   // 6 月
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          // 为当前按钮添加激活的样式
          $('.chart_nav_item:nth-child(7)').addClass('chart_nav_item_active');

          // 请求并渲染当前月份的图表数据
          getMonthData(
            'selectMyDayPerformance',
            { ptime : '2018-06-01' },
            { suc : renderDayChart }
          );
          break;
        case '7' :   // 7 月
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          // 为当前按钮添加激活的样式
          $('.chart_nav_item:nth-child(8)').addClass('chart_nav_item_active');

          // 请求并渲染当前月份的图表数据
          getMonthData(
            'selectMyDayPerformance',
            { ptime : '2018-07-01' },
            { suc : renderDayChart }
          );
          break;
        case '8' :   // 8 月
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          // 为当前按钮添加激活的样式
          $('.chart_nav_item:nth-child(9)').addClass('chart_nav_item_active');

          // 请求并渲染当前月份的图表数据
          getMonthData(
            'selectMyDayPerformance',
            { ptime : '2018-08-01' },
            { suc : renderDayChart }
          );
          break;
        case '9' :   // 9 月
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          // 为当前按钮添加激活的样式
          $('.chart_nav_item:nth-child(10)').addClass('chart_nav_item_active');

          // 请求并渲染当前月份的图表数据
          getMonthData(
            'selectMyDayPerformance',
            { ptime : '2018-09-01' },
            { suc : renderDayChart }
          );
          break;
        case '10' :  // 10 月
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          // 为当前按钮添加激活的样式
          $('.chart_nav_item:nth-child(11)').addClass('chart_nav_item_active');

          // 请求并渲染当前月份的图表数据
          getMonthData(
            'selectMyDayPerformance',
            { ptime : '2018-10-01' },
            { suc : renderDayChart }
          );
          break;
        case '11' :  // 11 月
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          // 为当前按钮添加激活的样式
          $('.chart_nav_item:nth-child(12)').addClass('chart_nav_item_active');

          // 请求并渲染当前月份的图表数据
          getMonthData(
            'selectMyDayPerformance',
            { ptime : '2018-11-01' },
            { suc : renderDayChart }
          );
          break;
        case '12' :  // 12 月
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          // 为当前按钮添加激活的样式
          $('.chart_nav_item:nth-child(13)').addClass('chart_nav_item_active');

          // 请求并渲染当前月份的图表数据
          getMonthData(
            'selectMyDayPerformance',
            { ptime : '2018-12-01' },
            { suc : renderDayChart }
          );
          break;
        default :
          break;
      }
    });
  };
  // --------------------------- END EVENT HANDLERS --------------------------

  // -------------------------- BEGIN PUBLIC METHODS -------------------------
  // Begin public method /initModule/
  // Purpose   : Initializes module
  // Arguments :
  //   *  the jquery element used by this feature
  // Returns   : true
  // Throws    : none
  //
  initModule = function ($container, userinfo_map) {
    stateMap.$container    = $container;
    configMap.userinfo_map = userinfo_map;
    setJqueryMap();

    getData('selectMyMonthPerformance', {
      suc             : renderChart,
      createMonthMenu : createMonthMenu
    });
    onClick();
  };
  // End public method /initModule/

  // return public methods
  return {initModule: initModule}
  // --------------------------- END PUBLIC METHODS --------------------------
}());
