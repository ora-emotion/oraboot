package com.ora.po;

import java.io.Serializable;
import java.text.DecimalFormat;
import java.util.Date;

public class User implements Serializable{
    private static final long serLONG = 1L;
    private Integer uid;            //员工id
    private Integer number;         //编号
    private String loginname;       //登录名
    private String password;        //密码
    private String uname;           //姓名
    private String usex;            //性别
    private String ubirthday;       //出生年月日
    private String utel;            //电话
    private String uwechat;         //微信
    private String idcode;          //身份证号
    private Integer position;       //职位
    private String supperior;       //上级领导
    private Integer complaint;      //投诉次数
    private String remark;          //备注
    private String createDate;      //创建时间
    private String updateDate;      //最后时间更新
    private String entryTime;       //入职时间
    private String encrypted_id;    //密保id
    private String encrypted_result;//密保答案
    private Integer permission_id;  //权限id
    private String birthplace;      //籍贯
    private String certificate;     //专业证书
    private Double plan;            //月计划业绩金额
    private Double reality;         //实际完成业绩金额
    private Double rate;            //完成率
    private Integer updatecusts;    //升级的用户数
    private Integer department_id;  //部门id
    private String date;              //备份的月份
    private Integer service;		//是否为客服

    public static long getSerLONG() {
        return serLONG;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getLoginname() {
        return loginname;
    }

    public void setLoginname(String loginname) {
        this.loginname = loginname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getUsex() {
        return usex;
    }

    public void setUsex(String usex) {
        this.usex = usex;
    }

    public String getUbirthday() {
        return ubirthday;
    }

    public void setUbirthday(String ubirthday) {
        this.ubirthday = ubirthday;
    }

    public String getUtel() {
        return utel;
    }

    public void setUtel(String utel) {
        this.utel = utel;
    }

    public String getUwechat() {
        return uwechat;
    }

    public void setUwechat(String uwechat) {
        this.uwechat = uwechat;
    }

    public String getIdcode() {
        return idcode;
    }

    public void setIdcode(String idcode) {
        this.idcode = idcode;
    }

    public Integer getComplaint() {
        return complaint;
    }

    public void setComplaint(Integer complaint) {
        this.complaint = complaint;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }

    public String getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(String entryTime) {
        this.entryTime = entryTime;
    }

    public String getEncrypted_id() {
        return encrypted_id;
    }

    public void setEncrypted_id(String encrypted_id) {
        this.encrypted_id = encrypted_id;
    }

    public String getEncrypted_result() {
        return encrypted_result;
    }

    public void setEncrypted_result(String encrypted_result) {
        this.encrypted_result = encrypted_result;
    }

    public Integer getPermission_id() {
        return permission_id;
    }

    public void setPermission_id(Integer permission_id) {
        this.permission_id = permission_id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public String getSupperior() {
        return supperior;
    }

    public void setSupperior(String supperior) {
        this.supperior = supperior;
    }

    public String getBirthplace() {
        return birthplace;
    }

    public void setBirthplace(String birthplace) {
        this.birthplace = birthplace;
    }

    public String getCertificate() {
        return certificate;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }

    public Double getPlan() {
        return plan;
    }

    public void setPlan(Double plan) {
        this.plan = plan;
    }

    public Double getReality() {
        return reality;
    }

    public void setReality(Double reality) {
        this.reality = reality;
    }

    public Double getRate() {
        double r = 0.0;
        if (plan != 0){
            rate = reality/plan*100;
            DecimalFormat df=new DecimalFormat("#.00");
            String a = df.format(rate);
            r = Double.parseDouble(a);
        }else{
            r = 0.00;
        }
        return r;
    }

    public Integer getUpdatecusts() {
        return updatecusts;
    }

    public void setUpdatecusts(Integer updatecusts) {
        this.updatecusts = updatecusts;
    }

    public Integer getDepartment_id() {
        return department_id;
    }

    public void setDepartment_id(Integer department_id) {
        this.department_id = department_id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

	public Integer getService() {
		return service;
	}

	public void setService(Integer service) {
		this.service = service;
	}

    @Override
    public String toString() {
        return "User{" +
                "uid=" + uid +
                ", number=" + number +
                ", loginname='" + loginname + '\'' +
                ", password='" + password + '\'' +
                ", uname='" + uname + '\'' +
                ", usex='" + usex + '\'' +
                ", ubirthday='" + ubirthday + '\'' +
                ", utel='" + utel + '\'' +
                ", uwechat='" + uwechat + '\'' +
                ", idcode='" + idcode + '\'' +
                ", position=" + position +
                ", supperior='" + supperior + '\'' +
                ", complaint=" + complaint +
                ", remark='" + remark + '\'' +
                ", createDate='" + createDate + '\'' +
                ", updateDate='" + updateDate + '\'' +
                ", entryTime='" + entryTime + '\'' +
                ", encrypted_id='" + encrypted_id + '\'' +
                ", encrypted_result='" + encrypted_result + '\'' +
                ", permission_id=" + permission_id +
                ", birthplace='" + birthplace + '\'' +
                ", certificate='" + certificate + '\'' +
                ", plan=" + plan +
                ", reality=" + reality +
                ", rate=" + rate +
                ", updatecusts=" + updatecusts +
                ", department_id=" + department_id +
                ", date='" + date + '\'' +
                ", service=" + service +
                '}';
    }
}