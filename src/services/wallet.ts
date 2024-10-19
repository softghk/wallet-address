import {
  GetWalletParams,
  PaginationType,
  Sort,
  SortType,
  WalletType,
} from "@/@types";
import dataJson from "./data/valuable_wallets_sample.json";

const getDataWithPagination = (
  data: any[],
  { limit, page }: PaginationType,
  sort: Sort
) => {
  const first = limit * page;
  const last = first + limit;
  const arr = data
    .slice(first, last)
    .sort((a, b) =>
      sort.type === SortType.ASC
        ? a[sort.key] > b[sort.key]
          ? 1
          : a[sort.key] > b[sort.key]
          ? -1
          : 0
        : a[sort.key] > b[sort.key]
        ? -1
        : a[sort.key] > b[sort.key]
        ? 1
        : 0
    );
  const totalCount = arr.length;
  let totalPage = totalCount / limit;
  totalPage = totalPage < 1 ? 1 : totalPage;
  return {
    totalCount,
    totalPage,
    data: arr,
  };
};

export const getWalletPagination = ({
  limit,
  network,
  page,
  sort,
}: GetWalletParams) => {
  const data = dataJson as WalletType[];
  if (network) {
    const arr = data.filter((item) => item.networkId === network);
    return getDataWithPagination(arr, { limit, page }, sort);
  }
  return getDataWithPagination(data, { limit, page }, sort);
};
