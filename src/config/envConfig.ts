const envConfig = {
  baseApi: process.env.NEXT_PUBLIC_BASE_API,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  stripeClient:process.env.NEXT_STRIPE_CLIENT_CODE
};

export default envConfig;
