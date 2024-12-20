import { Modal, Form, Input, Row, Col, Select, message } from "antd";
import { useEffect } from "react";
import { addPatents, updatePatents } from "@/api/modules/login";

const { Option } = Select;

export default function AddModal({ modalVisible, setModalVisible, handleSearch, record }: any) {
	const [form] = Form.useForm();

	// const { run: add } = useRequest(customerAdd, {
	// 	manual: true,
	// 	onSuccess: () => {
	// 		message.success("操作成功");
	// 		handleSearch();
	// 	}
	// });

	// const { run: update } = useRequest(customerUpdate, {
	// 	manual: true,
	// 	onSuccess: () => {
	// 		message.success("操作成功");
	// 		handleSearch();
	// 	}
	// });

	useEffect(() => {
		if (modalVisible) {
			form.setFieldsValue(record);
		}
	}, [record, modalVisible]);

	const handleOk = async () => {
		const value = form.getFieldsValue();
		!record ? await addPatents(value) : await updatePatents({ customerId: record.customerId, ...value });
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
		{
			name: "customerName",
			label: "客户名称",
			element: <Input />
		},
		{
			name: "address",
			label: "详细地址",
			element: <Input />
		},
		{
			name: "contactPerson",
			label: "联系人",
			element: <Input />
		},
		{
			name: "mobilePhone",
			label: "手机号",
			element: <Input />
		},
		{
			name: "faxNumber",
			label: "传真号码",
			element: <Input />
		},
		{
			name: "email",
			label: "电子邮件",
			element: <Input />
		},
		{
			name: "customerType",
			label: "客户类别",
			element: (
				<Select style={{ width: "100%" }}>
					<Option value={1}>已合作</Option>
					<Option value={2}>已签订合同</Option>
					<Option value={3}>有合作意向</Option>
					<Option value={4}>需要继续跟进</Option>
					<Option value={5}>跟进难度较大</Option>
					<Option value={6}>无意向</Option>
				</Select>
			)
		},
		{
			name: "belongUserId",
			label: "客户所属员工ID",
			element: <Input />
		},
		{
			name: "signPrice",
			label: "签约费用",
			element: <Input />
		},
		{
			name: "mainItem",
			label: "客户主营项目",
			element: <Input />
		},
		{
			name: "customerSource",
			label: "客户来源",
			element: <Input />
		},
		{
			name: "signStatus",
			label: "客户签约状态",
			element: (
				<Select style={{ width: "100%" }}>
					<Option value={0}>未签约</Option>
					<Option value={1}>签约中</Option>
					<Option value={2}>报停</Option>
				</Select>
			)
		}
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
