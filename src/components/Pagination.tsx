import React from "react";
import { PaginationType } from "@/@types";

interface PaginationProps {
  pagination: PaginationType;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
}
export const Pagination = ({ setPagination, pagination }: PaginationProps) => {
  return <div>Pagination</div>;
};
