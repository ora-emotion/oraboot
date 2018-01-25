package com.ora.service;

import com.ora.po.Department;
import com.ora.po.User;

import java.util.List;

public interface DepartmentService {
    public int updateDepartmentPerformance(Department department);
    public Department selectPerformanceByDid(Integer did);
    public List<User> selectUserByDid(Integer did);
}
