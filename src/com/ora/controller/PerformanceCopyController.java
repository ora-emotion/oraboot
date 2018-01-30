package com.ora.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ora.po.Performance;
import com.ora.po.User;
import com.ora.service.PerformanceCopyService;

@Controller
public class PerformanceCopyController {

	@Autowired
	private PerformanceCopyService performanceCopyService;

	// 根据当前时间查询月份
	static final String[] getDate() throws ParseException {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		// 当前时间的上个月
		Calendar c = Calendar.getInstance();
		c.setTime(new Date());
		c.add(Calendar.MONTH, -1);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		System.out.println(c.getTime());
		String prev = sdf.format(c.getTime());

		// 定义开始时间
		String first = "2018-01-01";

		// 求开始时间到结束时间的月份相差个数
		Calendar bef = Calendar.getInstance();
		Calendar aft = Calendar.getInstance();
		bef.setTime(sdf.parse(prev));
		aft.setTime(sdf.parse(first));
		int result = aft.get(Calendar.MONTH) - bef.get(Calendar.MONTH);
		int month = (aft.get(Calendar.YEAR) - bef.get(Calendar.YEAR)) * 12;
		int i = Math.abs(month + result);// 相差数，用来确定创建数组的长度
		// 创建数组，保存需要的所有日期
		String[] hdate = new String[i + 1];

		// 循环输出日期
		Date d1 = sdf.parse(first);// 定义起始日期
		Date d2 = sdf.parse(prev);// 定义结束日期
		int a = 0;
		Calendar dd = Calendar.getInstance();// 定义日期实例
		dd.setTime(d1);// 设置日期起始时间
		while (dd.getTime().before(d2)) {// 判断是否到结束日期
			String str = sdf.format(dd.getTime());
			hdate[a] = str;
			dd.add(Calendar.MONTH, 1);// 进行当前日期月份加1
			a++;
		}
		// -------------------------------------------------
		return hdate;
	}

	// 计算当前月份的天数
	static final List<String> computeDay(String date) throws ParseException {
		List<String> days = new ArrayList<String>();
		Integer day = 0;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = sdf.parse(date);

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date1);
		Integer year = calendar.get(Calendar.YEAR);
		Integer month = calendar.get(Calendar.MONTH) + 1;
		// 判断闰年的标准是:
		// 1、能整除4且不能整除100 2、能整除400
		if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
			if (month == 2) {
				day = 29;
			} else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10
					|| month == 12) {
				day = 31;
			} else {
				day = 30;
			}
		} else {
			if (month == 2) {
				day = 28;
			} else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10
					|| month == 12) {
				day = 31;
			} else {
				day = 30;
			}
		}

		for (int i = 1; i <= day; i++) {
			calendar.set(year, month - 1, i);
			Date date2 = calendar.getTime();
			days.add(sdf.format(date2));
		}
		return days;
	}

	// 将每月的所有天数的实际金额相加
	static final Double computeReality(List<Double> doubleList) {
		Double num = 0.0;
		for (Double d : doubleList) {
			num += d;
		}
		System.out.println(num);
		return num;
	}

	// 将每月的所有天数的实际金额相加
	static final Integer computeListRate(List<Integer> doubleList) {
		Integer num = 0;
		for (Integer d : doubleList) {
			num += d;
		}
		System.out.println(num);
		return num;
	}

	// 查询个人的每月业绩
	@RequestMapping("/selectMyMonthPerformance")
	@ResponseBody
	public List<List> selectMyMonthPerformance(HttpSession session) throws ParseException {
		User user = (User) session.getAttribute("USER_SESSION");
		Integer user_id = user.getUid();
		List<List> mymonths = new ArrayList<List>();
		String[] dates = getDate();
		List<Double> mymonth1 = new ArrayList<Double>();
		List<Integer> mymonth2 = new ArrayList<Integer>();
		for (String date : dates) {
			List<Double> realitys = new ArrayList<Double>();
			Integer i = 0;
			List<Integer> updateCusts = new ArrayList<Integer>();
			Double reality = 0.0;
			List<String> days = computeDay(date);

			Performance performance = new Performance();
			performance.setUser_id(user_id);
			for (String day : days) {
				performance.setPtime(day);
				List<Performance> performances = performanceCopyService.selectDayPerformance(performance);
				if (performances != null) {
					for (Performance performance1 : performances) {
						reality += performance1.getPmoney();
						i++;
					}
					realitys.add(reality);
					updateCusts.add(i);
					i = 0;
					reality = 0.0;
				} else {
					reality = 0.0;
					i = 0;
				}
			}
			Double comReality = computeReality(realitys);
			Integer comUpdate = computeListRate(updateCusts);
			mymonth1.add(comReality);
			mymonth2.add(comUpdate);
		}
		mymonths.add(mymonth1);
		mymonths.add(mymonth2);
		System.out.println(mymonths);
		return mymonths;
	}

	// 查询个人月份的每日业绩
	@RequestMapping("/selectMyDayPerformance")
	@ResponseBody
	public List<List> selectMyDayPerformance(HttpSession session, String date) throws ParseException {
		User user = (User) session.getAttribute("USER_SESSION");
		Integer user_id = user.getUid();
		List<Double> realitys = new ArrayList<Double>();
		Integer i = 0;
		List<Integer> updateCusts = new ArrayList<Integer>();
		Double reality = 0.0;
		List<String> days = computeDay(date);
		List<List> mymonth = new ArrayList<List>();
		Performance performance = new Performance();
		performance.setUser_id(user_id);
		for (String day : days) {
			performance.setPtime(day);
			List<Performance> performances = performanceCopyService.selectDayPerformance(performance);
			if (performances != null) {
				for (Performance performance1 : performances) {
					reality += performance1.getPmoney();
					i++;
				}
				realitys.add(reality);
				updateCusts.add(i);
				i = 0;
				reality = 0.0;
			} else {
				reality = 0.0;
				i = 0;
			}
		}
		mymonth.add(realitys);
		mymonth.add(updateCusts);
		System.out.println(mymonth);
		return mymonth;
	}

	// 查询分部之前月份的每日业绩
	@RequestMapping("/selectDepartmentFDayPerformance")
	@ResponseBody
	public List<List> selectDepartmentFDayPerformance(@RequestBody Performance performance2) throws ParseException {
	    String date = performance2.getPtime();
	    Integer user_department = performance2.getUser_department();
		Performance performance = new Performance();
		List<List> departmentPerformance = new ArrayList<List>();
		List<Double> realitys = new ArrayList<Double>();
		// 完成人数
		Integer i = 0;
		List<Integer> updateCusts = new ArrayList<Integer>();
		// 完成业绩
		Double reality = 0.0;
		List<String> days = computeDay(date);
		performance.setUser_department(user_department);
		for (String day : days) {
			performance.setPtime(day);
			List<Performance> performances = performanceCopyService.selectDepartmentPerformance(performance);
			// System.out.println(performances);
			if (performances != null) {
				for (Performance performance1 : performances) {
					reality += performance1.getPmoney();
					i++;
				}
				realitys.add(reality);
				updateCusts.add(i);
				i = 0;
				reality = 0.0;

			} else {
				reality = 0.0;
				i = 0;
			}
		}
		departmentPerformance.add(realitys);
		departmentPerformance.add(updateCusts);

		// System.out.println(departmentPerformance);

		return departmentPerformance;
	}

	// 查询总部之前月份的每日业绩
	@RequestMapping("/selectDepartmentDayPerformance")
	@ResponseBody
	public List<List> selectDepartmentDayPerformance(@RequestBody Performance performance) throws Exception {
	    String date = performance.getPtime();
	    Performance performance1 = new Performance();
	    Performance performance2 = new Performance();
	    performance1.setPtime(date);
	    performance1.setUser_department(1);
	    performance2.setPtime(date);
	    performance2.setUser_department(2);

		System.out.println(date);
		Double reality1 = 0.0;
		Double reality2 = 0.0;
		Double reality = 0.0;
		Integer updateCusts1 = 0;
		Integer updateCusts2 = 0;
		Integer updateCust = 0;
		List<List> DepartmentPerformance = new ArrayList<List>();
		List<Double> realitise = new ArrayList<Double>();
		List<Integer> updateCusts = new ArrayList<Integer>();
		// 查询1部某一月的所有天数的业绩
		List<List> DepartmentPerformances1 = selectDepartmentFDayPerformance(performance1);
		// 查询2部某一月的所有天数的业绩
		List<List> DepartmentPerformances2 = selectDepartmentFDayPerformance(performance2);
		List<Double> Departmentreality1 = DepartmentPerformances1.get(0);
		List<Double> Departmentreality2 = DepartmentPerformances2.get(0);
		List<Integer> DepartmentupdateCusts1 = DepartmentPerformances1.get(1);
		List<Integer> DepartmentupdateCusts2 = DepartmentPerformances2.get(1);
		// 每天业绩金额
		for (int i = 0; i < Departmentreality1.size(); i++) {
			reality1 = Departmentreality1.get(i);
			reality2 = Departmentreality2.get(i);
			reality = reality1 + reality2;
			realitise.add(reality);
		}
		// 每天升级人次
		for (int i = 0; i < DepartmentupdateCusts1.size(); i++) {
			updateCusts1 = DepartmentupdateCusts1.get(i);
			updateCusts2 = DepartmentupdateCusts2.get(i);
			updateCust = updateCusts1 + updateCusts2;
			updateCusts.add(updateCust);
		}
		DepartmentPerformance.add(realitise);
		DepartmentPerformance.add(updateCusts);
		return DepartmentPerformance;
	}

}
