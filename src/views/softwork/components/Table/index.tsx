import { Table, Popconfirm, Button, Card } from "antd";
import { ColumnProps } from "antd/lib/table";
import { useState } from "react";
import { deletePatents } from "@/api/modules/login";
import AddModal from "../Modal";
import { isWithin30Days } from "@/utils/util";
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
		await deletePatents({ ids: record.id });
		handleSearch();
	};

	const handleDownload = (record: any) => {
		window.open(record.filePath, "_blank");
	};

	const columns: ColumnProps<any>[] = [
		{ dataIndex: "title", title: "标题" },
		{
			dataIndex: "annualFeeEndDate",
			title: "年费截至日期",
			render: text => <span style={{ color: isWithin30Days(text) ? "red" : "green" }}>{text}</span> // 年龄大于40的显示为红色，否则为绿色
		},
		{ dataIndex: "applyNum", title: "申请号" },
		{ dataIndex: "state", title: "法律状态/事件" },
		{ dataIndex: "applyUser", title: "申请人" },
		{ dataIndex: "applyDate", title: "申请日期" },
		{ dataIndex: "openDate", title: "公开日期" },
		{ dataIndex: "type", title: "专利类型" },

		{ dataIndex: "annualFee", title: "年费" },

		{ dataIndex: "endDate", title: "专利终止日期" },
		// {
		// 	dataIndex: "customerType",
		// 	title: "客户类别",
		// 	render: (text: number) => {
		// 		switch (text) {
		// 			case 0:
		// 				return "已合作";
		// 			case 1:
		// 				return "已签订合同";
		// 			case 2:
		// 				return "有合作意向";
		// 			case 3:
		// 				return "需要继续跟进";
		// 			case 4:
		// 				return "跟进难度较大";
		// 			case 5:
		// 				return "无合作意向";
		// 		}
		// 	}
		// },
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
						<Upload uploadUrl="/patentDO/uploadPatentFile" id={record.id} showUploadList={false} />
						{record.filePath && (
							<span onClick={() => handleDownload(record)} className="global_table_button">
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
