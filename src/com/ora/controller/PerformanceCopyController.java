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
		Integer user_id = 1;
		String date = "2018-02-01";
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
		System.out.println(mymonth);
		return mymonth;
	}
}
