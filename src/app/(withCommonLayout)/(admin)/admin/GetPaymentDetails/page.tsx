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
} from "@heroui/table";

import { UsefetchPayment } from "@/src//hooks/payment.hook";


const columns = [
{
    key: "email",
    label: "email",
    },
  {
    key: "price",
    label: "Price",
  },
  // {
  //   key: "status",
  //   label: "status",
  // },
  {
    key: "transactionId",
    label: "Transaction Id ",
  },
];

export default function GetPaymentDetails() {
  const{data:paymentdata}=UsefetchPayment();
  // console.log(paymentdata?.data);
  return (
<Table  fullWidth={false}>
      <TableHeader  columns={columns}>
        {(column) => <TableColumn align="center" key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody className="space-x-4">
        {paymentdata?.data?.map((row:any) =>
          <TableRow key={row._id}>
              {/* <TableCell> */}
                {/* <User
                    avatarProps={{radius: "lg", src: row?.profilePhoto}}
                    description={row?.email}
                    name={row?.name}/> */}
              {/* </TableCell> */}
              <TableCell>{row?.email}</TableCell>
              <TableCell>{row?.price}</TableCell>
              {/* <TableCell>{row?.status}</TableCell> */}
              <TableCell>{row?.transactionId}</TableCell>
              {/* <TableCell>
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
              </TableCell> */}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
