import { ColumnType, Sort, SortType } from "@/@types";
import { TopIcon } from "@/assets";
import React from "react";
import { redirect, useNavigate } from "react-router-dom";

interface TableProps {
  sort: Sort;
  columns: ColumnType[];
  data: any[];
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
}

export const Table = ({ sort, columns, data, setSort }: TableProps) => {
  const navigate = useNavigate();
  const handleSort = (column: string) => {
    setSort({
      key: column,
      type:
        sort.key === column && sort.type === SortType.ASC
          ? SortType.DESC
          : SortType.ASC,
    });
  };
  const handleClickRow = (item: any) => {
    // TODO Fix the chart page
    // navigate(`/${item?.walletAddress}`);
  };
  return (
    <table className="table-list">
      <thead>
        <tr>
          {columns.map((item) => (
            <th key={item.key}>
              <button
                onClick={() => handleSort(item.key)}
                className="flex items-center gap-1 mx-auto"
              >
                {item.title}
                <span
                  className={`${sort.key === item.key ? "block" : "hidden"} ${
                    sort.type === SortType.ASC ? "" : "rotate-180"
                  }`}
                >
                  <TopIcon />
                </span>
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.walletAddress}>
            {columns?.map((column) => (
              <td
                key={column.key + item.walletAddress}
                onClick={() => handleClickRow(item)}
                className="cursor-pointer"
              >
                {item?.[column.key]}{" "}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
