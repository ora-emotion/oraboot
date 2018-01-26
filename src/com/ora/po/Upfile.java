package com.ora.po;

//用户文件实体类
public class Upfile {
    private Integer fid;        //文件id
    private String fname;       //文件名
    private String uname;       //上传人
    private String cust_cnumber;    //学员编号
    private String update_time; //上传时间

    public Integer getFid() {
        return fid;
    }

    public void setFid(Integer fid) {
        this.fid = fid;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(String update_time) {

        this.update_time = update_time;
    }

    public String getCust_cnumber() {
        return cust_cnumber;
    }

    public void setCust_cnumber(String cust_cnumber) {
        this.cust_cnumber = cust_cnumber;
    }

    public Upfile(){


    }

    public Upfile(Integer fid, String fname, String uname, String cust_cnumber, String update_time) {
        this.fid = fid;
        this.fname = fname;
        this.uname = uname;
        this.cust_cnumber = cust_cnumber;
        this.update_time = update_time;
    }
}
