package com.ora.service;

import java.util.List;

import com.ora.po.Performance;

public interface PerformanceCopyService {

	List<Performance> selectDayPerformance(Performance performance);

	List<Performance> selectDepartmentPerformance(Performance performance);

}
