package com.ora.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

//跳转页面控制器
@Controller
public class PageJumpsController {

    //跳转注册页面
    @RequestMapping("/toRegister")
    public String toRegister(){
        return "register";
    }

    //向用户登录页面跳转
    @RequestMapping(value = "/toLogin")
    public String toLogin(){
        return "login";
    }

    //跳转到权限管理页面
    @RequestMapping("/toPermission")
    public String toPermission(){
        return "permission";
    }

    //跳转到员工管理页面
    @RequestMapping("/toUser")
    public String toUser(){
        return "user";
    }

    //跳转到客户管理页面
    @RequestMapping("/toCustomer")
    public String toCustomer(){
        return "customer";
    }

    //跳到找回密码页面
    @RequestMapping("/toFindpwd")
    public String toFindp(){
        return "findpwd";
    }

    //跳到上传文件页面
    @RequestMapping("/toFile")
    public String toFile(){
        return "fileUpload";
    }

    //跳转到个人业绩页面
    @RequestMapping("toPerformance")
    public String toPerformance(){
        return "performance";
    }

    //跳转到业绩管理
    @RequestMapping("/toPm")
    public String toPm(){
        return "pm";
    }

    //业绩管理跳转到个人业绩
    @RequestMapping("/toPmself")
    public String toPmself(){
        return "pmself";
    }

    //工资计算器
    @RequestMapping("/toGongzi")
    public String toGongzi(){
        return "gongzi";
    }
    //跳到导师测试页
    @RequestMapping("/toTestUser")
    public String toTestUser(){
        return "testUser";
    }
    //测试页面
    @RequestMapping("/toTest")
    public String toTest(){
    	return "test";
    }

    @RequestMapping("/toDC")
    public String toDC(){
        return "chart_department";
    }

    @RequestMapping("/toDCSelf")
    public String toDCSelf() { return "chart_self"; }
}
