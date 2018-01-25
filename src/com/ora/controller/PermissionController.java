package com.ora.controller;

import com.ora.po.Permission;
import com.ora.po.User;
import com.ora.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    //模糊查询权限
    @RequestMapping("/selectPermission")
    @ResponseBody
    public List selectPermission(@RequestBody Permission permission,HttpSession session){
        String user_uname = permission.getUser_uname();
        User user = (User)session.getAttribute("USER_SESSION");
        Integer position = user.getPosition();
        List<Permission> permissions = permissionService.selectPermission(user_uname);
        List<Permission> permissions1 = new ArrayList<Permission>();
        if(position >=4){
            return permissions;
        }else{
            for (Permission permission1 : permissions){
                if (permission1.getUser_position()<3){
                    permissions1.add(permission1);
                }
            }
            return permissions1;
        }
    }

    //修改权限
    @RequestMapping("/updatePermission")
    @ResponseBody
    public List<Permission> updatePermission(@RequestBody Permission permission, HttpSession session){

        User user = (User)session.getAttribute("USER_SESSION");
        Integer user_position = user.getPosition();
        Integer id = permission.getId();
        Integer position = permission.getUser_position();
        Permission permission1 = permissionService.selectPermissionById(id);
        Integer position1 = permission1.getUser_position();
        if (position < user_position&&position1<user_position){
            Integer rows = permissionService.updatePermission(permission);
        }
        List<Permission> permissions = permissionService.findPermission(position);
        return permissions;
    }

    //根据职级查询权限
    @RequestMapping("/findPermission")
    @ResponseBody
    public List<Permission> findAllPermission(@RequestBody Permission permission){
        Integer user_position = permission.getUser_position();
        List<Permission> permissions = permissionService.findPermission(user_position);
        return permissions;
    }
}
