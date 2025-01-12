"use client";

import "./globals.css";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useCallback, useEffect } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
/**
 * 执行初始化逻辑的布局（多封装一层）
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  /**
   * 全局初始化函数，有全局单次调用的代码，都可以写到这里
   */
  const doInit = useCallback(() => {
    console.log("hello 欢迎来到我的项目");
  }, []);

  // 只执行一次
  useEffect(() => {
    doInit();
  }, []);

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <InitLayout>
          <AntdRegistry>
            <BasicLayout>{children}</BasicLayout>
          </AntdRegistry>
        </InitLayout>
      </body>
    </html>
  );
}
