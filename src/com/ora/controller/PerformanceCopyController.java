package com.ora.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ora.po.Performance;
import com.ora.po.User;
import com.ora.service.PerformanceCopyService;
import sun.misc.Perf;

@Controller
public class PerformanceCopyController {
	
	@Autowired
	private PerformanceCopyService performanceCopyService;

	//根据当前时间查询月份
	static final String[] getDate() throws ParseException {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		//当前时间的上个月
		Calendar c = Calendar.getInstance();
		c.add(Calendar.MONTH, -1);
		SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM");
		String prev = sdf.format(c.getTime());

		//定义开始时间
		String first = "2018-01-01";

		//求开始时间到结束时间的月份相差个数
		Calendar bef = Calendar.getInstance();
		Calendar aft = Calendar.getInstance();
		bef.setTime(sdf.parse(prev));
		aft.setTime(sdf.parse(first));
		int result = aft.get(Calendar.MONTH) - bef.get(Calendar.MONTH);
		int month = (aft.get(Calendar.YEAR) - bef.get(Calendar.YEAR)) * 12;
		int i = Math.abs(month + result);//相差数，用来确定创建数组的长度
		//创建数组，保存需要的所有日期
		String [] hdate = new String[i+1];

		//循环输出日期
		Date d1 = sdf.parse(first);//定义起始日期
		Date d2 = sdf.parse(prev);//定义结束日期
		int a = 0;
		Calendar dd = Calendar.getInstance();//定义日期实例
		dd.setTime(d1);//设置日期起始时间
		while (dd.getTime().before(d2)) {//判断是否到结束日期
			String str = sdf.format(dd.getTime());
			hdate[a] = str;
			dd.add(Calendar.MONTH, 1);//进行当前日期月份加1
			a++;
		}
		//-------------------------------------------------
		return hdate;
	}

	//计算当前月份的天数
	static final List<String> computeDay(String date) throws ParseException {
		List<String> days = new ArrayList<String>();
		Integer day = 0;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = sdf.parse(date);

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date1);
		Integer year = calendar.get(Calendar.YEAR);
		Integer month= calendar.get(Calendar.MONTH)+1;
		//判断闰年的标准是:
		//1、能整除4且不能整除100 2、能整除400
		if((year%4==0&&year%100!=0)||year%400==0) {
			if(month == 2){
				day = 29;
			}else if(month == 1||month == 3||month == 5||month == 7||month == 8||month == 10||month == 12){
				day = 31;
			}else{
				day = 30;
			}
		}else {
			if(month == 2){
				day = 28;
			}else if(month == 1||month == 3||month == 5||month == 7||month == 8||month == 10||month == 12){
				day = 31;
			}else{
				day = 30;
			}
		}

		for(int i = 1; i<=day; i++){
			calendar.set(year,month-1,i);
			Date date2 = calendar.getTime();
			days.add(sdf.format(date2));
		}
		return days;
	}

	//查询个人之前月份的每日业绩
	@RequestMapping("/selectDayPerformance")
	@ResponseBody
	public List<List> selectDayPerformance(HttpSession session) throws ParseException {
		User user = (User)session.getAttribute("USER_SESSION");
		Integer user_id = user.getUid();
		List<List> mymonths = new ArrayList<List>();
		String[] dates = getDate();
		for(String date : dates){
			List<Double> realitys = new ArrayList<>();
			Integer i = 0;
			List<Integer> updateCusts = new ArrayList<Integer>();
			Double reality = 0.0;
			List<String> days = computeDay(date);
			List<List> mymonth = new ArrayList<List>();
			Performance performance = new Performance();
			performance.setUser_id(user_id);
			for(String day : days){
				performance.setPtime(day);
				List<Performance> performances = performanceCopyService.selectDayPerformance(performance);
				if(performances != null){
					for(Performance performance1 : performances){
						reality+=performance1.getPmoney();
						i++;
					}
					realitys.add(reality);
					updateCusts.add(i);
					i = 0;
					reality = 0.0;
				}else{
					reality = 0.0;
					i = 0;
				}
			}
			mymonth.add(realitys);
			mymonth.add(updateCusts);
			mymonths.add(mymonth);
		}
		return mymonths;
	}
}
