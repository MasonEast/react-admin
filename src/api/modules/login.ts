import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
// import qs from "qs";

import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	// return http.post<Login.ResLogin>(PORT1 + `/userDO/doLogin?username=${params.username}&password=${params.password}`);
	return http.post<Login.ResLogin>(PORT1 + `/userDO/doLogin`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	// return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	// return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

// * 获取按钮权限
export const getAuthorButtons = () => {
	return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`);
};

// * 获取菜单列表
export const getMenuList = () => {
	return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`);
};

export const getPatents = (params: any) => {
	return http.get<any[]>(PORT1 + `/patentDO/getPatents`, params);
};

export const addPatents = (p: any) => {
	return http.post<any[]>(PORT1 + `/patentDO/add`, p);
};

export const updatePatents = (p: any) => {
	return http.put<any[]>(PORT1 + `/patentDO/edit`, p);
};

export const deletePatents = (p: any) => {
	return http.delete<any[]>(PORT1 + `/patentDO/delete`, p);
};

export const uploadPatents = (p: any) => {
	return http.post<any[]>(PORT1 + `/patentDO/uploadPatentFile`, p);
};
