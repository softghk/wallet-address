import { PaginationType, Sort, SortType } from "@/@types";
import { getWalletPagination } from "@/services/wallet";
import { Pagination, Table } from "@/components";
import React, { useState } from "react";

export const Home = () => {
  const [paginationData, setPaginationData] = useState<PaginationType>({
    limit: 5,
    page: 1,
  });
  const [sort, setSort] = useState<Sort>({
    key: "netProfit",
    type: SortType.ASC,
  });
  const { data } = getWalletPagination({
    ...paginationData,
    sort,
  });
  console.log("DATA: ", data);
  const columns = ["netProfit", "walletAddress"];
  return (
    <div>
      <Table sort={sort} columns={columns} data={data} />
      <Pagination
        pagination={paginationData}
        setPagination={setPaginationData}
      />
    </div>
  );
};
