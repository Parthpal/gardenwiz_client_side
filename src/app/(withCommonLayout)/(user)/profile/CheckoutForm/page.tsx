/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import GWInput from '@/src//components/UI/Form/GWInput';
import { useUser } from '@/src//context/user.provider';
import {postPaymentData, postPaymentIntent } from '@/src//service/Payment';
import { updateUserStatus } from '@/src//service/Profile';
import { Button } from '@nextui-org/button';
import { CardHeader } from '@nextui-org/card';
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const CheckOutForm = () => {
    //const [membership_prices,setMembershipPrice]=useState(0);
    let membership_prices=19.99;
    const {user}=useUser();
    let user_name=user?.name;
    const router=useRouter();
    //const package_array=name.split(" ");
   // const package_name=package_array[0];
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId,setTransactionId]=useState("");
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError]=useState<any>('');
    const methods = useForm({
      defaultValues: {
        name:'',
      },});
      const { control, handleSubmit,reset } = methods;
      useEffect(() => {
        if (user) {
          reset({ name: user?.name }); // Update form with user data
        }
      }, [user]);
      useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (membership_prices > 0) {
                postPaymentIntent({price: membership_prices})
                .then((res) =>{
                //console.log(res.clientSecret,'client secret');
                setClientSecret(res.clientSecret)
                }
                );
        }
      }, [membership_prices]);
      if (!user) {
        return <p>Loading...</p>;
      }
    const submitHandler = methods.handleSubmit;
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        //setMembershipPrice(19.99);
        if (!stripe || !elements) {
            console.error('Stripe.js has not loaded yet.');
            return;
        }    
        // Get references to the required Stripe elements
        const cardExpiry = elements.getElement(CardExpiryElement);
        const cardCvc = elements.getElement(CardCvcElement);
        const cardNumber = elements.getElement(CardNumberElement);
    
        if (!cardExpiry || !cardCvc || !cardNumber) {
            console.error('Stripe elements are not fully loaded.');
            return;
        }
    
        try {
            // Create a PaymentMethod using the card details
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumber, // Use cardNumber for full card details
            });
            if (error) {
                console.error('[Stripe Error]', error.message);
                setError(error.message);
                return;
            }
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
            // Proceed with backend integration or further processing
        } catch (err) {
            console.error('Error submitting payment:', err);
            setError('Payment submission failed.');
        }
        //confirm card-payment
        console.log(clientSecret,'client secret');
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                card:cardNumber,
                billing_details: {
                    email:user?.email,  
                    name: user?.name
                }
                }
            }
            );
            if(confirmError){
                console.log('confirm error',confirmError);
              }
              else{
                console.log('payment intent',paymentIntent);
                if(paymentIntent.status === 'succeeded'){
                    console.log('transaction id',paymentIntent.id);
                    setTransactionId(paymentIntent.id);
                    // now save the payment in the database
                    const payment = {
                        email: user?.email,
                        price: membership_prices,
                        transactionId: paymentIntent.id,
                        status: 'pending'
                    }
                   // console.log(payment);
                    
                    const res = await postPaymentData(payment);
                    console.log('payment saved', res.data);
                    if (res?.data?._id) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Payment completed",
                            showConfirmButton: false,
                            timer: 1500
                        });
                                router.push('/')
                                updateUserStatus(user?._id)
                                // const res=axiosSecure.put(`/users/${user.email}`,{
                                //   badge:package_name
                                // })
                                // console.log(res.data);
                                        
                                    }
                }
              }
    };

    return (<>
    
    <FormProvider {...methods}>
                <div className=''>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" onSubmit={submitHandler(onSubmit)}>
                        <div className='space-y-2'>
                            <h1 className='text-lg'>Name</h1>
                            <GWInput className='border-1 border-black text-5xl rounded-xl text-2xl' label='' name='name' type='text'/>
                        </div>
                        <div className='space-y-2'>
                            <h1 className='text-lg'>CVV(3/4 digit code) </h1>
                            <CardCvcElement
                            className='border-1 border-black h-10 py-1.5 rounded-xl text-5xl pl-4'
                            options={{
                                style: {
                                base: {
                                    fontSize: '21px',
                                    color: '#424770',
                                    '::placeholder': {
                                    color: '#aab7c4',
                                    padding:'10px',
                                    },
                                    
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                                
                                },
                                }
                                
                            } 
                            />
                        </div>
                        <div className='space-y-2'>
                            <h1 className='text-lg'>Expiration Date(MM/YY)</h1>
                            <CardExpiryElement
                            className='border-1 border-black h-10 py-1.5 rounded-xl text-5xl pl-4'
                            options={{
                                style: {
                                base: {
                                    fontSize: '21px',
                                    color: '#424770',
                                    '::placeholder': {
                                    color: '#aab7c4',
                                    padding:'10px',
                                    },
                                    
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                                
                                },
                            }} 
                        />
                        </div>
                        <div className='space-y-2'>
                        <h1 className='text-lg'>Card Number</h1>
                        <CardNumberElement
                            className='border-1 border-black h-10 py-1.5 rounded-xl text-5xl pl-4'
                            options={{
                                style: {
                                base: {
                                    fontSize: '21px',
                                    color: '#424770',
                                    '::placeholder': {
                                    color: '#aab7c4',
                                    padding:'10px',
                                    },
                                    
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                                
                                },
                            }} 
                        />
                        </div>
                        <Button className='btn w-full col-span-2 my-4 btn-primary' type="submit">
                         Pay ${membership_prices}
                        </Button>
                        <p className='text-red-300'>{error}</p>
                        {transactionId && <p className='text-green-300'>your transactionid:{transactionId}</p>}
                    </form>
                </div>
            </FormProvider>

    </>);
};

export default CheckOutForm