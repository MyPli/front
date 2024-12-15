import Title from "@/components/commons/Title";
import React from "react";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const query = (await searchParams).q;

  return (
    <div>
      <Title text="검색" />
      {query ? (
        <div className="mt-4">
          <p>검색어: {query}</p>
        </div>
      ) : (
        <div className="flex justify-center items-start h-[calc(100vh-4rem)] p-4">
          <p className="text-start text-gray-800 text-4xl">
            검색 결과가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
