package com.ora.service;

import com.ora.po.Permission;
import com.ora.po.User;

import java.util.List;

//员工业务逻辑接口
public interface UserService {
    //注册
    public int addUser(User user);
    //登录
    public User findUser(String loginname, String password);
    //修改最后登录时间
    public Integer updateLoginDate(User user);
    //验证密保问题
    public User selectEncrypted(String loginname, String encrypted_id, String encrypted_result);
    //设置密码
    public int setPassword(Integer uid, String password);
    //根据当前登录人的姓名查询其下所有员工
    public List<User> selectAllUserBySupperior(String uname);
    //根据uid查询个人资料
    public User findUserByUid(Integer uid);
    //根据uid修改个人资料
    public int updateUserByUid(User user);
    //查询当前登录用户的权限
    public Permission findUserPermission(Integer user_id);
    //修改计划金额
    public int updatePlan(User user);
    //查询所有用户
    public List<User> selectAllUser();
    //查询所有员工业绩，超级管理员除外
    public List<User> selectAllPerformance();
    //根据姓名模糊查询员工业绩
    public List<User> selectUserByUname(String uname);
    //查询当前登录人其下的所有员工业绩
    public List<User> selectUserByUser(User user);
    //查询主管和部门
    public List<User> selectSupervisor(Integer department_id);
    //查询员工和部门
    public List<User> selectUserDepart(Integer department_id);
    //删除员工
    public Boolean deleteUser(Integer uid);
    //验证用户姓名是否已存在
    public String selectUnameByUname(String uname);
    //验证用户名是否存在
    public String selectLoginName(String loginname);
    //备份数据
    public Integer insertHistory(User user);
    //清空数据
    public Integer updateUserPerformance(User user);
    //根据查询超级管理员姓名
    public String findSuperUname();
    //修改直属上级姓名
    public Integer updateSupperior(User user);
    public Integer updateCustomer(User user);
    public Integer updatePermissionUname(User user);
}

