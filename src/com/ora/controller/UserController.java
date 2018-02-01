package com.ora.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.ora.po.Permission;
import com.ora.po.User;
import com.ora.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//员工控制器
@Controller

public class UserController {
	// 依赖注入
	@Autowired
	private UserService userService;

	// 注册
	@RequestMapping(value = "/register")
	public String addUser(User user, Model model) {
		Date date = new Date();
		Timestamp timestamp = new Timestamp(date.getTime());
		String createDate = timestamp.toString();
		user.setCreateDate(createDate);
		String uname = user.getUname();
		String uname1 = userService.selectUnameByUname(uname);
		String loginname = user.getLoginname();
		String loginname1 = userService.selectLoginName(loginname);
		if(user.getRemark() == null || user.getRemark() == ""){
			user.setRemark("无");
		}
		if(user.getBirthplace() == null || user.getBirthplace() == ""){
			user.setBirthplace("无");
		}
		if(user.getCertificate() == null || user.getCertificate() == ""){
			user.setCertificate("无");
		}
		if (uname1 != null) {
			model.addAttribute("msg", "姓名已存在");
			return "register";
		} else if (loginname1 != null) {
			model.addAttribute("msg", "用户名已存在");
			return "register";
		} else {
			int rows = userService.addUser(user);
			if (rows > 0) {
				model.addAttribute("msg", "注册成功，请登录");
				return "login";
			} else {
				model.addAttribute("msg", "注册失败，请重新注册");
				return "register";
			}
		}
	}

	// 验证员工姓名是否已存在
	@RequestMapping("/user/checkUname")
	@ResponseBody
	public Boolean checkUname(@RequestBody User user) {
		String uname = user.getUname();
		String uname1 = userService.selectUnameByUname(uname);
		if (uname1 != null) {
			return false;
		} else {
			return true;
		}
	}

	// 验证登录名是否已存在
	@RequestMapping("/user/checkLoginname")
	@ResponseBody
	public Boolean checkLoginname(@RequestBody User user) {
		String loginname = user.getLoginname();
		String loginname1 = userService.selectLoginName(loginname);
		if (loginname1 != null) {
			return false;
		} else {
			return true;
		}
	}

	// 用户登录
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(String loginname, String password, Model model, HttpSession session) {
		// 通过账号密码查询用户
		User user = userService.findUser(loginname, password);
		if (user != null) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
			Date date = new Date();
			User user1 = new User();
			user1.setLoginDate(sdf.format(date));
			user1.setUid(user.getUid());
			Integer rows = userService.updateLoginDate(user1);
			if(rows >0){
				System.out.println("记录时间成功");
			}else{
				System.out.println("记录时间失败");
			}
			if (user.getService() == 0) {
				Integer user_id = user.getUid();
				Permission permission = userService.findUserPermission(user_id);
				// 将用户对象添加到session中
				session.setAttribute("USER_SESSION", user);
				session.setAttribute("PERMISSION", permission);
				// 跳转到主页面
				return "customer";
			} else {
				Integer user_id = user.getUid();
				Permission permission = userService.findUserPermission(user_id);
				// 将用户对象添加到session中
				session.setAttribute("USER_SESSION", user);
				session.setAttribute("PERMISSION", permission);
				// 跳转到主页面
				return "user";
			}

		}
		model.addAttribute("msg", "账号或密码错误，请重新输入！");
		return "login";
	}

	// 退出登录
	@RequestMapping(value = "/logout")
	public String logout(HttpSession session, Model model) {
		User user = (User) session.getAttribute("USER_SESSION");
		// 清除session
		session.invalidate();
		// 添加退出登录
		model.addAttribute("msg", "已退出 " + user.getUname() + " 的账号");
		// 重定向到登录面
		return "login";
	}

	// 找回密码
	@RequestMapping(value = "/findp")
	@ResponseBody
	public User findP(@RequestBody User user, Model model, HttpSession session) {
		String loginname = user.getLoginname();
		String encrypted_id = user.getEncrypted_id();
		String encrypted_result = user.getEncrypted_result();
		User user1 = userService.selectEncrypted(loginname, encrypted_id, encrypted_result);
		return user1;
	}

	// 设置密码
	@RequestMapping(value = "/setp")
	@ResponseBody
	public Boolean setPassword(@RequestBody User user, Model model) {
		Integer uid = user.getUid();
		String password = user.getPassword();
		int rows = userService.setPassword(uid, password);
		if (rows > 0) {
			return true;
		} else {
			return false;
		}
	}

	// 根据当前uname查询所有导师
	@RequestMapping(value = "/user/list")
	@ResponseBody
	public List findAllUserBySupperior(@RequestBody User user) {
		String uname = user.getUname();
		List<User> users = userService.selectAllUserBySupperior(uname);
		return users;
	}

	// 查看个人资料
	@RequestMapping(value = "/aboutme")
	@ResponseBody
	public User aboutme(HttpSession session) {
		User user = (User) session.getAttribute("USER_SESSION");
		Integer uid = user.getUid();
		User user1 = userService.findUserByUid(uid);
		return user1;
	}

	// 修改 (个人/员工) 资料 , 客服修改投诉次数和备注
	@RequestMapping("/updateme")
	@ResponseBody
	public Boolean updateMe(@RequestBody User user, HttpSession session, Model model) throws Exception {
		// 先查出库里的投诉次数
		User user1 = userService.findUserByUid(user.getUid());
		Integer complaint1 = user1.getComplaint();
		// 查询数据库里没有修改之前的user.uname
		String uname1 = user1.getUname();
		// 查询需要修改为的投诉次数
		try {
			Integer complaint = user.getComplaint();
			// 前端传进来的user.uname
			String uname = user.getUname();
			// 查看当前登陆人是不是客服
			User user2 = (User) session.getAttribute("USER_SESSION");
			Integer position = user2.getPosition();
			// 如果是客服
			if (position == 5) {
				// 执行修改
				if (complaint == 0 || complaint == null) {
					user.setComplaint(0);
				}
				int rows = userService.updateUserByUid(user);
				if (rows > 0) {
					model.addAttribute("msg", "修改成功");
					return true;
				} else {
					model.addAttribute("msg", "修改失败");
					return false;
				}
			} else {
				// 如果不是客服，就将原来库里的投诉次数再赋予给她
				complaint = complaint1;
				user.setComplaint(complaint);

				User user3 = new User();
				user3.setSupperior(uname);
				user3.setUname(uname1);
				int rows = userService.updateSupperior(user3);
				int rows1 = userService.updateCustomer(user3);
				int rows2 = userService.updatePermissionUname(user3);

				int rows3 = userService.updateUserByUid(user);
				if (rows3 > 0) {
					model.addAttribute("msg", "修改失败");
					return true;
				} else {
					model.addAttribute("msg", "修改失败");
					return false;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	// 修改计划金额
	@RequestMapping("/updatePlan")
	@ResponseBody
	public Boolean updatePlan(@RequestBody User user) {
		int rows = userService.updatePlan(user);
		if (rows > 0) {
			return true;
		} else {
			return false;
		}
	}

	// 查询当前登录人的业绩
	@RequestMapping("/user/performance")
	@ResponseBody
	public List<User> selectUserPerformance(HttpSession session) {
		User user = (User) session.getAttribute("USER_SESSION");
		Integer position = user.getPosition();
		String uname = user.getUname();
		User user1 = new User();
		user1.setPosition(position);
		if (position > 2) {
			List<User> users = userService.selectUserByUser(user1);
			return users;
		} else {
			user1.setUname(uname);
			List<User> users = userService.selectUserByUser(user1);
			return users;
		}
	}

	// 根据姓名模糊查询导师业绩
	@RequestMapping("/user/selectPerformance")
	@ResponseBody
	public List<User> selectUserByUname(@RequestBody User user, HttpSession session) {
		User user1 = (User) session.getAttribute("USER_SESSION");
		String uname = user.getUname();
		Integer position = user1.getPosition();
		String superiorUname = user1.getUname();
		List<User> users2 = new ArrayList<User>();
		if (position >= 3) {
			List<User> users = userService.selectUserByUname(uname);

			for (User user2 : users) {
				if (user2.getPosition() < user1.getPosition()) {
					users2.add(user2);
				}
			}
			return users2;
		} else {
			List<User> users = userService.selectUserByUname(uname);
			List<User> users1 = userService.selectAllUserBySupperior(superiorUname);
			for (User user2 : users) {
				for (User user3 : users1) {
					if (user2.getUname().equals(user3.getUname())) {
						users2.add(user2);
					}
				}
			}
			return users2;
		}
	}

	// 查询当前导师uid查询业绩并跳转页面
	@RequestMapping(value = "/Pmself", method = RequestMethod.GET)
	public String toPmself(@RequestParam("uid") Integer uid, Model model) throws ServletException, IOException {
		User user = userService.findUserByUid(uid);

		if (user != null) {
			model.addAttribute("user_plan", user.getPlan());
			model.addAttribute("user_reality", user.getReality());
			model.addAttribute("user_updatecusts", user.getUpdatecusts());
			model.addAttribute("user_rate", user.getRate());
			model.addAttribute("user_id", user.getUid());
			return "pmself";
		} else {
			return null;
		}

	}

	// 超级管理员 --> 查询总监
	@RequestMapping("/user/root/selectMajordomo")
	@ResponseBody
	public List<User> selectMajordomo(HttpSession session) {
		User user = (User) session.getAttribute("USER_SESSION");
		String uname = user.getUname();
		Integer position = user.getPosition();
		if (position == 5) {
			String uname1 = userService.findSuperUname();
			List<User> users = userService.selectAllUserBySupperior(uname1);
			return users;
		} else {
			List<User> users = userService.selectAllUserBySupperior(uname);
			return users;
		}
	}

	// 查询主管和部门
	@RequestMapping("/user/root/selectSupervisor")
	@ResponseBody
	public List<User> selectSupervisor(@RequestBody User user) {
		Integer department_id = user.getDepartment_id();
		List<User> users = userService.selectSupervisor(department_id);
		return users;
	}

	// 查询部门下的员工
	@RequestMapping("/user/selectUserDepart")
	@ResponseBody
	public List<User> selectUserDepart(@RequestBody User user) {
		Integer department_id = user.getDepartment_id();
		List<User> users = userService.selectUserDepart(department_id);
		return users;
	}

	// 删除员工
	@RequestMapping("/user/delete")
	@ResponseBody
	public Boolean deleteUser(@RequestBody User user) {
		Integer uid = user.getUid();
		Boolean result = userService.deleteUser(uid);
		return result;
	}


	//跨域请求测试
	@RequestMapping(value = "/testJsonp",method = { RequestMethod.GET })
	@ResponseBody
	public Object test(String callback) throws IOException {
		JSONPObject jsonpObject = null;
		//数据
		List<User> users = userService.selectAllUser();
		jsonpObject = new JSONPObject(callback,users);
		return jsonpObject;
	}

}
