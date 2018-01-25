package com.ora.interceptor;

import com.ora.po.Permission;
import com.ora.po.User;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) throws Exception {
		String url = req.getRequestURI();
		// 获取url对比，如果是以下url就true放行
		if (url.indexOf("/login") >= 0 || url.indexOf("/register") >= 0 || url.indexOf("/zhaohui") >= 0
				|| url.indexOf("/toRegister") >= 0 || url.indexOf("/toLogin") >= 0 || url.indexOf("/toFindp") >= 0
				|| url.indexOf("/findp") >= 0 || url.indexOf("/setp") >= 0 || url.indexOf("/toPerformance") >= 0
				|| url.indexOf("/logout") >= 0 || url.indexOf("/toGongzi") >= 0 || url.indexOf("/user/checkUname") >= 0
				|| url.indexOf("/toTestUser") >= 0 || url.indexOf("/user/checkLoginname") >= 0||url.indexOf("/toTest")>=0
				|| url.indexOf("/fileAjax")>=0 ||url.indexOf("/getHistory")>=0 || url.indexOf("/getDepartHistory")>=0 || url.indexOf("/toDC") >= 0) {
			return true;
		}
		HttpSession session = req.getSession();
		User user = (User) session.getAttribute("USER_SESSION");
		Permission permission = (Permission) session.getAttribute("PERMISSION");
		Integer delete_file = permission.getDelete_file();
		Integer delete_cust = permission.getDelete_cust();
		Integer delete_user = permission.getDelete_user();
		Integer update_cust = permission.getUpdate_cust();
		Integer update_user = permission.getUpdate_user();
		Integer permission_user = permission.getPermission_user();
		if (user != null) {
			if (user.getPosition() < 5) {
				if (url.indexOf("/toCustomer") >= 0 || url.indexOf("/customer/select") >= 0
						|| url.indexOf("/customer/add") >= 0 || url.indexOf("/customer/fuzzy") >= 0
						|| url.indexOf("/customer/zhuguan") >= 0 || url.indexOf("/fileUpload") >= 0
						|| url.indexOf("/fileDownload") >= 0 || url.indexOf("/findFile") >= 0
						|| url.indexOf("/addPerformance") >= 0 || url.indexOf("/deletePerformance") >= 0
						|| url.indexOf("/selectPerformance") >= 0 || url.indexOf("/findPerformanceByPnumber") >= 0
						|| url.indexOf("/aboutme") >= 0 || url.indexOf("/updateme") >= 0
						|| url.indexOf("/user/performance") >= 0 || url.indexOf("/checkPnumber") >= 0
						||url.indexOf("/customer/checkCnumber")>=0||url.indexOf("/customer/checkUname")>=0) {
					return true;
				}
			}

			if (user.getPosition() >= 4) {
				if (url.indexOf("/user/root/selectMajordomo") >= 0) {
					return true;
				}
			}
			if (user.getPosition() > 1 && user.getService() == 0) {
				if (url.indexOf("/toUser") >= 0 || url.indexOf("/user/list") >= 0
						|| url.indexOf("/user/root/selectSupervisor") >= 0 || url.indexOf("/user/selectUserDepart") >= 0
						|| url.indexOf("/toPmself") >= 0 || url.indexOf("/Pmself") >= 0 || url.indexOf("/toPm") >= 0) {

					return true;
				}
			}
			if (user.getPosition() > 1 && user.getService() == 1) {
				if (url.indexOf("/toUser") >= 0 || url.indexOf("/user/list") >= 0
						|| url.indexOf("/user/root/selectSupervisor") >= 0
						|| url.indexOf("/user/selectUserDepart") >= 0
						|| url.indexOf("/aboutme") >= 0 || url.indexOf("/updateme") >= 0) {

					return true;
				}
			}

			if (permission != null) {
				if (update_user.equals(1)) {
					if (url.indexOf("/updatePlan") >= 0) {
						return true;
					}
				}
				if (delete_user.equals(1)) {
					if (url.indexOf("/user/delete") >= 0) {
						return true;
					}
				}
				if (delete_file.equals(1)) {
					if (url.indexOf("/fileRemove") >= 0) {
						return true;
					}
				}
				if (delete_cust.equals(1)) {
					if (url.indexOf("/customer/delete") >= 0) {
						return true;
					}
				}
				if (update_cust.equals(1)) {
					if (url.indexOf("/customer/update") >= 0) {
						return true;
					}
				}
				if (permission_user.equals(1)) {
					if (url.indexOf("/toPermission") >= 0 || url.indexOf("/updatePermission") >= 0
							|| url.indexOf("/selectPermission") >= 0 || url.indexOf("/findPermission") >= 0) {
						if (user.getPosition() > 2) {
							return true;
						}
					}
				}
				req.setAttribute("msg", "抱歉，您没有该权限");
				req.getRequestDispatcher("/WEB-INF/jsp/customer.jsp").forward(req, res);
				return false;
			}
			req.setAttribute("msg", "没有找到权限值,请联系管理员");
			req.getRequestDispatcher("/WEB-INF/jsp/customer.jsp").forward(req, res);
			return false;
		}
		req.setAttribute("msg", "您还没有登录，请先登录");
		req.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(req, res);
		return false;
	}

	@Override
	public void postHandle(HttpServletRequest req, HttpServletResponse res, Object handler, ModelAndView modelAndView)
			throws Exception {

	}

	@Override
	public void afterCompletion(HttpServletRequest req, HttpServletResponse res, Object handler, Exception modelAndView)
			throws Exception {

	}

}
