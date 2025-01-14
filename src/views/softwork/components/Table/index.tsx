import { Table, Popconfirm, Button, Card } from "antd";
import { ColumnProps } from "antd/lib/table";
import { useState } from "react";
import { deleteSoftwork } from "@/api/modules/login";
import AddModal from "../Modal";
import Upload from "@/components/Upload";

import styles from "./index.module.less";

interface Props {
	handleSearch: () => void;
	params: any;
	setParams: any;
	list?: any[];
	protocol?: string;
	loading?: boolean;
	total?: number;
}

const ATable = ({ handleSearch, params, setParams, list = [], total, loading }: Props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectRecord, setSelectRecord] = useState();
	// const { application } = useModel("useApplicationModel");

	const handlePageChange = (pageNum: number, pageSize?: number) => {
		setParams({
			pageNum: pageNum || 1,
			pageSize: pageSize || 10
		});
	};

	const handleAdd = () => {
		setModalVisible(true);
		setSelectRecord(undefined);
	};

	const handleEdit = (record: any) => {
		setModalVisible(true);
		setSelectRecord(record);
	};

	const handleDelete = async (record: any) => {
		console.log(record);
		await deleteSoftwork({ ids: record.id });
		handleSearch();
	};

	const columns: ColumnProps<any>[] = [
		{ dataIndex: "company", title: "公司" },
		{
			dataIndex: "nameAll",
			title: "软件全称"
		},
		{ dataIndex: "nameSimple", title: "软件简称" },
		{ dataIndex: "version", title: "版本号" },
		{ dataIndex: "registNum", title: "登记号" },
		{ dataIndex: "devEndDate", title: "开发完成日期" },
		{ dataIndex: "releaseDate", title: "首次发布日期" },
		{ dataIndex: "registDate", title: "登记日期" },

		{ dataIndex: "ways", title: "权力取得方式" },

		{
			dataIndex: "operate",
			title: "操作",
			fixed: "right",
			align: "center",
			key: "httpoperate",
			width: "200px",
			render: (_, record) => {
				return (
					<>
						<span onClick={() => handleEdit(record)} className="global_table_button">
							编辑
						</span>
						<Popconfirm title={`你确定要删除吗？`} onConfirm={() => handleDelete(record)} okText="确定" cancelText="取消">
							<span className="global_table_button">删除</span>
						</Popconfirm>
						<Upload uploadUrl="/softworkDO/upload" id={record.id} showUploadList={false} refresh={handleSearch} />
						{record.filePath && (
							<span onClick={() => window.open(record.filePath, "_blank")} className="global_table_button">
								下载
							</span>
						)}
					</>
				);
			}
		}
	];

	return (
		<Card>
			<div className={styles.card_header}>
				<span className={styles.card_header_title}>专利列表</span>
				<Button className={styles.card_header_button} type="primary" onClick={handleAdd}>
					新增
				</Button>
			</div>
			<Table
				style={{ marginTop: "20px" }}
				scroll={{
					x: 2200
				}}
				loading={loading}
				rowKey="basic-table"
				dataSource={list}
				columns={columns}
				pagination={{
					total,
					showSizeChanger: true,
					current: params.current,
					pageSize: params.limit,
					onChange: handlePageChange,
					onShowSizeChange: handlePageChange
				}}
			/>
			<AddModal modalVisible={modalVisible} setModalVisible={setModalVisible} handleSearch={handleSearch} record={selectRecord} />
		</Card>
	);
};

export default ATable;
