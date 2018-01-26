package com.ora.service;

import com.ora.po.Customer;
import com.ora.po.Performance;

import java.util.List;

public interface PerformanceCopyService {

	List<Performance> selectDayPerformance(Integer user_id);

}
