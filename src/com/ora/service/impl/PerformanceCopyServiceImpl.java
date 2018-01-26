package com.ora.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ora.dao.PerformanceCopyDao;
import com.ora.po.Performance;
import com.ora.service.PerformanceCopyService;



@Service("performanceCopyService")
@Transactional
public class PerformanceCopyServiceImpl implements PerformanceCopyService {

	@Autowired
	private PerformanceCopyDao performanceCopyDao;
	
	
	@Override
	public List<Performance> selectDayPerformance(Integer user_id) {
		// TODO Auto-generated method stub
		return performanceCopyDao.selectDayPerformance(user_id);
	}

    
}
