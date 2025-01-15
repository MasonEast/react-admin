import { Table, Popconfirm, Button, Card } from "antd";
import { ColumnProps } from "antd/lib/table";
import { useState } from "react";
import { deleteTrademark } from "@/api/modules/login";
import AddModal from "../Modal";
import Upload from "@/components/Upload";
import { isWithin30Days } from "@/utils/util";

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
		await deleteTrademark({ ids: record.id });
		handleSearch();
	};

	// const handleDownload = (record: any) => {
	// 	window.open(record.filePath, "_blank");
	// };

	const columns: ColumnProps<any>[] = [
		{ dataIndex: "applyUser", title: "申请人", width: 300 },
		{
			dataIndex: "expiryDate",
			title: "截止日期",
			width: 150,
			render: text => <span style={{ color: isWithin30Days(text) ? "red" : "green" }}>{text}</span>
		},
		{ dataIndex: "type", title: "类别" },
		{ dataIndex: "registNum", title: "注册号" },
		{ dataIndex: "status", title: "商标状态" },
		{ dataIndex: "name", title: "商标名称" },
		{ dataIndex: "applyDate", title: "申请日期" },
		{ dataIndex: "announcementDate", title: "初审公告日" },

		{ dataIndex: "objectionExpiryDate", title: "异议截止日" },

		{ dataIndex: "registDate", title: "注册日期" },

		{ dataIndex: "thing", title: "核定商品/服务" },
		{ dataIndex: "thingGroup", title: "核定商品/服务组别" },
		{ dataIndex: "invalidThing", title: "无效商品/服务" },

		{ dataIndex: "oldApplyUser", title: "原申请人" },

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
						<Upload uploadUrl="/trademarkDO/upload" id={record.id} showUploadList={false} refresh={handleSearch} />
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
					x: 2200,
					y: 500
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
