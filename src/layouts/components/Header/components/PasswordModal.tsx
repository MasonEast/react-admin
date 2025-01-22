import { useState, useImperativeHandle, Ref } from "react";
import { Modal, message, Form, Input } from "antd";
import { updatePassword } from "@/api/modules/login";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void }>;
}

const PasswordModal = (props: Props) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [form] = Form.useForm();

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = (params: { name: number }) => {
		console.log(params);
		form.resetFields();
		setIsModalVisible(true);
	};

	const handleOk = async () => {
		await form.validateFields();

		const v = form.getFieldsValue();
		if (v.password !== v.password_confirm) {
			message.error("两次密码输入不一致");
			return;
		}

		await updatePassword({ password: v.password });

		setIsModalVisible(false);
		message.success("修改密码成功 🎉🎉🎉");
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	return (
		<Modal title="修改密码" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<Form
				form={form}
				name="basic"
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				autoComplete="off"
			>
				<Form.Item label="新密码" name="password" rules={[{ required: true, message: "请输入密码!" }]}>
					<Input.Password placeholder="请重复输入新密码" />
				</Form.Item>

				<Form.Item label="重复新密码" name="password_confirm" rules={[{ required: true, message: "请输入密码!" }]}>
					<Input.Password placeholder="请重复输入新密码" />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default PasswordModal;
