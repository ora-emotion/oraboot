/**
 * @file name    : chart_department.js
 * @created time : 2018/1/23 10:30
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

/*global departmentChart */

var departmentChart = (function () {
  // ---------------------- BEGIN MODULE SCOPE VARIABLES ---------------------
  var
    configMap = {},
    stateMap = {},
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
      $container : $container,
      $chart     : $container.find('.chart')
    };
  };
  // End DOM method /setJqueryMap/

  // Begin DOM method /renderChart/
  renderChart = function (data) {
    var myChart, option;

    myChart = echarts.init(document.getElementsByClassName('chart')[0]);

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      legend: {
        data:['计划金额','实际金额','完成率']
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '计划金额',
          min: 0,
          max: 500000,
          interval: 50000,
          axisLabel: {
            formatter: '{value} 元'
          }
        },
        {
          type: 'value',
          name: '完成率',
          min: 0,
          max: 200,
          interval: 20,
          axisLabel: {
            formatter: '{value} %'
          }
        }
      ],
      series: [
        {
          name:'计划金额',
          type:'bar',
          data:data[0]
        },
        {
          name:'实际金额',
          type:'bar',
          data:data[1]
        },
        {
          name:'完成率',
          type:'line',
          yAxisIndex: 1,
          data:data[2]
        }
      ]
    };

    myChart.setOption(option);
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

    getData('getHistory', { suc : renderChart });
  };
  // End public method /initModule/

  // return public methods
  return { initModule : initModule }
  // --------------------------- END PUBLIC METHODS --------------------------
}());
