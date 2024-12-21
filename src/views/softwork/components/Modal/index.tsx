import { Modal, Form, Input, Row, Col, message, DatePicker } from "antd";
import { useEffect } from "react";
import { addSoftwork, updateSoftwork } from "@/api/modules/login";
import moment from "moment";
// const { Option } = Select;

export default function AddModal({ modalVisible, setModalVisible, handleSearch, record }: any) {
	const [form] = Form.useForm();

	useEffect(() => {
		if (modalVisible && record) {
			const { devEndDate, releaseDate, registDate } = record;
			form.setFieldsValue({
				...record,
				devEndDate: devEndDate ? moment(devEndDate, "YYYY-MM-DD") : "",
				releaseDate: releaseDate ? moment(releaseDate, "YYYY-MM-DD") : "",
				registDate: registDate ? moment(registDate, "YYYY-MM-DD") : ""
			});
		}
	}, [record, modalVisible]);

	const handleOk = async () => {
		const value = form.getFieldsValue();
		let res: any;
		!record
			? (res = await addSoftwork(value))
			: (res = await updateSoftwork({
					...record,
					...value,
					devEndDate: value.devEndDate ? value.devEndDate.format("YYYY-MM-DD") : "",
					releaseDate: value.releaseDate ? value.releaseDate.format("YYYY-MM-DD") : "",
					registDate: value.registDate ? value.registDate.format("YYYY-MM-DD") : ""
			  }));
		setModalVisible(false);
		form.resetFields();
		await handleSearch();
		res.success ? message.success("操作成功") : message.error("操作失败");
	};

	const handleCancel = () => {
		setModalVisible(false);
		form.resetFields();
	};

	const fields = [
		{ name: "company", label: "公司", element: <Input /> },
		{
			name: "nameAll",
			label: "软件全称",
			element: <Input />
		},
		{ name: "nameSimple", label: "软件简称", element: <Input /> },
		{ name: "version", label: "版本号", element: <Input /> },
		{ name: "registNum", label: "登记号", element: <Input /> },
		{ name: "devEndDate", label: "开发完成日期", element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} /> },
		{ name: "releaseDate", label: "首次发布日期", element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} /> },
		{ name: "registDate", label: "登记日期", element: <DatePicker style={{ width: "290px" }} format={"YYYY-MM-DD"} /> },

		{ name: "ways", label: "权力取得方式", element: <Input /> }
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
