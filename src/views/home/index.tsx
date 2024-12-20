import { useState, useEffect } from "react";
import { getPatents } from "@/api/modules/login";

import Search from "./components/Search";
import Table from "./components/Table";

export default function Customer() {
	const [params, setParams] = useState<any>({
		current: 1,
		limit: 10
	});

	const [total, setTotal] = useState(0);

	const [list, setList] = useState<any>([]);
	const [allData, setAllData] = useState<any>([]);

	const getList = async () => {
		const { data } = await getPatents();
		if (Array.isArray(data)) {
			setList(data || []);
			setAllData(data || []);
			setTotal(data.length);
		}
	};

	useEffect(() => {
		getList();
	}, []);

	useEffect(() => {
		handleSearch();
	}, [params]);

	const handleSearch = async () => {
		if (allData.length > 0) {
			console.log("allData", allData, params);
			const data = allData.filter((item: any) => {
				const { title, applyNum, state } = params;

				if (title) {
					return item.title.includes(title);
				}
				if (applyNum) {
					return item.applyNum.includes(applyNum);
				}
				if (state) {
					return item.state.includes(state);
				}

				return item;
			});
			setList(data);
			setTotal(data.length);
			return;
		}
		// const { data } = await getPatents();
		// if (Array.isArray(data)) {
		// 	setList(data || []);
		// 	setTotal(data.length);
		// }
	};

	return (
		<div>
			<Search setParams={setParams} />
			<Table handleSearch={handleSearch} params={params} setParams={setParams} list={list} total={total} />
		</div>
	);
}
