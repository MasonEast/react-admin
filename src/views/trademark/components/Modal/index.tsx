import { Modal, Form, Input, Row, Col, message, DatePicker } from "antd";
import { useEffect } from "react";
import { addPatents, updatePatents } from "@/api/modules/login";
import moment from "moment";
// const { Option } = Select;

export default function AddModal({ modalVisible, setModalVisible, handleSearch, record }: any) {
	const [form] = Form.useForm();

	useEffect(() => {
		if (modalVisible && record) {
			const { annualFeeEndDate, applyDate, openDate, endDate } = record;
			form.setFieldsValue({
				...record,
				annualFeeEndDate: annualFeeEndDate ? moment(annualFeeEndDate, "YYYY-MM-DD") : "",
				applyDate: applyDate ? moment(applyDate, "YYYY-MM-DD") : "",
				openDate: openDate ? moment(openDate, "YYYY-MM-DD") : "",
				endDate: endDate ? moment(endDate, "YYYY-MM-DD") : ""
			});
		}
	}, [record, modalVisible]);

	const handleOk = async () => {
		const value = form.getFieldsValue();
		console.log(value, "ddd");
		!record
			? await addPatents(value)
			: await updatePatents({
					...record,
					...value,
					annualFeeEndDate: value.annualFeeEndDate ? value.annualFeeEndDate.format("YYYY-MM-DD") : "",
					applyDate: value.applyDate ? value.applyDate.format("YYYY-MM-DD") : "",
					openDate: value.openDate ? value.openDate.format("YYYY-MM-DD") : "",
					endDate: value.endDate ? value.endDate.format("YYYY-MM-DD") : ""
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
		{ name: "title", label: "标题", element: <Input /> },
		{
			name: "annualFeeEndDate",
			label: "年费截至日期",
			element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} />
		},
		{ name: "applyNum", label: "申请号", element: <Input /> },
		{ name: "state", label: "法律状态/事件", element: <Input /> },
		{ name: "applyUser", label: "申请人", element: <Input /> },
		{ name: "applyDate", label: "申请日期", element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} /> },
		{ name: "openDate", label: "公开日期", element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} /> },
		{ name: "type", label: "专利类型", element: <Input /> },

		{ name: "annualFee", label: "年费", element: <Input /> },

		{ name: "endDate", label: "专利终止日期", element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} /> }

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
		<Modal title="新增/编辑客户" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} width={"80vw"}>
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
