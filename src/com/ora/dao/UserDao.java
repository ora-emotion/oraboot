package com.ora.dao;

import com.ora.po.Permission;
import com.ora.po.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

//员工dao层接口
public interface UserDao {
	// 验证员工姓名是否已存在
	public String selectUnameByUname(@Param("uname") String uname);

	// 验证用户名是否存在
	public String selectLoginName(@Param("loginname") String loginname);

	// 员工注册
	public int addUser(User user);

	// 登录-->通过账号密码查询用户
	public User findUser(@Param("loginname") String loginname, @Param("password") String password);

	//修改最后登录时间
	public Integer updateLoginDate(User user);

	// 验证账号、密保问题和答案
	public User selectEncrypted(@Param("loginname") String loginname, @Param("encrypted_id") String encrypted_id,
                                @Param("encrypted_result") String encrypted_result);

	// 设置密码
	public int setPassword(@Param("id") Integer id, @Param("password") String password);



	// 通过上级领导名查询所有员工
	public List<User> selectAllUserBySupperior(@Param("uname") String uname);

	// 通过uid查询员工个人信息
	public User findUserByUid(Integer uid);

	// 通过id修改员工信息
	public int updateUserByUid(User user);

	// 查询当前登录员工的权限
	public Permission findUserPermission(Integer user_id);

	// 修改计划业绩金额
	public int updatePlan(User user);

	// 查询所有员工
	public List<User> selectAllUser();

	// 查询所有员工业绩，超级管理员除外
	public List<User> selectAllPerformance();

	// 查询当前登录人其下的所有员工业绩
	public List<User> selectUserByUser(User user);

	// 查根据姓名模糊查询用户业绩
	public List<User> selectUserByUname(String uname);

	// 查询主管和部门
	public List<User> selectSupervisor(Integer department_id);

	// 查询员工和部门
	public List<User> selectUserDepart(Integer department_id);

	// 删除用户
	public Boolean deleteUser(Integer u);

	// 备份数据
	public Integer insertHistory(User user);

	// 清空数据
	public Integer updateUserPerformancePlan(Integer uid);

	//根据查询超级管理员姓名
	public String findSuperUname();

	//根据传进来的姓名修改直属上级
	public Integer updateSupperior(User user);
	public Integer updateCustomerUname(User user);
	public Integer updatePermissionUname(User user);
}
