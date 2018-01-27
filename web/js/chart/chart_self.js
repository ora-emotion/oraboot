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
    stateMap = { $container : null },
    jqueryMap = {},

    setJqueryMap, getData, renderChart, initModule
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
        // data [[], [], []] - 计划 实际 完成率
        if (fn_map.hasOwnProperty('suc')) {
          fn_map.suc(data);
        }
      },
      error : function (error) {
        alert('与服务器通讯失败！');
        console.log(error);
      }
    });
  };
  // End Utility method /GetData/
  // -------------------------- BEGIN UTILITY METHODS ------------------------

  // ---------------------------- BEGIN DOM METHODS --------------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container : $container
    };
  };
  // End DOM method /setJqueryMap/

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
  // ----------------------------- END DOM METHODS ---------------------------

  // -------------------------- BEGIN EVENT HANDLERS -------------------------
  // example: onClick...
  // --------------------------- END EVENT HANDLERS --------------------------

  // -------------------------- BEGIN PUBLIC METHODS -------------------------
  // Begin public method /initModule/
  // Purpose   : Initializes module
  // Arguments :
  //   *  the jquery element used by this feature
  // Returns   : true
  // Throws    : none
  //
  initModule = function ($container) {
    stateMap.$container = $container;
    setJqueryMap();

    getData('selectMyMonthPerformance', { suc : renderChart });
  };
  // End public method /initModule/

  // return public methods
  return {initModule: initModule}
  // --------------------------- END PUBLIC METHODS --------------------------
}());
