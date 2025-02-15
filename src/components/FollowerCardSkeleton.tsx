/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */

import {Skeleton} from "@heroui/skeleton";
import { Card } from "@nextui-org/card";

export default function FollowCardSkeleton() {
  return (
    <Card className="max-w-[340px] space-y-5 p-4" radius="lg">
    <div className="max-w-[300px] w-full flex items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-2/5 rounded-lg" />
      </div>
    </div>
    </Card>
  );
}
