package com.ora.service;

import com.ora.po.Permission;
import com.ora.po.User;

import java.util.List;

public interface PermissionService {
    //模糊查询权限
    public List<Permission> selectPermission(String user_uname);
    //修改权限
    public Integer updatePermission(Permission permission);
    //查询所有导师权限
    public List<Permission> findPermission(Integer position);
    //根据id查询权限
    public Permission selectPermissionById(Integer id);
}
