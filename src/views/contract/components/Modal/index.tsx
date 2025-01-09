import { Modal, Form, Input, Row, Col, message, DatePicker } from "antd";
import { useEffect } from "react";
import { addContract, updateContract } from "@/api/modules/login";
import moment from "moment";
// const { Option } = Select;

export default function AddModal({ modalVisible, setModalVisible, handleSearch, record }: any) {
	const [form] = Form.useForm();

	useEffect(() => {
		if (modalVisible && record) {
			const { signDate } = record;
			form.setFieldsValue({
				...record,
				signDate: signDate ? moment(signDate, "YYYY-MM-DD") : ""
			});
		}
	}, [record, modalVisible]);

	const handleOk = async () => {
		const value = form.getFieldsValue();
		console.log(value, "ddd");
		!record
			? await addContract(value)
			: await updateContract({
					...record,
					...value,
					signDate: value.signDate ? value.signDate.format("YYYY-MM-DD") : ""
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
		{ name: "name", label: "合同名称", element: <Input /> },
		{
			name: "contractType",
			label: "合同类型",
			element: <Input />
		},
		{ name: "contractNo", label: "合同编号", element: <Input /> },

		{ name: "partyA", label: "甲方公司名称", element: <Input /> },
		{ name: "partyB", label: "乙方公司名称", element: <Input /> },
		{ name: "amount", label: "合同款项", element: <Input /> },
		{ name: "signDate", label: "签约时间", element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} /> },

		{ name: "signer", label: "签约人", element: <Input /> },
		{ name: "content", label: "合同内容", element: <Input.TextArea rows={5} />, span: 18, labelCol: { span: 3 } }
	];

	const getFields = () => {
		const children: any = [];
		fields.forEach(item => {
			children.push(
				<Col style={{ margin: "0 15px" }} span={item.span || 7} key={item.label}>
					<Form.Item name={item.name} label={item.label} labelCol={item.labelCol || undefined}>
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
