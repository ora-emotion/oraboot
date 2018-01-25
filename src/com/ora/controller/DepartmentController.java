package com.ora.controller;

import com.ora.po.Department;
import com.ora.po.User;
import com.ora.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Controller
public class DepartmentController {
	@Autowired
	private DepartmentService departmentService;

	public Department publicDepartment(Integer did) {
		List<User> users = departmentService.selectUserByDid(did);
		Double deplan = 0.0;
		Double dereality = 0.0;
		Integer deupdatecusts = 0;
		for (int i = 0; i < users.size(); i++) {
			deplan += users.get(i).getPlan();
			dereality += users.get(i).getReality();
			deupdatecusts += users.get(i).getUpdatecusts();
		}
		Department department = new Department();
		department.setDplan(deplan);
		department.setDreality(dereality);
		department.setDupdatecusts(deupdatecusts);
		department.setDid(did);

		int rows = departmentService.updateDepartmentPerformance(department);
		Department department1 = departmentService.selectPerformanceByDid(did);
		if (department1 != null) {
			if (department1.getDplan() != 0) {
				DecimalFormat df = new DecimalFormat("#.00");
				double a = department1.getDreality() / department1.getDplan() * 100;
				String b = df.format(a);
				double c = Double.parseDouble(b);
				department1.setDrate(c);
			} else {
				department1.setDrate(0.0);
			}
		}
		return department1;
	}

	@RequestMapping("/selectPerformanceByDid")
	@ResponseBody
	public List<Department> selectPerformanceByDid(HttpSession session, Model model) {
		User user = (User) session.getAttribute("USER_SESSION");
		Integer did = user.getDepartment_id();
		Integer position = user.getPosition();
		if (position >= 3) {
			List<Department> departments = new ArrayList<Department>();
			Department department1 = publicDepartment(1);
			Department department2 = publicDepartment(2);
			if (department1 != null) {
				departments.add(department1);
			}
			if (department2 != null) {
				departments.add(department2);
			}
			return departments;

		} else {
			List<Department> departments = new ArrayList<Department>();
			Department department = publicDepartment(did);
			if (department != null) {
				departments.add(department);
			}
			return departments;
		}
	}


}
