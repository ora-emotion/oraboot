package com.ora.service.impl;

import com.ora.dao.PerformanceDao;
import com.ora.po.Customer;
import com.ora.po.Performance;
import com.ora.service.PerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("performanceService")
@Transactional
public class PerformanceServiceImpl implements PerformanceService {

    //依赖注入
    @Autowired
    private PerformanceDao performanceDao;

    //验证学员编号是否存在
    @Override
    public Customer selectCustomerByCnumber(String cnumber) {
        return performanceDao.selectCustomerByCnumber(cnumber);
    }

    //添加业绩
    @Override
    public int addPerformance(Performance performance) {
        return performanceDao.addPerformance(performance);
    }

    //删除业绩
    @Override
    public int deletePerformance(Performance performance) {
        return performanceDao.deletePerformance(performance);
    }

    //查询个人业绩
    @Override
    public List<Performance> selectPerformance(Integer user_id) {
        return performanceDao.selectPerformance(user_id);
    }

    //模糊查询
    @Override
    public List<Performance> findPerformanceByPnumber(String pnumber) {
        return performanceDao.findPerformanceByPnumber(pnumber);
    }

    //查询所有业绩（备份使用）
    @Override
    public List<Performance> selectAllPerformance() {
        return performanceDao.selectAllPerformance();
    }

    //备份数据
    @Override
    public Integer copyPerformance(Performance performance) {
        return performanceDao.copyPerformance(performance);
    }

    //删除数据
    @Override
    public Integer emptyPerformance(Integer id) {
        return performanceDao.emptyPerformance(id);
    }
}
