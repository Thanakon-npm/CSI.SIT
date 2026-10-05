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

import { Spinner } from "@/components/tailgrids/core/spinner";


import { Pagination } from "@/components/tailgrids/core/pagination";
import { useEffect, useState } from "react";

import { TodoType, fetchTodos } from "@/data/todo";
import { Button } from "@/components/tailgrids/core/button";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [todosRaw, setTodosRaw] = useState<TodoType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [onlyWaiting, setOnlyWaiting] = useState<boolean>(false);

  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [totalPages, setTotalPages] = useState<number>(3);

  const [todos, setTodos] = useState<TodoType[]>([]);


  useEffect(() => {
    fetchTodos()
      .then((data) => {
        //console.log('data : ', data)
        setTodosRaw(data as TodoType[])
      })
      .catch(error => {
        console.log('error', error)
        setTodosRaw([])
      })
      .finally(() => {
        console.log('end')
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (onlyWaiting) {
      const remain = todosRaw.filter((todo) => {
        return todo.completed === false;
      });
      setTodos(remain);
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);

  useEffect(() => {
    setTotalPages(Math.ceil(todos.length / itemsPerPage))
  }, [itemsPerPage, todos])

  useEffect(() => {
    if (totalPages) {
      if (currentPage <= 0) setCurrentPage(1)
      else if (currentPage > totalPages) setCurrentPage(totalPages)
    }
  }, [totalPages])

  return (
    // todo container

    <div className="w-[600px] mx-auto mt-3">
      {/* container to make it in center */}
      <div className="flex justify-between ">
        {/* toggle */}
        <Toggle label="show only waiting" checked={onlyWaiting} onChange={(e) => setOnlyWaiting(e.target.checked)} />
        {/* drop down */}
        <div className="w-1/3">
          <NativeSelect placeholder="Select an option" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
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

            {
              isLoading && <TableRow>
                <TableCell> <Spinner className="mx-auto" /> </TableCell>
              </TableRow>
            }

            {
              !isLoading && todos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-red-500"> No data </TableCell>
                </TableRow>
              )
            }

            {todos
              .filter((todo, index) => {
                const lower = (currentPage - 1) * itemsPerPage;
                const upper = currentPage * itemsPerPage - 1;
                return index >= lower && index <= upper;
              })
              .map((todo) => {
                return (
                  <TableRow key={todo.id}>
                    <TableCell>
                      {todo.id}
                    </TableCell>

                    <TableCell>
                      {todo.title}
                    </TableCell>

                    <TableCell>
                      {todo.completed ? (
                        <Button className="ml-2" variant="success" size="sm">Done</Button>
                      ) : (
                        <Button className="ml-2 bg-amber-500 hover:bg-amber-600 text-white" size="sm">Waiting</Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}

            {/* completed = false */}
            {/* <TableRow></TableRow> */}

            {/* completed = true  */}
            {/* <TableRow></TableRow> */}


            {/* <TableRow>

              <TableCell>
                10
              </TableCell>

              <TableCell>
                title
              </TableCell>

              <TableCell>
                Completed
              </TableCell>

            </TableRow> */}

            {/* <TableRow>

              <TableCell>
                10
              </TableCell>

              <TableCell>
                title
              </TableCell>

              <TableCell>
                Completed
              </TableCell>

            </TableRow> */}

            {/* <TableRow>

              <TableCell>
                10
              </TableCell>

              <TableCell>
                title
              </TableCell>

              <TableCell>
                Completed
              </TableCell>

            </TableRow> */}
          </TableBody>
        </TableRoot>
      </div>
      {/* pagination */}
      {todos.length > 0 && (
        <div className="mt-4 flex items-center justify-center gap-1">
          <Button
            appearance="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(1)}
            className="h-10 px-3.5"
          >
            First
          </Button>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            sideLayout="icon"
          />

          <Button
            appearance="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="h-10 px-3.5"
          >
            Last
          </Button>
        </div>
      )}
    </div>
  );
}
