package com.ora.po;

public class History {
    private Integer hid;            //备份id
    private Integer uid;            //员工id
    private String uname;           //员工姓名
    private Integer uposition;      //员工职级
    private Integer udepartment;    //员工部门
    private Double uplan;          //计划金额
    private Double ureality;       //实际金额
    private Double urate;           //完成率
    private Integer updatecusts;    //升级人次
    private String hdate;           //备份月份

    public Integer getHid() {
        return hid;
    }

    public void setHid(Integer hid) {
        this.hid = hid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public Integer getUposition() {
        return uposition;
    }

    public void setUposition(Integer uposition) {
        this.uposition = uposition;
    }

    public Integer getUdepartment() {
        return udepartment;
    }

    public void setUdepartment(Integer udepartment) {
        this.udepartment = udepartment;
    }

    public Double getUplan() {
        return uplan;
    }

    public void setUplan(Double uplan) {
        this.uplan = uplan;
    }

    public Double getUreality() {
        return ureality;
    }

    public void setUreality(Double ureality) {
        this.ureality = ureality;
    }

    public Double getUrate() {
        return urate;
    }

    public void setUrate(Double urate) {
        this.urate = urate;
    }

    public Integer getUpdatecusts() {
        return updatecusts;
    }

    public void setUpdatecusts(Integer updatecusts) {
        this.updatecusts = updatecusts;
    }

    public String getHdate() {
        return hdate;
    }

    public void setHdate(String hdate) {
        this.hdate = hdate;
    }

    @Override
    public String toString() {
        return "History{" +
                "hid=" + hid +
                ", uid=" + uid +
                ", uname='" + uname + '\'' +
                ", uposition=" + uposition +
                ", udepartment=" + udepartment +
                ", uplan=" + uplan +
                ", ureality=" + ureality +
                ", urate=" + urate +
                ", updatecusts=" + updatecusts +
                ", hdate='" + hdate + '\'' +
                '}';
    }
}
