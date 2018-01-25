package com.ora.service.impl;

import com.ora.dao.DepartmentDao;
import com.ora.po.Department;
import com.ora.po.User;
import com.ora.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("departmentService")
@Transactional
public class DepartmentServiceImpl implements DepartmentService{

    @Autowired
    private DepartmentDao departmentDao;

    @Override
    public int updateDepartmentPerformance(Department department) {
        return departmentDao.updateDepartmentPerformance(department);
    }

    @Override
    public Department selectPerformanceByDid(Integer did) {
        return departmentDao.selectPerformanceByDid(did);
    }

    @Override
    public List<User> selectUserByDid(Integer did) {
        return departmentDao.selectUsersByDid(did);
    }
}
