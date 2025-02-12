"use server";

import { Flex, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import Title from "antd/lib/typography/Title";
import { Content } from "antd/lib/layout/layout";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import Link from "next/link";
import QuestionCard from "@/components/QuestionCard";
import "github-markdown-css/github-markdown-light.css";
import "./index.css";

export default async function BankQuestionPage({ params }) {
  const { questionBankId, questionId } = params;

  // 获取题库
  let bank = undefined;
  try {
    const bankRes = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = bankRes.data;
  } catch (e) {
    console.error("获取题库详情失败，" + e.message);
  }
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  // 获取题目详情
  let question = undefined;
  try {
    const questionRes = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = questionRes.data;
  } catch (e) {
    console.error("获取题目详情失败，" + e.message);
  }
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }

  // 将题目仓库的题目列表转换为菜单项
  const questionMenuItemList = (bank.questionPage?.records || []).map(
    (question) => {
      return {
        label: (
          <Link
            href={`/bank/${bank.id}/question/${question.id}`}
            prefetch={false}
          >
            {question.title}
          </Link>
        ),
        key: question.id,
      };
    },
  );

  return (
    <div id="bankQuestionPage" className="max-width-content">
      <Flex gap={25}>
        <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            题库标题
          </Title>
          <Menu items={questionMenuItemList} selectedKeys={[questionId]} />
        </Sider>
        <Content>
          <QuestionCard question={question} />
        </Content>
      </Flex>
    </div>
  );
}
