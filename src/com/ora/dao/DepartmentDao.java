package com.ora.dao;

import com.ora.po.Department;
import com.ora.po.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DepartmentDao {
    //查询导师部业绩
    public Department selectPerformanceByDid(@Param("did") Integer did);
    //修改当前导师部的业绩
    public int updateDepartmentPerformance(Department department);
    //根据当前部门id查询所有员工
    public List<User> selectUsersByDid(@Param("did") Integer did);
}
