import { Modal, Form, Input, Row, Col, message, DatePicker } from "antd";
import { useEffect } from "react";
import { addFile, updateFile } from "@/api/modules/login";
import moment from "moment";
// const { Option } = Select;

export default function AddModal({ modalVisible, setModalVisible, handleSearch, record }: any) {
	const [form] = Form.useForm();

	useEffect(() => {
		if (modalVisible && record) {
			const { releaseDate } = record;
			form.setFieldsValue({
				...record,
				releaseDate: releaseDate ? moment(releaseDate, "YYYY-MM-DD") : ""
			});
		}
	}, [record, modalVisible]);

	const handleOk = async () => {
		const value = form.getFieldsValue();
		console.log(value, "ddd");
		!record
			? await addFile(value)
			: await updateFile({
					...record,
					...value,
					releaseDate: value.releaseDate ? value.releaseDate.format("YYYY-MM-DD") : ""
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
		{ name: "fileName", label: "文件名称", element: <Input /> },

		{ name: "releaseDate", label: "文件发布日期", element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} /> },
		{ name: "company", label: "发布公司", element: <Input /> },
		{ name: "department", label: "发布部门", element: <Input /> },
		{ name: "recipientDept", label: "收件部门", element: <Input /> }
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
