"use client";

import { GithubFilled, LogoutOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import SearchInput from "@/layouts/BasicLayout/components/SearchInput";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();

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
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "small",
          title: "七妮妮",
          render: (props, dom) => {
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
        menuDataRender={(item) => {
          return [
            {
              path: "/questions",
              name: "题目",
            },
            {
              path: "/banks",
              name: "题库",
            },
          ];
        }}
        // 定义了菜单项如何渲染
        menuItemRender={(item, dom) => {
          const isActive = pathname === item.path;
          return (
            <Link
              href={item.path || "/"}
              target={item.target}
              style={isActive ? { color: 'blue' } : {}}
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
