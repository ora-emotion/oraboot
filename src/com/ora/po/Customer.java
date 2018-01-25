package com.ora.po;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


//客户实体类
public class Customer implements Serializable {
	private static final long seriLONG = 1L;
	private Integer cid; 			// 客户id
	private Integer cnumber; 		// 客户编号
	private String cname; 			// 客户姓名
	private Integer cage; 			// 客户年龄
	private String csex; 			// 客户性别
	private String bmtime; 			// 报名时间
	private Integer serdata; 		// 服务时间
	private long sydata; 			// 剩余时间
	private Double money; 			// 报名金额
	private String uname; 			// 所属导师
	private String sname; 			// 所属销售
	private String state; 			// 服务状态
	private String remark; 			// 备注
	private Integer file_id; 		// 文件id
	private String spec; 		   	// 规格
	private Integer department_id; 	// 部门
	private String scheme; 		   	// 方案
	private String moneyAndTime;	// 待补款及时间
	private String secondUpdate; 	// 二次升级
	private String type; 			// 课程类型
	private Date freeze;			//冻结时间
	private Date unfreeze;			//解冻时间
	private long sydataCopy;		//剩余时间备份
	private String insertUser;		//添加人
	private String updateUser;		//修改人

	

//	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//	Date date = new Date();

//	public long sy() throws ParseException {
//		Date date1 = sdf.parse(bmtime);
//		// 计算两天相减
//		long i = (date.getTime() - date1.getTime()) / (24 * 60 * 60 * 1000);
//		// 计算剩余时间
//		long j = serdata - i;
//		return j;
//	}

	public static long getSeriLONG() {
		return seriLONG;
	}

	public Integer getCid() {
		return cid;
	}

	public void setCid(Integer cid) {
		this.cid = cid;
	}

	public Integer getCnumber() {
		return cnumber;
	}

	public void setCnumber(Integer cnumber) {
		this.cnumber = cnumber;
	}

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
	}

	public Integer getCage() {
		return cage;
	}

	public void setCage(Integer cage) {
		this.cage = cage;
	}

	public String getCsex() {
		return csex;
	}

	public void setCsex(String csex) {
		this.csex = csex;
	}

	public String getBmtime() {
		return bmtime;
	}

	public void setBmtime(String bmtime) {
		this.bmtime = bmtime;
	}

	public Integer getSerdata() {
		return serdata;
	}

	public void setSerdata(Integer serdata) {
		this.serdata = serdata;
	}

	public long getSydata() {
		return sydata;
	}

	public Double getMoney() {
		return money;
	}
	
	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getSname() {
		return sname;
	}

	public void setSname(String sname) {
		this.sname = sname;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getFile_id() {
		return file_id;
	}

	public void setFile_id(Integer file_id) {
		this.file_id = file_id;
	}

	public String getSpec() {
		return spec;
	}

	public void setSpec(String spec) {
		this.spec = spec;
	}

	public Integer getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(Integer department_id) {
		this.department_id = department_id;
	}

	public String getScheme() {
		return scheme;
	}

	public void setScheme(String scheme) {
		this.scheme = scheme;
	}

	public String getMoneyAndTime() {
		return moneyAndTime;
	}

	public void setMoneyAndTime(String moneyAndTime) {
		this.moneyAndTime = moneyAndTime;
	}

	public String getSecondUpdate() {
		return secondUpdate;
	}

	public void setSecondUpdate(String secondUpdate) {
		this.secondUpdate = secondUpdate;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Date getFreeze() {
		return freeze;
	}

	public void setFreeze(Date freeze) {
		this.freeze = freeze;
	}

	public Date getUnfreeze() {
		return unfreeze;
	}

	public void setUnfreeze(Date unfreeze) {
		this.unfreeze = unfreeze;
	}

	public void setSydata(long sydata) {
		this.sydata = sydata;
	}

	public long getSydataCopy() {
		return sydataCopy;
	}

	public void setSydataCopy(long sydataCopy) {
		this.sydataCopy = sydataCopy;
	}

	public String getInsertUser() {
		return insertUser;
	}

	public void setInsertUser(String insertUser) {
		this.insertUser = insertUser;
	}

	public String getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

	@Override
	public String toString() {
		return "Customer{" +
				"cid=" + cid +
				", cnumber='" + cnumber + '\'' +
				", cname='" + cname + '\'' +
				", cage=" + cage +
				", csex='" + csex + '\'' +
				", bmtime='" + bmtime + '\'' +
				", serdata=" + serdata +
				", sydata=" + sydata +
				", money=" + money +
				", uname='" + uname + '\'' +
				", sname='" + sname + '\'' +
				", state='" + state + '\'' +
				", remark='" + remark + '\'' +
				", file_id=" + file_id +
				", spec='" + spec + '\'' +
				", department_id=" + department_id +
				", scheme='" + scheme + '\'' +
				", moneyAndTime='" + moneyAndTime + '\'' +
				", secondUpdate='" + secondUpdate + '\'' +
				", type='" + type + '\'' +
				", freeze=" + freeze +
				", unfreeze=" + unfreeze +
				", sydataCopy=" + sydataCopy +
				", insertUser='" + insertUser + '\'' +
				", updateUser='" + updateUser + '\'' +
				'}';
	}
}
