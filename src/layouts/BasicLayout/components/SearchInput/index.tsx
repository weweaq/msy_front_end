import { Input } from "antd";

interface Props {}

const SearchInput = (props: Props) => {
  return (
    <div
      className="search-input"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
    >
      <Input.Search
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        placeholder="搜索题目"
        onSearch={(value) => {}}
      />
    </div>
  );
};
export default SearchInput;
