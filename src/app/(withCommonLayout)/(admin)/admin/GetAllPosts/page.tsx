/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
'use client'
import React, {SVGProps} from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue
} from "@heroui/table";

import {Chip} from '@heroui/chip'
import {User} from "@heroui/user";
import { Tooltip } from "@heroui/tooltip";
import { DeleteIcon, EditIcon, EyeIcon } from "@/src//components/icons";
import { useDeletePosts, UseGetPosts } from "@/src//hooks/post.hook";
import { Ipost } from "../../../../../../types";
import Link from "next/link";
import { Button } from "@nextui-org/button";


const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "Action",
    label: "Action ",
  },
];

export default function GetAllPosts() {
  const {mutate:deletePostMutate}=useDeletePosts();
  const{data:postData}=UseGetPosts();
 // console.log(postData?.data);
 const handleDelete=(id:any)=>{
  deletePostMutate({id});
}
  return (
<Table aria-label="">
      <TableHeader columns={columns}>
        {(column) => <TableColumn align="center" key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody>
        {postData?.data?.map((row:any) =>
          <TableRow key={row._id}>
              <TableCell>{row?.userID?.name}</TableCell>
              <TableCell>{row?.userID?.email}</TableCell>
              <TableCell>{row?.title}</TableCell>
              <TableCell>
              <div className="relative flex items-center gap-2">
                <Link href={`/posts/${row?._id}`}>
                  <Tooltip content="Details">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Tooltip>
                </Link>
                {/* <Tooltip content="Edit post">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Tooltip> */}
                <Tooltip color="danger" content="Delete post">
                  <Button  variant="light" isIconOnly onPress={()=>handleDelete(row?._id)} className=" p-0 m-0 min-w-0 w-auto h-auto  text-lg text-default-400 cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </Button >
                </Tooltip>
              </div>
              </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
