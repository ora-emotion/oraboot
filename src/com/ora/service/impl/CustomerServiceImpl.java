package com.ora.service.impl;

import com.ora.dao.CustomerDao;
import com.ora.po.Customer;
import com.ora.po.User;
import com.ora.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service("customerService")
@Transactional
public class CustomerServiceImpl implements CustomerService {
	@Autowired
	private CustomerDao customerDao;

	@Override
	public List<Customer> selectCustomerByname(List<String> unames) {
		return customerDao.findCustomerByName(unames);
	}

	@Override
	public Customer findCnumberByCnumber(Integer cnumber) {
		return customerDao.findCnumberByCnumber(cnumber);
	}

	@Override
	public User findUserByUname(String uname) {
		return customerDao.findUserByUname(uname);
	}

	@Override
	public int addCustomer(Customer customer) {
		return customerDao.addCustomer(customer);
	}

	@Override
	public List<String> findUnameBySupperior(String uname) {
		return customerDao.findUnameBySupperior(uname);
	}

	@Override
	public List<Customer> findCustomerByZhuguan(List<String> uname) {
		return customerDao.findCustomerByZhuguan(uname);
	}

	@Override
	public List<Customer> findAllCustomer() {
		return customerDao.findAllCustomer();
	}

	@Override
	public List<Customer> selectCustomerByCustomer(Customer customer) {
		return customerDao.selectCustomerByCustomer(customer);
	}

	@Override
	public int selectCustomerCount(List<String> uname) {
		return customerDao.selectCustomerCount(uname);
	}

	@Override
	public List<Customer> selectCustomerLimit(Integer nops) {
		return customerDao.selectCustomerLimit(nops);
	}

	@Override
	public int updateCustomer(Customer customer) {
		return customerDao.updateCustomer(customer);
	}

	@Override
	public List<String> selectUnameByPosition(Integer position) {
		return customerDao.selectUnameByPosition(position);
	}

	@Override
	public Customer selectCustomerByCid(Integer cid) {
		return customerDao.selectCustomerByCid(cid);
	}

	@Override
	public int updateFreezeCopy(Customer customer) {
		return customerDao.updateFreezeCopy(customer);
	}
}
