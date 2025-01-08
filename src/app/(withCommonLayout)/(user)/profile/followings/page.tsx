/* eslint-disable react/jsx-key */
/* eslint-disable padding-line-between-statements */
'use client'
import { useUser } from "@/src//context/user.provider";
import { Image } from "@nextui-org/image";
import React from "react";

const FollowingPage = () => {
  const { user } = useUser();
  return (
    <div className="gap-4 grid grid-cols-2 sm:grid-cols-3">
      {user?.followingIds?.map((item: any, index) => (
        /* eslint-disable no-console */
        <div className="mx-auto">
          <Image
            key={item._id}
            alt="NextUI hero Image with delay"
            height={200}
            radius="full"
            width={200}
            src={`https://app.requestly.io/delay/1000/${item.profilePhoto}`}
          />
          <p className="text-center">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FollowingPage;
