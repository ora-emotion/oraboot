package com.ora.dao;

import java.util.List;

import com.ora.po.History;

public interface HistoryDao {

	//查询一部计划金额，实际金额，完成率
	public List<History> findHistory();
	
	public List<History> findDepartmentHistory(Integer udepartment);
	
}
