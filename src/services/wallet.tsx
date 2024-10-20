import {
  GetWalletParams,
  PaginationType,
  Sort,
  SortType,
  WalletType,
} from "@/@types";
import dataJson from "./data/valuable_wallets_sample.json";
import { useEffect, useState } from "react";

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
  const totalCount = data?.length || 0;
  let totalPage = totalCount / limit;
  totalPage = totalPage < 1 ? 1 : Math.ceil(totalPage);

  return {
    totalCount,
    totalPage,
    data: arr,
  };
};

interface useGetWalletPaginationType {
  totalCount: number;
  totalPage: number;
  data: any[];
}

export const useGetWalletPagination = ({
  limit,
  network,
  page,
  sort,
}: GetWalletParams) => {
  const [loading, setLoading] = useState(false);
  const [returnData, setReturnData] = useState<useGetWalletPaginationType>({
    totalCount: 0,
    totalPage: 0,
    data: [],
  });
  const fetchData = async () => {
    setLoading(true);
    const data = dataJson as WalletType[];
    if (network) {
      const arr = await data.filter((item) => item.networkId === network);
      const res = await getDataWithPagination(arr, { limit, page }, sort);
      setReturnData(res);
    } else {
      const res = await getDataWithPagination(data, { limit, page }, sort);
      setReturnData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [limit, network, page, sort]);
  return { ...returnData, loading };
};

export const getNetworkList = async () => {
  const data = dataJson as WalletType[];
  return await data.reduce<string[]>((prev, current) => {
    if (
      prev.find((item) => current?.networkId === item) ||
      !current.networkId
    ) {
      return prev;
    }
    const arr = [...prev];
    arr.push(current.networkId);
    return arr;
  }, []);
};

export const getWalletById = async (id: string) => {
  const data = dataJson as WalletType[];
  return await data?.filter((item) => item.walletAddress === id);
};
