import { Modal, Form, Input, Row, Col, message, DatePicker } from "antd";
import { useEffect } from "react";
import { addTrademark, updateTrademark } from "@/api/modules/login";
import moment from "moment";
// const { Option } = Select;

export default function AddModal({ modalVisible, setModalVisible, handleSearch, record }: any) {
	const [form] = Form.useForm();

	useEffect(() => {
		if (modalVisible && record) {
			const { announcementDate, applyDate, objectionExpiryDate, registDate, expiryDate } = record;
			form.setFieldsValue({
				...record,
				announcementDate: announcementDate ? moment(announcementDate, "YYYY-MM-DD") : "",
				applyDate: applyDate ? moment(applyDate, "YYYY-MM-DD") : "",
				objectionExpiryDate: objectionExpiryDate ? moment(objectionExpiryDate, "YYYY-MM-DD") : "",
				registDate: registDate ? moment(registDate, "YYYY-MM-DD") : "",
				expiryDate: expiryDate ? moment(expiryDate, "YYYY-MM-DD") : ""
			});
		}
	}, [record, modalVisible]);

	const handleOk = async () => {
		const value = form.getFieldsValue();
		console.log(value, "ddd");
		!record
			? await addTrademark(value)
			: await updateTrademark({
					...record,
					...value,
					announcementDate: value.announcementDate ? value.announcementDate.format("YYYY-MM-DD") : "",
					applyDate: value.applyDate ? value.applyDate.format("YYYY-MM-DD") : "",
					objectionExpiryDate: value.objectionExpiryDate ? value.objectionExpiryDate.format("YYYY-MM-DD") : "",
					registDate: value.registDate ? value.registDate.format("YYYY-MM-DD") : "",
					expiryDate: value.expiryDate ? value.expiryDate.format("YYYY-MM-DD") : ""
			  });
		setModalVisible(false);
		form.resetFields();
		await handleSearch();
		message.success("操作成功");
	};

	const handleCancel = () => {
		setModalVisible(false);
		form.resetFields();
	};

	const fields = [
		{ name: "applyUser", label: "申请人", element: <Input /> },

		{ name: "type", label: "类别", element: <Input /> },
		{ name: "registNum", label: "注册号", element: <Input /> },
		{ name: "status", label: "商标状态", element: <Input /> },
		{ name: "name", label: "商标名称", element: <Input /> },
		{ name: "applyDate", label: "申请日期", element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} /> },
		{ name: "announcementDate", label: "初审公告日", element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} /> },

		{
			name: "objectionExpiryDate",
			label: "异议截止日",
			element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} />
		},

		{ name: "registDate", label: "注册日期", element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} /> },
		{ name: "expiryDate", label: "截止日期", element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} /> },
		{ name: "thing", label: "核定商品/服务", element: <Input /> },
		{ name: "thingGroup", label: "核定商品/服务组别", element: <Input /> },
		{ name: "invalidThing", label: "无效商品/服务", element: <Input /> },

		{ name: "oldApplyUser", label: "原申请人", element: <Input /> }

		// {
		// 	name: "customerType",
		// 	label: "客户类别",
		// 	element: (
		// 		<Select style={{ width: "100%" }}>
		// 			<Option value={1}>已合作</Option>
		// 			<Option value={2}>已签订合同</Option>
		// 			<Option value={3}>有合作意向</Option>
		// 			<Option value={4}>需要继续跟进</Option>
		// 			<Option value={5}>跟进难度较大</Option>
		// 			<Option value={6}>无意向</Option>
		// 		</Select>
		// 	)
		// }
	];

	const getFields = () => {
		const children: any = [];
		fields.forEach(item => {
			children.push(
				<Col style={{ margin: "0 15px" }} span={7} key={item.label}>
					<Form.Item name={item.name} label={item.label}>
						{item.element}
					</Form.Item>
				</Col>
			);
		});

		return children;
	};

	return (
		<Modal title="新增/编辑" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} width={"80vw"}>
			<Form
				form={form}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{
					enable: false
				}}
			>
				<Row>{getFields()}</Row>
			</Form>
		</Modal>
	);
}
