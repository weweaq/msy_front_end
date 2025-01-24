"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Link from "next/link";
import { userLoginUsingPost } from "@/api/userController";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { setLoginUser } from "@/stores/loginUser";
import { useRouter } from "next/navigation";
import { ProForm } from "@ant-design/pro-form";

const UserLoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [form] = ProForm.useForm();

  const doSubmit = async (values: API.UserLoginRequest) => {
    console.log("doSubmit", values);
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        message.success("登录成功!!!!!!");
        console.log("doSubmit res.data: ", res.data);
        // @ts-ignore
        dispatch(setLoginUser(res.data));
        router.replace("/");
        form.resetFields();
      }
    } catch (e) {
      // @ts-ignore
      message.error("登录失败 " + e.message);
    }
  };

  return (
    <div id="userLoginPage">
      <LoginForm
        logo="/assets/logo.png"
        title="askme"
        subTitle="问答问答问答平台"
        onFinish={doSubmit}
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
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "right",
          }}
        >
          还没有账号？
          <Link href={"/user/register"}>立即注册</Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserLoginPage;
