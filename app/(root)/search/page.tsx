import Title from "@/components/commons/Title";
import React from "react";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const query = (await searchParams).q;
  console.log(query);
  return (
    <div>
      <Title text="검색 결과" />
      <div>{query}</div>
    </div>
  );
};

export default Search;
