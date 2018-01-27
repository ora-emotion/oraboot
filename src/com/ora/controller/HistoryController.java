package com.ora.controller;

import com.ora.po.History;
import com.ora.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Controller
public class HistoryController {
    @Autowired
    private HistoryService historyService;

    //根据当前时间查询月份
    static final String[] getDate() throws ParseException {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");

        //当前时间的上个月
        String prev = sdf.format(new Date());

        //定义开始时间
        String first = "2018-01";

        //求开始时间到结束时间的月份相差个数
        Calendar bef = Calendar.getInstance();
        Calendar aft = Calendar.getInstance();
        bef.setTime(sdf.parse(prev));
        aft.setTime(sdf.parse(first));
        int result = aft.get(Calendar.MONTH) - bef.get(Calendar.MONTH);
        int month = (aft.get(Calendar.YEAR) - bef.get(Calendar.YEAR)) * 12;
        int i = Math.abs(month + result);//相差数，用来确定创建数组的长度

        //创建数组，保存需要的所有日期
        String [] hdate = new String[i];

        //循环输出日期
        Date d1 = sdf.parse(first);//定义起始日期
        Date d2 = sdf.parse(prev);//定义结束日期
        int a = 0;
        Calendar dd = Calendar.getInstance();//定义日期实例
        dd.setTime(d1);//设置日期起始时间
        while (dd.getTime().before(d2)) {//判断是否到结束日期
            String str = sdf.format(dd.getTime());
            hdate[a] = String.valueOf(str);
            System.out.println(str);
            a = a + 1;
            dd.add(Calendar.MONTH, 1);//进行当前日期月份加1
        }
        //-------------------------------------------------
        return hdate;
    }

    //获取计划金额
    static final Double getUplan(List<History> histories,String hdate){
        Double uplan = 0.0;
        for(History history : histories){
            if(history.getHdate().equals(hdate)){
                uplan += history.getUplan();

            }
        }
        return uplan;
    }

    //获取实际金额
    static final Double getUreality(List<History> histories,String hdate){
        Double ureality = 0.0;
        for(History history : histories){
            if(history.getHdate().equals(hdate)){
                ureality += history.getUreality();
            }
        }
        return ureality;
    }

    //封装集合
    static final List<List> compute(List<History> histories) throws ParseException {
        List<List> result = new ArrayList<List>();
        Double urate = 0.0;
        List<Double> uplans = new ArrayList<Double>();
        List<Double> urealitys = new ArrayList<Double>();
        List<Double> urates = new ArrayList<Double>();
        String[] hdates = getDate();
        for(String date : hdates){
            Double uplan = getUplan(histories,date);
            Double ureality = getUreality(histories,date);
            Double rate = (Double)ureality/uplan;
            urate = Double.parseDouble(String.format("%.2f",rate));;
            uplans.add(uplan);
            urealitys.add(ureality);
            if(uplan!=0 && ureality!=0){
                urates.add(urate*100);
            }else{
                urates.add(0.0);
            }
        }
        result.add(uplans);
        result.add(urealitys);
        result.add(urates);
        return result;
    }

    @RequestMapping("/getHistory")
    @ResponseBody
    public List<List> findHistory() throws ParseException {
        List<History> histories = historyService.findHistory();
        List<List> result = compute(histories);
        return result;
    }
    @RequestMapping("/findDepartmentHistory")
    @ResponseBody
    public List<List> findDepartmentHistory() throws ParseException {

        List<History> dpartHis1 = historyService.findDepartmentHistory(1);
        List<List> re1 = compute(dpartHis1);
        List<History> dpartHis2 = historyService.findDepartmentHistory(2);
        List<List> re2 = compute(dpartHis2);
        List<List> result = new ArrayList<List>();

        result.add(re1);
        result.add(re2);
        return result;
    }
}
