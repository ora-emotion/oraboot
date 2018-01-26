package com.ora.controller;

import com.ora.po.Customer;
import com.ora.po.Performance;
import com.ora.po.User;
import com.ora.service.PerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
public class PerformanceController {

	// 依赖注入
	@Autowired
	private PerformanceService performanceService;

	// 个人业绩 -- 添加业绩
	@RequestMapping("/addPerformance")
	@ResponseBody
	public List<Performance> addPerformance(@RequestBody Performance performance, Model model) {
		System.out.println(performance);
		Integer user_id = performance.getUser_id();
		String cnumber = performance.getPnumber();
		Customer customer = performanceService.selectCustomerByCnumber(cnumber);
		if (customer == null) {
			model.addAttribute("msg", "没有该学员编号");
		} else {
			int rows = performanceService.addPerformance(performance);
			model.addAttribute("msg", "添加业绩成功");
		}
		List<Performance> performances = performanceService.selectPerformance(user_id);
		return performances;
	}

	@RequestMapping("/checkPnumber")
	@ResponseBody
	public Boolean checkPnumber(@RequestBody Performance performance) {
		String cnumber = performance.getPnumber();
		Customer customer = performanceService.selectCustomerByCnumber(cnumber);
		if (customer == null) {
			return false;
		} else {
			return true;
		}
	}

	// 个人业绩 -- 删除业绩
	@RequestMapping("/deletePerformance")
	@ResponseBody
	public List<Performance> deletePerformance(@RequestBody Performance performance) {
		Integer user_id = performance.getUser_id();
		int rows = performanceService.deletePerformance(performance);
		List<Performance> performances = performanceService.selectPerformance(user_id);
		return performances;
	}

	// 个人业绩 -- 查询全部
	@RequestMapping("/selectPerformance")
	@ResponseBody
	public List<Performance> selectPerformance(@RequestBody Performance performance) {
		Integer user_id = performance.getUser_id();
		List<Performance> performances = performanceService.selectPerformance(user_id);
		return performances;
	}

	// 个人业绩 -- 模糊查询该学员姓名的业绩
	@RequestMapping("/findPerformanceByPnumber")
	@ResponseBody
	public List<Performance> findPerformanceByPnumber(@RequestBody Performance performance, HttpSession session) {
		User user = (User) session.getAttribute("USER_SESSION");
		Integer user_id = user.getUid();
		String pnumber = performance.getPnumber();
		List<Performance> performances1 = performanceService.findPerformanceByPnumber(pnumber);
		List<Performance> performances2 = new ArrayList<Performance>();
		for (Performance performance1 : performances1) {
			if (user_id.equals(performance1.getUser_id())) {
				performances2.add(performance1);
			}
		}
		return performances2;
	}
}
