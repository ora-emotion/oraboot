package com.ora.po;

import java.text.DecimalFormat;

public class Department {
    private Integer did;                //部门id
    private String dname;               //部门名称
    private Double dplan;               //部门计划业绩
    private Double dreality;            //部门实际完成业绩
    private Double drate;                //部门完成率
    private Integer dupdatecusts;        //部门实际业绩人数

    public Integer getDid() {
        return did;
    }

    public void setDid(Integer did) {
        this.did = did;
    }

    public String getDname() {
        return dname;
    }

    public void setDname(String dname) {
        this.dname = dname;
    }

    public Double getDplan() {
        return dplan;
    }

    public void setDplan(Double dplan) {
        this.dplan = dplan;
    }

    public Double getDreality() {
        return dreality;
    }

    public void setDreality(Double dreality) {
        this.dreality = dreality;
    }

    public Double getDrate() {
        return drate;
    }

    public void setDrate(Double drate) {
        this.drate = drate;
    }

    public Integer getDupdatecusts() {
        return dupdatecusts;
    }

    public void setDupdatecusts(Integer dupdatecusts) {
        this.dupdatecusts = dupdatecusts;
    }
}
