import React from "react";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import axios from "axios";
import http from "@/api";
import { PORT1 } from "@/api/config/servicePort";

const CustomUpload = ({ uploadUrl, id, showUploadList }: any) => {
	// 处理自定义请求的方法
	const handleUpload: any = async ({ file, onSuccess, onError, onProgress }: any) => {
		const formData = new FormData();
		formData.append("file", file);
		if (id) formData.append("id", id);

		try {
			const response = await http.post(PORT1 + uploadUrl, formData, {
				headers: {
					"Content-Type": "multipart/form-data"
				},
				onUploadProgress: (progressEvent: any) => {
					// 处理上传进度，如果需要
					const percent = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
					onProgress({ percent });
				}
			});

			onSuccess(response.data);
			message.success(`${file.name} 上传成功`);
		} catch (error) {
			onError(error);
			message.error(`${file.name} 上传失败`);
		}
	};

	return (
		<Upload customRequest={handleUpload} showUploadList={showUploadList}>
			<span className="global_table_button">
				<UploadOutlined />
				上传
			</span>
			{/* <Button icon={<UploadOutlined />}>上传</Button> */}
		</Upload>
	);
};

export default CustomUpload;
