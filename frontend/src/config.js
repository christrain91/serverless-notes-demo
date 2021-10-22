const config = {
  s3: {
    REGION: process.env.REACT_APP_REGION,
    BUCKET: process.env.REACT_APP_BUCKET
  },
  apiGateway: {
    REGION: process.env.REACT_APP_REGION,
    URL: process.env.REACT_APP_API_URL
  },
  cognito: {
    REGION: process.env.REACT_APP_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID
  },
  STRIPE_KEY: 'pk_test_51JmbqSHgCj0Rw9SF5yOuFUTFGPObQAPqcmS9wh3UhMkO6KHhtTb16KwRoEtCgdnwUEJr3nW8Uk8yQaJGHgmKGBUk0082B4Bqqk'
}

export default config