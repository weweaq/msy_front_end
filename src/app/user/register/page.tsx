"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Link from "next/link";
import { userRegisterUsingPost } from "@/api/userController";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { ProForm } from "@ant-design/pro-form";

const UserRegisterPage: React.FC = () => {
  const router = useRouter();
  const [form] = ProForm.useForm();

  const doSubmit = async (values: API.UserRegisterRequest) => {
    console.log("doSubmit", values);
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功!请登录！");
        console.log("doSubmit res.data: ", res.data);
        router.replace("/user/login");
        form.resetFields();
      }
    } catch (e) {
      // @ts-ignore
      message.error("注册失败 " + e.message);
    }
  };

  return (
    <div id="userRegisterPage">
      <LoginForm
        logo="/assets/logo.png"
        title="askme"
        subTitle="问答问答问答平台"
        onFinish={doSubmit}
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
          submitButtonProps: {
            style: {
              backgroundColor: "green",
              color: "white",
              width: "100%",
              fontSize: "16px",
            },
          },
        }}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder={"用户名: "}
          rules={[
            {
              required: true,
              message: "请输入用户名!",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"密码:"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <ProFormText.Password
          name="checkPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"确认密码:"}
          rules={[
            {
              required: true,
              message: "请再次输入密码！",
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "right",
          }}
        >
          已有账号？
          <Link href={"/user/login"}>去登陆</Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserRegisterPage;
