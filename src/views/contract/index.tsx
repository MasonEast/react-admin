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

	useEffect(() => {
		handleSearch();
	}, [params]);

	const handleSearch = async () => {
		const { data }: any = await getPatents({ select: params.select });

		setList(data);
		setTotal(data.length);
	};

	return (
		<div>
			<Search setParams={setParams} />
			<Table handleSearch={handleSearch} params={params} setParams={setParams} list={list} total={total} />
		</div>
	);
}
