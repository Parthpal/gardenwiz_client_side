/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import {Skeleton} from "@heroui/skeleton";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import React from "react";

export default function ProfileSidebarSkeleton() {
  return (
    <div className="max-w-[300px] w-full items-center gap-3 space-y-5">
      <div className="mb-3">
        <Skeleton className="flex rounded-full w-20 h-20" />
      </div>
      <div className="w-full gap-2 flex flex-col">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
        <Button color="primary" size="lg" variant="flat" />
      <div>
      <h1>Followers</h1>
      <AvatarGroup isBordered max={3}>
        <Avatar showFallback src="https://images.unsplash.com/broken" />
        <Avatar showFallback src="https://images.unsplash.com/broken" />
        <Avatar showFallback src="https://images.unsplash.com/broken" />
      </AvatarGroup>
      </div>
      <div>
      <h1>Followings</h1>
      <AvatarGroup isBordered max={3}>
        <Avatar showFallback src="https://images.unsplash.com/broken" />
        <Avatar showFallback src="https://images.unsplash.com/broken" />
        <Avatar showFallback src="https://images.unsplash.com/broken" />
      </AvatarGroup>
      </div>
      </div>
    </div>
  );
}
