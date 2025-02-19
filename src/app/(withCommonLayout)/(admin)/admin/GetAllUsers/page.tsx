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
import { UseGetPosts } from "@/src//hooks/post.hook";
import { Ipost } from "../../../../../../types";
import { UsefetchUsers } from "@/src//hooks/users.hook";


const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
{
    key: "name",
    label: "Name",
    },
  {
    key: "role",
    label: "role",
  },
  {
    key: "status",
    label: "status",
  },
  {
    key: "Action",
    label: "Action ",
  },
];

export default function GetAllUsers() {
  const{data:userData}=UsefetchUsers();
  console.log(userData?.data);
  return (
<Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody className="space-x-4">
        {userData?.data?.map((row:any) =>
          <TableRow key={row._id}>
              <TableCell>
                <User
                    avatarProps={{radius: "lg", src: row?.profilePhoto}}
                    description={row?.email}
                    name={row?.name}/>
              </TableCell>
              <TableCell>{row?.role}</TableCell>
              <TableCell>{row?.status}</TableCell>
              <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip content="Details">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon />
                  </span>
                </Tooltip>
                <Tooltip content="Edit user">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete user">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
              </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
