// import React from "react";
// import lazyLoad from "@/routers/util/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import Home from "@/views/home/index";
import Trademark from "@/views/trademark/index";
import Softwork from "@/views/softwork/index";
import Contract from "@/views/contract/index";
import File from "@/views/file/index";
import Account from "@/views/account/index";
import License from "@/views/license/index";

// 首页模块
const homeRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/index",
				// element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
				element: <Home />,
				meta: {
					requiresAuth: true,
					title: "首页",
					key: "home"
				}
			},
			{
				path: "/trademark/index",
				element: <Trademark />,
				meta: {
					requiresAuth: true,
					title: "商标管理",
					key: "trademark"
				}
			},
			{
				path: "/softwork/index",
				element: <Softwork />,
				meta: {
					requiresAuth: true,
					title: "软著管理",
					key: "softwork"
				}
			},
			{
				path: "/contract/index",
				element: <Contract />,
				meta: {
					requiresAuth: true,
					title: "合同管理",
					key: "contract"
				}
			},
			{
				path: "/license/index",
				element: <License />,
				meta: {
					requiresAuth: true,
					title: "营业执照管理",
					key: "license"
				}
			},
			{
				path: "/file/index",
				element: <File />,
				meta: {
					requiresAuth: true,
					title: "文件管理",
					key: "file"
				}
			},
			{
				path: "/account/index",
				element: <Account />,
				meta: {
					requiresAuth: true,
					title: "账户管理",
					key: "account"
				}
			}
		]
	}
];

export default homeRouter;
