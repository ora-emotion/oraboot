package com.ora.dao;

import com.ora.po.Customer;
import com.ora.po.Performance;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PerformanceDao {
    //验证学员编号是否存在
    public Customer selectCustomerByCnumber(String cnumber);
    //添加业绩
    public int addPerformance(Performance performance);
    //删除业绩
    public int deletePerformance(Performance performance);
    //查询个人业绩
    public List<Performance> selectPerformance(Integer user_id);
    //模糊查询
    public List<Performance> findPerformanceByPnumber(String pnumber);
    //查询所有业绩（备份使用）
    public List<Performance> selectAllPerformance();
    //备份数据
    public Integer copyPerformance(Performance performance);
    //删除数据
    public Integer emptyPerformance(Integer id);
}
