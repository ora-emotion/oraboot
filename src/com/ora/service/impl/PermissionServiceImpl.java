package com.ora.service.impl;

import com.ora.dao.PermissionDao;
import com.ora.po.Permission;
import com.ora.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("permissionService")
@Transactional
public class PermissionServiceImpl implements PermissionService {
    //依赖注入
    @Autowired
    private PermissionDao permissionDao;
    //模糊查询权限
    @Override
    public List<Permission> selectPermission(String user_uname) {
        return permissionDao.selectPermission(user_uname);
    }
    //修改权限
    public Integer updatePermission(Permission permission){
        return permissionDao.updatePermission(permission);
    }
    //通过职级查询权限
    @Override
    public List<Permission> findPermission(Integer position) {
        return permissionDao.findPermission(position);
    }
    //根据id查询权限
    @Override
    public Permission selectPermissionById(Integer id) {
        return permissionDao.selectPermissionById(id);
    }
}
