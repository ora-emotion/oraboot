package com.ora.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ora.po.Performance;
import com.ora.po.User;
import com.ora.service.PerformanceCopyService;

@Controller
public class PerformanceCopyController {
	
	@Autowired
	private PerformanceCopyService performanceCopyService;
	
	//查询个人之前月份的每日业绩
	@RequestMapping("/selectDayPerformance")
	@ResponseBody
	public List<List> selectDayPerformance(HttpSession session) throws ParseException{
		
		User user = (User) session.getAttribute("USER_SESSION");
		Integer user_id = 4;
		List<Performance> performances= performanceCopyService.selectDayPerformance(user_id);		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		List<Double> pmoneyList = new ArrayList<Double>();
		
		Double pmoneys = 0.0;
	
		for (Performance performance : performances) {
			if(performance.getPmoney() != null){
				pmoneys = performance.getPmoney();
				String ptime = performance.getPtime();
				//Date date = sdf.parse(ptime);
				
				for (Performance performance2 : performances) {
					if(performance2.getPmoney() != null){
						String ptime2 = performance2.getPtime();
						//Date date2 = sdf.parse(ptime2);
						//System.out.println(performance.getId()+"****"+performance2.getId());
						//System.out.println(performance.getPtime()+"---"+performance2.getPtime());
						if(ptime.equals(ptime2)&&performance.getId()!=performance2.getId()){
							pmoneys = pmoneys + performance2.getPmoney();
							pmoneyList.add(pmoneys);
							performance.setPmoney(null);
							performance2.setPmoney(null);
						}
						if(!ptime.equals(ptime2)&&performance.getPmoney()!=null){
							pmoneyList.add(performance.getPmoney());
							performance.setPmoney(null);
						}
					}
					
				}
			}
			
		}
		
		System.out.println(pmoneyList);
		return null;
	}
}
