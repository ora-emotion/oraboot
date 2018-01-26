package com.ora.service;

import java.util.List;

import com.ora.po.History;

public interface HistoryService {

	public List<History> findHistory();

	public List<History> findDepartmentHistory(Integer udepartment);
}
