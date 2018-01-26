package com.ora.dao;

import com.ora.po.Customer;
import com.ora.po.Performance;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PerformanceCopyDao {
  
	//查询个人之前月份的每日业绩
	public List<Performance> selectDayPerformance(Performance performance);
}
