package com.ora.po;

public class Permission {
    private Integer id;              //权限表id
    private Integer delete_file;     //删除文件权限
    private Integer delete_cust;     //删除学员权限
    private Integer update_cust;     //更新学员权限
    private Integer update_user;     //更新导师权限
    private Integer delete_user;     //删除导师权限
    private Integer permission_user; //授权权限
    private String user_uname;       //导师名
    private Integer user_position;   //导师职级
    private Integer user_id;         //导师id

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDelete_file() {
        return delete_file;
    }

    public void setDelete_file(Integer delete_file) {
        this.delete_file = delete_file;
    }

    public Integer getDelete_cust() {
        return delete_cust;
    }

    public void setDelete_cust(Integer delete_cust) {
        this.delete_cust = delete_cust;
    }

    public Integer getUpdate_cust() {
        return update_cust;
    }

    public void setUpdate_cust(Integer update_cust) {
        this.update_cust = update_cust;
    }

    public Integer getUpdate_user() {
        return update_user;
    }

    public void setUpdate_user(Integer update_user) {
        this.update_user = update_user;
    }

    public Integer getDelete_user() {
        return delete_user;
    }

    public void setDelete_user(Integer delete_user) {
        this.delete_user = delete_user;
    }

    public Integer getPermission_user() {
        return permission_user;
    }

    public void setPermission_user(Integer permission_user) {
        this.permission_user = permission_user;
    }

    public String getUser_uname() {
        return user_uname;
    }

    public void setUser_uname(String user_uname) {
        this.user_uname = user_uname;
    }

    public Integer getUser_position() {
        return user_position;
    }

    public void setUser_position(Integer user_position) {
        this.user_position = user_position;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }
}
