package com.ora.dao;

import com.ora.po.Permission;
import org.apache.ibatis.annotations.Param;

import java.util.List;

//权限控制dao层接口
public interface PermissionDao {
    //模糊查询权限
    public List<Permission> selectPermission(@Param("user_uname") String user_uname);
    //修改用户权限
    public Integer updatePermission(Permission permission);
    //查询所有权限
    public List<Permission> findPermission(@Param("user_position") Integer user_position);
    //根据id查询权限
    public Permission selectPermissionById(Integer id);
}
