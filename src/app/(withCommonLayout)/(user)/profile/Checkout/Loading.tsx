import { Skeleton } from '@heroui/skeleton';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import React from 'react';

const CheckoutLoading = () => {
    return (
        <div>
             <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 w-full mb-5" shadow="sm">
            <CardBody>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className='space-y-2'>
                        <Skeleton className="w-3/5 rounded-lg mb-2">
                            <div className="h-4 w-full rounded-lg bg-secondary" />
                        </Skeleton>
                        <Skeleton className='border-1 border-black h-10 rounded-xl w-full' />
                    </div>
                    <div className='space-y-2'>
                        <Skeleton className="w-4/5 rounded-lg mb-2">
                            <div className="h-4 w-full rounded-lg bg-secondary" />
                        </Skeleton>
                        <Skeleton className='border-1 border-black h-10 rounded-xl w-full' />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <div className='space-y-2'>
                        <Skeleton className="w-3/5 rounded-lg mb-2">
                            <div className="h-4 w-full rounded-lg bg-secondary" />
                        </Skeleton>
                        <Skeleton className='border-1 border-black h-10 rounded-xl w-full' />
                    </div>
                    <div className='space-y-2'>
                        <Skeleton className="w-4/5 rounded-lg mb-2">
                            <div className="h-4 w-full rounded-lg bg-secondary" />
                        </Skeleton>
                        <Skeleton className='border-1 border-black h-10 rounded-xl w-full' />
                    </div>
                </div>
                <Skeleton className='btn w-full col-span-2 my-4 btn-primary h-10 rounded-lg' />
                <Skeleton className='w-full h-4 rounded-lg bg-secondary' />
            </CardBody>
            <CardFooter className="flex w-full justify-between items-center my-5 align-middle">
                <Skeleton className='h-4 w-4/5 rounded-lg bg-secondary' />
            </CardFooter>
        </Card>
        </div>
    );
};

export default CheckoutLoading;