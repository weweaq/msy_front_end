import ACCESS_ENUM from "../../../../mianshiya-next-master/mianshiya-next-frontend/src/access/accessEnum";

// 默认用户
export const DEFAULT_USER: API.LoginUserVO = {
  userName: "未登录",
  userProfile: "暂无简介",
  userAvatar: "/assets/notLoginUser.png",
  userRole: ACCESS_ENUM.NOT_LOGIN,
};
