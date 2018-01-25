package com.ora.job;

import com.ora.po.Performance;
import com.ora.po.User;
import com.ora.service.PerformanceService;
import com.ora.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class MyJob {

	@Autowired
	private UserService userService;
	@Autowired
	private PerformanceService performanceService;

	//备份数据
	//备份员工总数据
	public void insertHistory(){
		System.out.println(">-------------开始备份员工数据---------<");
		//查询所有user
		List<User> users = userService.selectAllUser();
		if(users.size()!=0&&users != null){
			Date date1 = new Date();
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date1);
			calendar.add(Calendar.MONTH,-1);
			Date cdate = calendar.getTime();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
			String date2 = sdf.format(cdate);
			System.out.println("时间："+date2);
			for (User user : users){
				user.setDate(date2);
				Integer rows = userService.insertHistory(user);
				if(rows<=0){
					System.out.println("添加  "+user.getUname()+" 失败");
				}
			}
		}
	}

	//备份业绩数据
	public void copyPerformance(){
		List<Performance> performances = performanceService.selectAllPerformance();
		int i = 0;
		for(Performance performance : performances){
			Integer rows = performanceService.copyPerformance(performance);
			i= i+1;
		}
		System.out.println("成功备份了 "+i+" 条业绩");
	}

	//删除业绩表中所有数据
	public void deletePerformance(){
		List<Performance> performances = performanceService.selectAllPerformance();
		int i = 0;
		for(Performance performance : performances){
			Integer rows = performanceService.emptyPerformance(performance.getId());
			i++;
		}
		System.out.println("成功删除了 "+i+" 条业绩");
	}

	//清空数据
	public void updateUserPerformance(){
		System.out.println("开始清空。。。");
		List<User> users = userService.selectAllUser();
		if(users!=null&& users.size()!=0){
			for(User user : users){
				Integer rows = userService.updateUserPerformance(user);
				if(rows >0){
					System.out.println("清空  "+user.getUname()+" 数据成功");
				}else{
					System.out.println("清空失败");
				}
			}
		}
	}
}
