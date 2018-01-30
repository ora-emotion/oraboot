package com.ora.dao;

import java.util.List;

import com.ora.po.Performance;

public interface PerformanceCopyDao {
  
	//查询个人之前月份的每日业绩
	public List<Performance> selectDayPerformance(Performance performance);

	//查询部门之前月的每日业绩
	public List<Performance> selectDepartmentPerformance(Performance performance);
}
