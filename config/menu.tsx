import { CrownOutlined } from "@ant-design/icons";
import { MenuDataItem } from "@ant-design/pro-layout";

export const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    name: "面试鸭",
    path: "https://mianshiya.com",
    target: "_blank",
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
      },
      {
        path: "/admin/bank",
        name: "题库管理",
      },
      {
        path: "/admin/question",
        name: "题目管理",
      },
    ],
  },
] as MenuDataItem[];
