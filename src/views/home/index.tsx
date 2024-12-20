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
	// const [allData, setAllData] = useState<any>([]);

	// const getList = async () => {
	// 	const { data } = await getPatents();
	// 	if (Array.isArray(data)) {
	// 		setList(data || []);
	// 		// setAllData(data || []);
	// 		setTotal(data.length);
	// 	}
	// };

	// useEffect(() => {
	// 	getList();
	// }, []);

	useEffect(() => {
		handleSearch();
	}, [params]);

	const handleSearch = async () => {
		const { title, applyNum, state } = params;
		const { data }: any = await getPatents();

		// if (data.length > 0 && (title || applyNum || state)) {
		const v = data.filter((item: any) => {
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
		setList(v);
		setTotal(v.length);
		// return;
		// }
	};

	return (
		<div>
			<Search setParams={setParams} />
			<Table handleSearch={handleSearch} params={params} setParams={setParams} list={list} total={total} />
		</div>
	);
}
