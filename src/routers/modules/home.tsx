// import React from "react";
// import lazyLoad from "@/routers/util/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import Home from "@/views/home/index";
import Trademark from "@/views/trademark/index";
import Softwork from "@/views/softwork/index";

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
			}
		]
	}
];

export default homeRouter;
