/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
'use client'
import React, {SVGProps, useState} from "react";
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
import { UsefetchUsers, useModifyUser, useUpdateUser } from "@/src//hooks/users.hook";
import { Button } from "@nextui-org/button";


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
  const {mutate:userUpdate}=useModifyUser()
  const{data:userData}=UsefetchUsers();
  const handleBlockUser=(id:string,isBlocked:boolean)=>{
    const userData={
      ban:isBlocked
    }
    //console.log(userData);
    
    userUpdate({ userData, id })
  }
  return (
<Table>
      <TableHeader className="text-center" columns={columns}>
        {(column) => <TableColumn  key={column.key}>{column.label}</TableColumn>}
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
                <Button onPress={()=>handleBlockUser(row?._id,!row?.ban)} color={row?.ban?"success":"danger"} variant="bordered">
                {row?.ban?'UnBlock User':'Block User'}
                </Button>
              </div>
              </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
