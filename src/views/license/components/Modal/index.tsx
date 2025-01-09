import { Modal, Form, Input, Row, Col, message } from "antd";
import { useEffect } from "react";
import { addLicense, updateLicense } from "@/api/modules/login";
// const { Option } = Select;

export default function AddModal({ modalVisible, setModalVisible, handleSearch, record }: any) {
	const [form] = Form.useForm();

	useEffect(() => {
		if (modalVisible && record) {
			form.setFieldsValue({
				...record
			});
		}
	}, [record, modalVisible]);

	const handleOk = async () => {
		const value = form.getFieldsValue();
		console.log(value, "ddd");
		!record
			? await addLicense(value)
			: await updateLicense({
					...record,
					...value
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
		{ dataIndex: "companyName", title: "公司名称", element: <Input /> },
		{ dataIndex: "creditCode", title: "统一社会信用代码", element: <Input /> },
		{ dataIndex: "legalRepresentative", title: "法定代表人", element: <Input /> },
		{ dataIndex: "registeredAddress", title: "注册地址", element: <Input /> },
		{ dataIndex: "registeredCapital", title: "注册资本", element: <Input /> },
		{ dataIndex: "region", title: "所属地区", element: <Input /> },
		{ dataIndex: "businessPeriod", title: "营业期限", element: <Input /> },

		{ dataIndex: "invoiceCompany", title: "发票公司名称", element: <Input /> },

		{ dataIndex: "invoiceTaxId", title: "税号", element: <Input /> },
		{ dataIndex: "invoiceBankAccount", title: "银行帐号", element: <Input /> },
		{ dataIndex: "invoiceBankName", title: "开户行", element: <Input /> },
		{ dataIndex: "invoicePhone", title: "电话", element: <Input /> }
	];

	const getFields = () => {
		const children: any = [];
		fields.forEach(item => {
			children.push(
				<Col style={{ margin: "0 15px" }} span={7} key={item.dataIndex}>
					<Form.Item name={item.dataIndex} label={item.title}>
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
