package com.ora.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ora.dao.HistoryDao;
import com.ora.po.History;
import com.ora.service.HistoryService;

@Service("historyService")
@Transactional
public class HistoryServiceImpl implements HistoryService {

	@Autowired
	private HistoryDao historyDao;
	
	public List<History> findHistory(){
		
		return historyDao.findHistory();
	}

	@Override
	public List<History> findDepartmentHistory(Integer udepartment) {
		
		return historyDao.findDepartmentHistory(udepartment);
	}

	
}
