'use client'

import { Toggle } from "@/components/tailgrids/core/toggle";
import {
  NativeSelect,
  NativeSelectOption
} from "@/components/tailgrids/core/native-select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow
} from "@/components/tailgrids/core/table";

import { Pagination } from "@/components/tailgrids/core/pagination";
import { useState } from "react";



export default function Page() {
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 15;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    // todo container

    <div className="w-[600px] mx-auto mt-3">
      {/* container to make it in center */}
      <div className="flex justify-between ">
        {/* toggle */}
        <Toggle label="show only waiting" defaultChecked />
        {/* drop down */}
        <div className="w-1/3">
          <NativeSelect placeholder="Select an option">
            <NativeSelectOption value="5">5 items per page</NativeSelectOption>
            <NativeSelectOption value="10">10 items per page</NativeSelectOption>
            <NativeSelectOption value="50">50 items per page</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>
      {/* table */}
      <div className=" mt-3">
        <TableRoot>
          <TableHeader>
            <TableRow >
              <TableHead scope="col">ID</TableHead>
              <TableHead scope="col">Title</TableHead>
              <TableHead scope="col">Completed</TableHead>
            </TableRow>

          </TableHeader>

          <TableBody>
            <TableRow>

              <TableCell>
                10
              </TableCell>

              <TableCell>
                title
              </TableCell>

              <TableCell>
                Completed
              </TableCell>

            </TableRow>

            <TableRow>

              <TableCell>
                10
              </TableCell>

              <TableCell>
                title
              </TableCell>

              <TableCell>
                Completed
              </TableCell>

            </TableRow>

            <TableRow>

              <TableCell>
                10
              </TableCell>

              <TableCell>
               title
              </TableCell>

              <TableCell>
                Completed
              </TableCell>

            </TableRow>
          </TableBody>
        </TableRoot>
      </div>
      {/* pagination */}
      <div className="mt-3 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          sideLayout="label"
        />
      </div>
    </div>
  );
}
