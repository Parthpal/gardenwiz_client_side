/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
'use client'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

import { useUser } from '@/src//context/user.provider';
import CheckOutForm from './_components/CheckoutForm';
import envConfig from '@/src//config/envConfig';

const Checkout = () => {
    const stripePromise=loadStripe('pk_test_51OFj8sLwl5tXPPRvXp4WU3k8YovunNSyk6zAtSss3mmtJgvrAI8xn5iFuys5eeF0qfhlJ4A9vdCvbKbJDYo1q3Gv00BdlYgTb4');
   // console.log(envConfig.stripeClient)
    return (<>
            <div className='px-5'>
            <div>
                <h3 className='font-bold text-3xl'>Make Payment To verify your Account</h3>
            </div>
            <Elements stripe={stripePromise}>
                <CheckOutForm/>
            </Elements>
            </div>
            </>
        );
};

export default Checkout;