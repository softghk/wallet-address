import { Sort } from "@/@types";
import React from "react";

interface TableProps {
  sort: Sort;
  columns: string[];
  data: any[];
}

export const Table = ({ sort, columns, data }: TableProps) => {
  return (
    <table className="">
      <thead>
        <tr>
          {columns.map((item) => (
            <th key={item}>
              {item} <button></button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.walletAddress}>
            {columns?.map((column) => (
              <td key={column + item.walletAddress}>{item?.[column]} </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
