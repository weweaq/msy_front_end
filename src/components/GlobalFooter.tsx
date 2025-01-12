import React from "react";
import "./index.css";

/**
 * 全局底部栏组件
 *
 * @author yupi
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="global-footer">
      <div>© {currentYear} 面试的刷题平台</div>
      <div>
        <a href="https://www.code-nav.cn" target="_blank">
          作者：zhangwei张威
        </a>
      </div>
    </div>
  );
}
