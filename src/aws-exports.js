const awsConfig = {
    Auth: {
        region: 'YOUR_REGION',
        userPoolId: 'YOUR_USER_POOL_ID',
        userPoolWebClientId: 'YOUR_USER_POOL_CLIENT_ID',
    },
    Storage: {
        AWSS3: {
            bucket: 'YOUR_S3_BUCKET_NAME',
            region: 'YOUR_REGION',
        }
    },
    Analytics: {
        disabled: false,
        autoSessionRecord: true,
        AWSPinpoint: {
            appId: 'YOUR_PINPOINT_PROJECT_ID',
            region: 'YOUR_REGION',
        }
    }
};

export default awsConfig; 