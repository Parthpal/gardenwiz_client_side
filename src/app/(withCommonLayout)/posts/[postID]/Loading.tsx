/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import Container from '@/src//components/Container';
import { Skeleton } from '@heroui/skeleton';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import React from 'react';

const PostDetailsLoading = () => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    const toggleLoad = () => {
      setIsLoaded(!isLoaded);
    };
    return (
        <Container>
        <div>
        <Card
            isBlurred
            className="shadow-none border-none w-full"
            >
            <CardBody>
            <div className='flex flex-col-reverse justify-between '>
                    <div className="relative w-full mt-4">
                        <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                            <div className="h-96 rounded-lg bg-secondary" />
                        </Skeleton>
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8 w-full">
                    <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg mb-5" isLoaded={isLoaded}>
                            <div className="h-4 w-full rounded-lg bg-secondary" />
                        </Skeleton>
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="w-4/5 rounded-lg" isLoaded={isLoaded}>
                            <div className="h-3 w-full rounded-lg bg-secondary" />
                        </Skeleton>
                        <Skeleton className="w-3/5 rounded-lg" isLoaded={isLoaded}>
                            <div className="h-3 w-full rounded-lg bg-secondary-300" />
                        </Skeleton>
                        <Skeleton className="w-3/5 rounded-lg" isLoaded={isLoaded}>
                            <div className="h-3 w-full rounded-lg bg-secondary-200" />
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg" isLoaded={isLoaded}>
                            <div className="h-3 w-full rounded-lg bg-secondary-200" />
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg" isLoaded={isLoaded}>
                            <div className="h-3 w-full rounded-lg bg-secondary-200" />
                        </Skeleton>
                     </div>
                    </div>
            </div>
            </CardBody>
            <CardFooter className="flex w-full justify-between items-center my-5 align-middle mb-8">
            <div className="flex flex-col">
                    <div className="flex justify-around space-x-5 ">
                    <Skeleton className="h-3 w-2/5 rounded-lg" />
                    <Skeleton className="h-3 w-2/5 rounded-lg" />
                    <Skeleton className="h-3 w-2/5 rounded-lg" />
                    </div>
            </div>
            </CardFooter>
        </Card>

        </div>
        </Container>
    )
};

export default PostDetailsLoading;