package com.ora.service;

import com.ora.po.Customer;
import com.ora.po.User;

import java.util.List;

public interface CustomerService {
    //查询根据学员名查询学员
    public List<Customer> selectCustomerByname(List<String> unames);
    //验证学院编号是否存在
    public Customer findCnumberByCnumber(Integer cnumber);
    //验证导师姓名是否存在
    public User findUserByUname(String uname);
    //添加学员
    public int addCustomer(Customer customer);
    //查询主管下所有导师
    public List<String> findUnameBySupperior(String uname);
    //主管查询所有学员
    public List<Customer> findCustomerByZhuguan(List<String> uname);
    //查询所有学员
    public List<Customer> findAllCustomer();
    //模糊查询导师名和学员编号
    public List<Customer> selectCustomerByCustomer(Customer customer);
    //查询所有用户数
    public int selectCustomerCount(List<String> uname);
    //分页查询
    public List<Customer> selectCustomerLimit(Integer nops);
    //修改用户信息
    public int updateCustomer(Customer customer);
    //根据职级查询员工姓名
    public List<String> selectUnameByPosition(Integer position);
    //根据cid查询客户在修改前的信息
	public Customer selectCustomerByCid(Integer cid);

	//备份冻结时间
    public int updateFreezeCopy(Customer customer);
}
