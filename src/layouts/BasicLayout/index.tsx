"use client";

import { GithubFilled, LogoutOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, message } from "antd";
import React from "react";
import Image from "next/image";
import SearchInput from "@/layouts/BasicLayout/components/SearchInput";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { menus } from "../../../config/menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import { userLogoutUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { DEFAULT_USER } from "@/constants/user";

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  // 当前登录用户
  const loginUser = useSelector((state: RootState) => state.loginUser);

  const userLogOut = async () => {
    try {
      await userLogoutUsingPost();
      message.success("退出登录成功");
      dispatch(setLoginUser(DEFAULT_USER));
      router.replace("/user/login");
    } catch (e) {
      message.error("退出登录失败 " + e);
    }
  };

  return (
    <div
      id="BasicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title={"zhangweiTest"}
        layout={"top"}
        logo={
          <Image
            src="/assets/logo.png"
            alt="zhangweiTestLogo"
            width={40}
            height={40}
          />
        }
        // 定义了当前页面的路径,负责高亮
        location={{
          pathname,
        }}
        // 定义了顶部导航栏左侧的按钮
        avatarProps={{
          src: loginUser.userAvatar || "/assets/logo.png",
          size: "small",
          title: loginUser.userName || "鱼皮鸭",
          render: (props, dom) => {
            if (!loginUser.id) {
              return (
                <div onClick={() => router.push("/user/login")}> {dom}</div>
              );
            }

            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  // 这里需要大写 onClick
                  onClick: async (event: { key: React.Key }) => {
                    const { key } = event;
                    if (key === "logout") {
                      await userLogOut();
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        // 定义了顶部导航栏右侧的按钮
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput key="search" />,
            <a
              key="github"
              href="https://github.com/liyupi/mianshiya-next"
              target="_blank"
            >
              <GithubFilled key="GithubFilled" />
            </a>,
          ];
        }}
        // 定义了顶部导航栏如何渲染
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        // 定义了顶部导航栏的点击事件
        onMenuHeaderClick={(e) => console.log(e)}
        // 定义了菜单项
        menuDataRender={() => {
          return getAccessibleMenus(loginUser, menus);
        }}
        // 定义了菜单项如何渲染
        menuItemRender={(item, dom) => {
          const isActive = pathname === item.path;
          return (
            <Link
              href={item.path || "/"}
              target={item.target}
              style={isActive ? { color: "blue" } : {}}
            >
              {dom}
            </Link>
          );
        }}
        // 定义了底部如何渲染
        footerRender={() => {
          return <GlobalFooter />;
        }}
      >
        {children}
      </ProLayout>
    </div>
  );
}
