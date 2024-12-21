import React from "react";

interface NoDataProps {
  sentence: string;
}

const NoData = ({ sentence }: NoDataProps) => {
  return (
    <div className="w-full text-center text-2xl pt-8 font-semibold">
      {sentence}
    </div>
  );
};

export default NoData;
