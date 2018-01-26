package com.ora.controller;

import com.ora.po.Customer;
import com.ora.po.User;
import com.ora.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	// 静态方法
	//没有冻结过的学院计算剩余时间
	static final long getSydate(Integer serdata, String bmtime) throws ParseException {
		long sydate = 0;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		Date bmdate = sdf.parse(bmtime);
		sydate = serdata - (date.getTime() - bmdate.getTime()) / (24 * 60 * 60 * 1000);
		return sydate;
	}
	//查询学员时计算剩余时间
	static final List<Customer> jisuan(List<Customer> customers) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		for(Customer customer : customers){
			String state = customer.getState();
			Date unfreeze = customer.getUnfreeze();
			Date bmdate = sdf.parse(customer.getBmtime());
			long sydata = customer.getSydata();
			if(customer.getFreeze() != null||customer.getSydata()!=0){
				if(unfreeze != null){
					long sydate = sydata-((date.getTime()-unfreeze.getTime())/(24*60*60*1000));
					customer.setSydata(sydate);
				}
			}else{
				if(state.equals("停止服务")||state.equals("服务已过期")){
					customer.setSydata(0);
				}else{
					long sydate = customer.getSerdata() - ((date.getTime() - bmdate.getTime())/(24*60*60*1000));
					customer.setSydata(sydate);
				}
			}
		}
		return customers;
	}

	// 根据导师姓名或学员姓名查询学员
	@RequestMapping("/customer/select")
	@ResponseBody
	public List findCustomer(@RequestBody Customer customer, HttpSession session) {
		User user = (User) session.getAttribute("USER_SESSION");
		String cname = customer.getCname();
		String uname = user.getUname();
		List<String> unames = customerService.findUnameBySupperior(uname);
		unames.add(uname);
		List<Customer> customers = customerService.selectCustomerByname(unames);
		List<Customer> customers1 = new ArrayList<Customer>();
		for (Customer customer1 : customers) {
			if (cname.equals(customer1.getCname())) {
				customers1.add(customer1);
			}
		}
		return customers1;
	}

	// 验证用户编号是否存在
	@RequestMapping("/customer/checkCnumber")
	@ResponseBody
	public Boolean checkCnumber(@RequestBody Customer customer) throws ParseException {
		Integer cnumber = customer.getCnumber();
		Customer customer1 = customerService.findCnumberByCnumber(cnumber);
		if (customer1 != null) {
			return false;
		}
		return true;
	}

	// 验证导师姓名是否存在
	@RequestMapping("/customer/checkUname")
	@ResponseBody
	public Boolean checkUname(@RequestBody Customer customer, HttpSession session) {
		String uname = customer.getUname();
		User user2 = customerService.findUserByUname(uname);
		if (user2 != null) {
			return true;
		} else {
			return false;
		}

	}

	// 添加
	@RequestMapping("/customer/add")
	@ResponseBody
	public Boolean addCustomer(@RequestBody Customer customer, Model model, HttpSession session) throws Exception {
		Integer cnumber = customer.getCnumber();
		try {
			String scheme = customer.getScheme();
			if(scheme == null || scheme == ""){
				customer.setScheme("未完成");
			}
			if(customer.getRemark() == null||customer.getRemark() == ""){
				customer.setRemark("无");
			}
			Customer customer1 = customerService.findCnumberByCnumber(cnumber);
			String uname = customer.getUname();
			User user1 = (User) session.getAttribute("USER_SESSION");
			customer.setInsertUser(user1.getUname());
			User user2 = customerService.findUserByUname(uname);

			if(customer.getState().equals("冻结服务")){
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Integer serdate = customer.getSerdata();
				Date bmdate = sdf.parse(customer.getBmtime());
				Date freeze = customer.getFreeze();
				long sydate = serdate - ((freeze.getTime()-bmdate.getTime())/(24*60*60*1000));
				customer.setSydata(sydate);
			}else{
				customer.setSydata(0);
			}

			if (customer1 != null) {
				model.addAttribute("msg", "用户编号已存在");
				return false;
			} else if (user2 == null) {
				model.addAttribute("msg", "导师姓名不存在");
				return false;
			} else {
				int rows = customerService.addCustomer(customer);
				if (rows > 0) {
					model.addAttribute("msg", "添加用户成功");
					return true;
				} else {
					model.addAttribute("msg", "添加用户失败");
					return false;
				}
			}
		} catch (Exception e) {
			return false;
		}
	}

	// 查询当前登录用户的学员
	@RequestMapping("/customer/zhuguan")
	@ResponseBody
	public List<Customer> findCustomerByZhuguan() throws Exception {
		List<Customer> customers = customerService.findAllCustomer();
		List<Customer> customers1 = jisuan(customers);
		return customers1;

	}

	// 根据导师名或学员编号模糊查询学员
	@RequestMapping("/customer/fuzzy")
	@ResponseBody
	public List<Customer> selectCustomerByCustomer(@RequestBody Customer customer, HttpSession session, Model model) throws ParseException {
		List<Customer> customers = customerService.selectCustomerByCustomer(customer);
		if (customers != null && customers.size() != 0) {
			List<Customer> customers1 = jisuan(customers);
			return customers1;
		}
		return null;
	}

	// 修改用户信息
	@RequestMapping("/customer/update")
	@ResponseBody
	public Boolean updateCustomer(@RequestBody Customer customer, Model model, HttpSession session) throws ParseException {
		User user = (User) session.getAttribute("USER_SESSION");
		String uname = user.getUname();
		customer.setUpdateUser(uname);
		Integer position = user.getPosition();
		Integer cid = customer.getCid();

		Integer cnumber = customer.getCnumber();
		Customer customer1 = customerService.findCnumberByCnumber(cnumber);
		String uname1 = customer.getUname();
		User user2 = customerService.findUserByUname(uname1);

		// 修改之前的客户信息
		Customer customer2 = customerService.selectCustomerByCid(cid);
		if(customer.getState().equals("正在服务")&&customer2.getState().equals("正在服务")){
			long sydata = getSydate(customer.getSerdata(), customer.getBmtime());
			if(sydata <= 0){
				customer.setState("服务已过期");
			}
		}

		// 冻结服务  改为   停止服务或已过期
		if(customer.getState().equals("停止服务")||customer.getState().equals("服务已过期")){
			if(customer2.getState().equals("冻结服务")){
				customer.setFreeze(customer2.getFreeze());
				customer.setSydataCopy(customer2.getSydata());
				customer.setSydata(0);
				customer.setUnfreeze(null);
			}
		}

		// 停止服务  改为   冻结服务
		if(customer2.getState().equals("停止服务")||customer2.getState().equals("服务已过期")){
			if(customer.getState().equals("冻结服务")) {
				customer.setSydata(customer2.getSydataCopy());
			}
		}

		if(customer2.getState().equals("停止服务")||customer2.getState().equals("服务已过期")){
			if(customer.getState().equals("正在服务")){

				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

				customer.setFreeze(customer2.getFreeze());
				customer.setUnfreeze(new Date());

				Date freeze = customer2.getFreeze();

				Date bmdate = sdf.parse(customer.getBmtime());

				Integer serdate = customer2.getSerdata();
				customer.setSydata(serdate - ((freeze.getTime()-bmdate.getTime())/(24*60*60*1000)));
			}
		}

		if(customer.getState().equals("服务已过期")&&customer2.getState().equals("服务已过期")){
			long sydata = getSydate(customer.getSerdata(), customer.getBmtime());
			if(sydata >=0){
				customer.setState("正在服务");
			}
		}

		if (customer.getState().equals("冻结服务") && customer2.getState().equals("正在服务")) {
			// 修改冻结时间
			customer.setFreeze(new Date());
			long sydata = getSydate(customer.getSerdata(), customer.getBmtime());
			customer.setUnfreeze(null);
			if(customer2.getSydata() == 0){
                customer.setSydata(sydata);
            }else{
				customer.setSydata(customer2.getSydata() - (new Date().getTime()-customer2.getUnfreeze().getTime())/(24*60*60*1000));
			}
		}

		if (customer2.getState().equals("冻结服务") && customer.getState().equals("正在服务")) {
			// 修改解冻时间
			customer.setUnfreeze(new Date());
			customer.setSydata(customer2.getSydata());
		}

		if (customer.getState().equals("停止服务") || customer.getState().equals("服务已过期")) {
			customer.setSydata(0);
			customer.setUnfreeze(null);
		}


		if (customer1 != null&&!customer1.getCid().equals(customer.getCid())) {
			model.addAttribute("msg", "用户编号已存在");
			return false;
		} else if (user2 == null) {
			model.addAttribute("msg", "导师姓名不存在");
			return false;
		} else {
			if (position > 2) {
				int rows1 = customerService.updateCustomer(customer);
				if (rows1 > 0) {
					model.addAttribute("msg", "修改用户信息成功");
					return true;
				} else {
					model.addAttribute("msg", "修改用户信息失败");
					return false;
				}
			} else {
				List<String> unames = customerService.findUnameBySupperior(uname);
				unames.add(uname);
				List<Customer> customers = customerService.selectCustomerByname(unames);
				for (Customer customer3 : customers) {
					if (cnumber.equals(customer3.getCnumber()) || cnumber == customer3.getCnumber()) {
						int rows = customerService.updateCustomer(customer);
						if (rows > 0) {
							model.addAttribute("msg", "修改用户信息成功");
							return true;
						} else {
							model.addAttribute("msg", "修改用户信息失败，请检查字段格式");
							return false;
						}
					}
				}
			}
			return false;
		}
	}

	// 分页查询
	@RequestMapping("/customer/paging")
	@ResponseBody
	public void findCustomerPaging(Integer pagination, HttpSession session) {
		User user = (User) session.getAttribute("USER_SESSION");
		String uname = user.getUname();
		List<String> unames = customerService.findUnameBySupperior(uname);
		unames.add(uname);
		int rows = customerService.selectCustomerCount(unames);
		int nops = rows % 10 > 0 ? rows / 10 + 1 : rows / 10;
		int nop = 0;
		if (pagination <= nops) {
			nop = pagination * 10;
		} else {
			nop = nops * 10;
		}
		List<Customer> customers = customerService.selectCustomerLimit(nop);
		// 未完待续

	}

}