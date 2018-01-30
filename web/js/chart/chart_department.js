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
    stateMap = {},
    jqueryMap = {},

    setJqueryMap, getData, renderChart, renderBranchData, onClick, initModule
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
        if (data.length === 0) { alert('暂无数据'); return false; }

        $('.chart-wrap .chart').remove();
        $('.chart-wrap').append('<div class="chart"></div>');

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
    var i, myChart, option, month_arr = [];

    for (i = 0; i < data[0].length; i++) {
      month_arr.push(i + 1 + '月');
    }

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
          data: month_arr,
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

  // Begin DOM method /renderBranchData/
  renderBranchData = function (data) {
    var i, myChart, option, month_arr = [];

    for (i = 0; i < data[0][0].length; i++) {
      // 获取总月份
      month_arr.push(i + 1 + '月');
    }

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
        data:[
          '一部计划金额(元)',
          '二部计划金额(元)',
          '一部实际金额(元)',
          '二部实际金额(元)',
          '一部完成率(%)',
          '二部完成率(%)'
        ]
      },
      xAxis: [
        {
          type: 'category',
          data: month_arr,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '金额',
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
          name:'一部计划金额(元)',
          type:'bar',
          data:data[0][0]
        },
        {
          name:'二部计划金额(元)',
          type:'bar',
          data:data[1][0]
        },
        {
          name:'一部实际金额(元)',
          type:'bar',
          data:data[0][1]
        },
        {
          name:'二部实际金额(元)',
          type:'bar',
          data:data[1][1]
        },
        {
          name:'一部完成率(%)',
          type:'line',
          yAxisIndex: 1,
          data:data[0][2]
        },
        {
          name:'二部完成率(%)',
          type:'line',
          yAxisIndex: 1,
          data:data[1][2]
        }
      ]
    };

    myChart.setOption(option);

  };
  // End DOM method /renderBranchData/
  // ----------------------------- END DOM METHODS ---------------------------

  // -------------------------- BEGIN EVENT HANDLERS -------------------------
  onClick = function () {
    $('.chart-nav').unbind('click').click(function (event) {
      var target = event.target || window.event.target;

      switch ( $(target).attr('data-item') ) {
        case '0' :
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          $('.chart_nav_item:nth-child(1)').addClass('chart_nav_item_active');
          // 获取部门图表数据
          getData('getHistory', { suc : renderChart });
          break;
        case '1' :
          $('.chart_nav_item').removeClass('chart_nav_item_active');
          $('.chart_nav_item:nth-child(2)').addClass('chart_nav_item_active');
          // 获取分部对比数据
          getData('findDepartmentHistory', { suc : renderBranchData });
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
  initModule = function ($container) {
    stateMap.$container = $container;
    setJqueryMap();

    getData('getHistory', { suc : renderChart });
    onClick();
  };
  // End public method /initModule/

  // return public methods
  return { initModule : initModule };
  // --------------------------- END PUBLIC METHODS --------------------------
}());
