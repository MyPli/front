import { fetchSearch } from "@/action/search";
import Card from "@/components/commons/Card";
import NoData from "@/components/commons/NoData";
import Title from "@/components/commons/Title";
import { useSearch } from "@/hooks/queries/useSearch";
import React from "react";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  const query = (await searchParams).q;
  const res = await fetchSearch(query);

  return (
    <div>
      <Title text="검색 결과" />
      {res.servicePlaylists.length > 0 ? (
        <div className="mt-[25px]  grid grid-cols-6 gap-[21px] w-[calc(100%-25px)]">
          {res.servicePlaylists.map((item) => (
            <Card key={item.id} size="small" {...item} />
          ))}
        </div>
      ) : (
        <NoData sentence="검색 결과가 존재하지 않습니다" />
      )}
    </div>
  );
};

export default Search;
