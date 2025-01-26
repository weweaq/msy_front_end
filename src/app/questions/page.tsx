import { message } from "antd";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import Title from "antd/lib/typography/Title";
import "./index.css";
import QuestionTable from "@/components/QuestionTable";

export default async function QuestionsPage({ searchParams }) {
  const { q: searchText } = searchParams;
  let questionList = [];
  let total = 0;

  try {
    const res = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
      searchText: searchText,
    });
    questionList = res.data.records ?? [];
    total = res.data.total ?? 0;
  } catch (e) {
    message.error("获取题目列表失败，" + e.message);
  }

  return (
    <div id="questionsPage" className="max-width-content">
      <Title level={3}>最新题目</Title>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{
          title: searchText,
        }}
      />
    </div>
  );
}
