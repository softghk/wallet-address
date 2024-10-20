import { ColumnType, PaginationType, Sort, SortType } from "@/@types";
import { getNetworkList, useGetWalletPagination } from "@/services";
import { Pagination, Table } from "@/components";
import React, { useEffect, useState } from "react";

const columns: ColumnType[] = [
  {
    key: "netProfit",
    title: "Net Profit",
  },
  {
    key: "walletAddress",
    title: "Wallet Address",
  },
];
export const Home = () => {
  const [paginationData, setPaginationData] = useState<PaginationType>({
    limit: 5,
    page: 1,
  });
  const [optionList, setOptionList] = useState<string[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string | undefined>(
    undefined
  );
  const [sort, setSort] = useState<Sort>({
    key: "netProfit",
    type: SortType.ASC,
  });
  const { data, loading, totalCount, totalPage } = useGetWalletPagination({
    ...paginationData,
    sort,
    network: selectedNetwork,
  });

  const getOptionsList = async () => {
    const res = await getNetworkList();
    setOptionList(res);
  };

  useEffect(() => {
    getOptionsList();
  }, []);

  if (loading)
    return (
      <div className="w-full flex flex-col items-center justify-center">
        Loading ...
      </div>
    );
  return (
    <div className="w-full flex flex-col gap-5">
      <select
        value={selectedNetwork}
        onChange={(e) => setSelectedNetwork(e.target.value)}
        className="px-3 py-2 rounded-lg w-64 self-baseline"
      >
        <option>Please Select Network</option>
        {optionList.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <Table sort={sort} setSort={setSort} columns={columns} data={data} />
      <Pagination
        currentPage={paginationData.page}
        onPageChange={(e) => setPaginationData({ ...paginationData, page: e })}
        pageSize={paginationData.limit}
        totalCount={totalCount}
        className="pagination-bar"
      />
    </div>
  );
};
