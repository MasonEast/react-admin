import { Form, Input, Button, Card } from "antd";

// const { Option } = Select;

interface Props {
	setParams: React.Dispatch<React.SetStateAction<any>>;
}

const Search = ({ setParams }: Props) => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		setParams((v: any) => ({
			...v,
			...values
		}));
	};

	return (
		<Card style={{ marginBottom: 24 }}>
			<Form name="basic" onFinish={onFinish} layout="inline" form={form}>
				<Form.Item label="标题" name="title">
					<Input style={{ width: 250 }} />
				</Form.Item>
				<Form.Item label="申请号" name="applyNum">
					<Input style={{ width: 250 }} />
				</Form.Item>
				<Form.Item label="法律状态/事件" name="state">
					<Input style={{ width: 250 }} />
				</Form.Item>
				{/* <Form.Item label="客户类别" name="customerType">
					<Select style={{ width: 250 }}>
						<Option value={1}>已合作</Option>
						<Option value={2}>已签订合同</Option>
						<Option value={3}>有合作意向</Option>
						<Option value={4}>需要继续跟进</Option>
						<Option value={5}>跟进难度较大</Option>
						<Option value={6}>无意向</Option>
					</Select>
				</Form.Item>
				<Form.Item label="签约状态" name="signStatus">
					<Select style={{ width: 250 }}>
						<Option value={0}>未签约</Option>
						<Option value={1}>签约中</Option>
						<Option value={2}>报停</Option>
					</Select>
				</Form.Item> */}
				<Form.Item>
					<Button type="primary" htmlType="submit">
						查询
					</Button>
					<Button onClick={() => form.resetFields()} style={{ marginLeft: 10 }}>
						重置
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default Search;
