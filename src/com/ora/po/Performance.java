package com.ora.po;


//业绩pojo类
public class Performance {
    private Integer id;             //业绩id
    private String pnumber;         //学员编号
    private Double pmoney;          //升级金额
    private String ptime;           //创建时间
    private Integer overtime;       //延长时间(天数)
    private String updateRemark;    //升级备注
    private Integer user_id;        //导师编号
    private Integer user_department;//导师所属部门
    private String user_name;		//导师姓名
    
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPnumber() {
        return pnumber;
    }

    public void setPnumber(String pnumber) {
        this.pnumber = pnumber;
    }

    public Double getPmoney() {
        return pmoney;
    }

    public void setPmoney(Double pmoney) {
        this.pmoney = pmoney;
    }

    public String getPtime() {
        return ptime;
    }

    public void setPtime(String ptime) {
        this.ptime = ptime;
    }

    public Integer getOvertime() {
        return overtime;
    }

    public void setOvertime(Integer overtime) {
        this.overtime = overtime;
    }

    public String getUpdateRemark() {
        return updateRemark;
    }

    public void setUpdateRemark(String updateRemark) {
        this.updateRemark = updateRemark;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

	public Integer getUser_department() {
		return user_department;
	}

	public void setUser_department(Integer user_department) {
		this.user_department = user_department;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
    
}
