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
    configMap = {},
    stateMap = { $container : null },
    jqueryMap = {},

    setJqueryMap, renderChart, initModule
  ;
  // ----------------------- END MODULE SCOPE VARIABLES ----------------------

  // -------------------------- BEGIN UTILITY METHODS ------------------------
  // example: getTrimmedString...
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
  renderChart = function () {
    var myChart, option;

    myChart = echarts.init(document.getElementsByClassName('chart')[0]);

    option = {};

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
  };
  // End public method /initModule/

  // return public methods
  return {initModule: initModule}
  // --------------------------- END PUBLIC METHODS --------------------------
}());
