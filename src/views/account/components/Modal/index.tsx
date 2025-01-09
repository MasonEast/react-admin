import { Modal, Form, Input, Row, Col, message } from "antd";
import { useEffect } from "react";
import { addAccount, updateAccount } from "@/api/modules/login";
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
			? await addAccount(value)
			: await updateAccount({
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
		{ name: "topicName", label: "主题名称", element: <Input /> },
		{ name: "account", label: "账号", element: <Input /> },
		{ name: "password", label: "密码", element: <Input /> },
		{ name: "email", label: "注册邮箱", element: <Input /> },
		{ name: "phone", label: "注册手机号码", element: <Input /> },
		{ name: "website", label: "网址", element: <Input /> },
		{ name: "companyName", label: "公司名称", element: <Input /> },
		{ name: "registrant", label: "注册人", element: <Input /> }
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
		<Modal title="新增/编辑" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} width={"90vw"}>
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
