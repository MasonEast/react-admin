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

// 商标
export const getTrademark = (params: any) => {
	return http.get<any[]>(PORT1 + `/trademarkDO/get`, params);
};

export const addTrademark = (p: any) => {
	return http.post<any[]>(PORT1 + `/trademarkDO/add`, p);
};

export const updateTrademark = (p: any) => {
	return http.put<any[]>(PORT1 + `/trademarkDO/edit`, p);
};

export const deleteTrademark = (p: any) => {
	return http.delete<any[]>(PORT1 + `/trademarkDO/delete`, p);
};

// 软著
export const getSoftwork = (params: any) => {
	return http.get<any[]>(PORT1 + `/softworkDO/get`, params);
};

export const addSoftwork = (p: any) => {
	return http.post<any[]>(PORT1 + `/softworkDO/add`, p);
};

export const updateSoftwork = (p: any) => {
	return http.put<any[]>(PORT1 + `/softworkDO/edit`, p);
};

export const deleteSoftwork = (p: any) => {
	return http.delete<any[]>(PORT1 + `/softworkDO/delete`, p);
};

// 合同

export const getContract = (params: any) => {
	return http.get<any[]>(PORT1 + `/contractDO/get`, params);
};

export const addContract = (p: any) => {
	return http.post<any[]>(PORT1 + `/contractDO/add`, p);
};

export const updateContract = (p: any) => {
	return http.put<any[]>(PORT1 + `/contractDO/edit`, p);
};

export const deleteContract = (p: any) => {
	return http.delete<any[]>(PORT1 + `/contractDO/delete`, p);
};

// 账户

export const getAccount = (params: any) => {
	return http.get<any[]>(PORT1 + `/accountDO/get`, params);
};

export const addAccount = (p: any) => {
	return http.post<any[]>(PORT1 + `/accountDO/add`, p);
};

export const updateAccount = (p: any) => {
	return http.put<any[]>(PORT1 + `/accountDO/edit`, p);
};

export const deleteAccount = (p: any) => {
	return http.delete<any[]>(PORT1 + `/accountDO/delete`, p);
};

// 营业执照

export const getLicense = (params: any) => {
	return http.get<any[]>(PORT1 + `/businessLicenseDO/get`, params);
};

export const addLicense = (p: any) => {
	return http.post<any[]>(PORT1 + `/businessLicenseDO/add`, p);
};

export const updateLicense = (p: any) => {
	return http.put<any[]>(PORT1 + `/businessLicenseDO/edit`, p);
};

export const deleteLicense = (p: any) => {
	return http.delete<any[]>(PORT1 + `/businessLicenseDO/delete`, p);
};

// 文件

export const getFile = (params: any) => {
	return http.get<any[]>(PORT1 + `/officialDocumentsDO/get`, params);
};

export const addFile = (p: any) => {
	return http.post<any[]>(PORT1 + `/officialDocumentsDO/add`, p);
};

export const updateFile = (p: any) => {
	return http.put<any[]>(PORT1 + `/officialDocumentsDO/edit`, p);
};

export const deleteFile = (p: any) => {
	return http.delete<any[]>(PORT1 + `/officialDocumentsDO/delete`, p);
};
