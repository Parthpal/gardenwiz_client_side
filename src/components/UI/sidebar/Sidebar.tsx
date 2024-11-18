/* eslint-disable prettier/prettier */
import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';

import React from 'react';

const Sidebar = () => {
    return (
        <div className=''>
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large" />
            <div className='space-y-5 py-5'>
                <h1>D paul</h1>
                <p>Followers</p>
                <p>Edit Profile</p>
            </div>
            <h1 className='py-5'>Following</h1>
            <div className='space-y-5'>
                <p>Xyz</p>
                <p>zys</p>
                <p>See all ..</p>
            </div>

        </div>
    );
};

export default Sidebar;