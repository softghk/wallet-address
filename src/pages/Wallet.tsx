import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWalletById } from "@/services";
import { WalletType } from "@/@types";
import { Chart } from "@/components";

export const Wallet = () => {
  const { id } = useParams();
  const [data, setData] = useState<WalletType[]>([]);
  const [loader, setLoader] = useState(false);

  const fetchData = async (walletAddress?: string) => {
    setLoader(true);
    if (walletAddress) {
      const res = await getWalletById(walletAddress);
      if (res) {
        setData(res);
      }
    }
    setLoader(false);
  };
  useEffect(() => {
    fetchData(id);
  }, [id]);

  if (loader)
    return (
      <div className="w-full flex flex-col items-center justify-center">
        Loading ...
      </div>
    );
  return <div>{data ? <Chart data={data} /> : null}</div>;
};
