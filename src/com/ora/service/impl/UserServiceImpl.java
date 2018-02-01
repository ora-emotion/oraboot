package com.ora.service.impl;

import com.ora.dao.UserDao;
import com.ora.po.Permission;
import com.ora.po.User;
import com.ora.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

//业务逻辑接口实现类
@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

    //依赖注入
    @Autowired
    private UserDao userDao;

    //注册
    public int addUser(User user) {
        return userDao.addUser(user);
    }

    //登录
    @Override
    public User findUser(String loginname, String password) {
        User user = userDao.findUser(loginname, password);
        return user;
    }

    //修改最后登录时间
    @Override
    public Integer updateLoginDate(User user) {
        return userDao.updateLoginDate(user);
    }

    //验证密保问题
    @Override
    public User selectEncrypted(String loginname, String encrypted_id, String encrypted_result) {
        User user = userDao.selectEncrypted(loginname, encrypted_id, encrypted_result);
        return user;
    }

    //设置密码
    public int setPassword(Integer uid, String password) {
        return userDao.setPassword(uid, password);
    }

    //根据当前登录者姓名查询其下所有员工
    @Override
    public List<User> selectAllUserBySupperior(String uname) {
        return userDao.selectAllUserBySupperior(uname);
    }

    //根据uid查询个人资料
    @Override
    public User findUserByUid(Integer uid) {
        return userDao.findUserByUid(uid);
    }

    //根据uid修改个人资料
    public int updateUserByUid(User user) {
        return userDao.updateUserByUid(user);
    }

    //查询当前登录用户的权限
    @Override
    public Permission findUserPermission(Integer user_id) {
        return userDao.findUserPermission(user_id);
    }

    //修改计划金额
    @Override
    public int updatePlan(User user) {
        return userDao.updatePlan(user);
    }

    //查询所有用户
    @Override
    public List<User> selectAllUser() {
        return userDao.selectAllUser();
    }

    //查询所有员工业绩，超级管理员除外
    @Override
    public List<User> selectAllPerformance() {
        return userDao.selectAllPerformance();
    }

    //根据姓名模糊查询导师
    @Override
    public List<User> selectUserByUname(String uname) {
        return userDao.selectUserByUname(uname);
    }

    //查询当前登录人下所有导师业绩
    @Override
    public List<User> selectUserByUser(User user) {
        return userDao.selectUserByUser(user);
    }

    //查询主管和部门
    @Override
    public List<User> selectSupervisor(Integer department_id) {
        return userDao.selectSupervisor(department_id);
    }

    //查询员工和部门
    @Override
    public List<User> selectUserDepart(Integer department_id) {
        return userDao.selectUserDepart(department_id);
    }

    //删除员工
    @Override
    public Boolean deleteUser(Integer uid) {
        return userDao.deleteUser(uid);
    }

    //验证用户姓名是否已存在
    @Override
    public String selectUnameByUname(String uname) {
        return userDao.selectUnameByUname(uname);
    }

    //验证用户名是否存在
    @Override
    public String selectLoginName(String loginname) {
        return userDao.selectLoginName(loginname);
    }

    //定期备份数据
    @Override
    public Integer insertHistory(User user) {
        return userDao.insertHistory(user);
    }

    //清空数据
    @Override
    public Integer updateUserPerformancePlan(Integer uid) {
        return userDao.updateUserPerformancePlan(uid);
    }

    //根据查询超级管理员姓名
    @Override
    public String findSuperUname() {
        return userDao.findSuperUname();
    }

    //修改直属上级姓名
    @Override
    public Integer updateSupperior(User user) {
        return userDao.updateSupperior(user);
    }

    @Override
    public Integer updateCustomer(User user) {
        return userDao.updateCustomerUname(user);
    }

    @Override
    public Integer updatePermissionUname(User user) {
        return userDao.updatePermissionUname(user);
    }

}


