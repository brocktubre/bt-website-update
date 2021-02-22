export const environment = {
  production: true,
  aws_identity_pool_id: 'us-east-1:7bb23c9c-8021-4603-b31d-09287867c85c',
  region: 'us-east-1',
  public_bucket_name: 'brocktubre-s3-sandbox-bucket',
  dynamodb_table_name: 'brocktubre-s3-lambda-dynamodb-integration-sandbox-table',
  auth0: {
    clientID: 'q1cRb6y45UdiZtAfYQ21Bt1LkLg2FbZg',
    domain: 'brocktubre.auth0.com',
    responseType: 'token id_token',
    audience: 'https://brocktubre.auth0.com/userinfo',
    redirectUri: 'https://brocktubre.com/callback',
    scope: 'openid profile'
  },
  qrReader: {
    s3: {
      qrCodeCaptureBucket: 'qr-code-capture'
    },
    apiGateway: {
      processQrCodeUrl: 'https://dr1yb4vbs0.execute-api.us-east-1.amazonaws.com/integration/process-code/'
    },
    dynamoDb : {
      tableName: 'qr-code-info'
    }
  },
  grades: {
    dynamoDb : {
      tableName: 'grades-table'
    },
    lambda : {
      functionName: 'get-grades-with-secret-id',
      functionNameGetTotal: 'get-total-points'
    }
  },
  firehose : {
    stream_name: 'website-capture-sandbox-delivery-stream'
  },
  kinesis : {
    stream_name: 'website-sandbox-kinesis-data-stream'
  },
  cuhackit: {
    api: {
      get_tweets: 'https://iaxktfzlre.execute-api.us-east-1.amazonaws.com/integration/get-tweets'
    }
  },
  brewStats: {
    jsonUrlPreviousBrews: 'https://spreadsheets.google.com/feeds/list/1mz-O7IRzxsVMQXtNIuK_vL14dYV3N2PuNNns9RCCMco/2/public/values?alt=json'
  },
  randomFactUrl: {
    url: 'https://uselessfacts.jsph.pl/random.json?language=en'
  },
  ossCoding: {
    users: {
      james: '1e590b2e',
      brock: '3ec57c8a',
      millon: '41f50466',
      paige: '464cf258',
      igors: '4bc2e3be',
      igorw: '54ffe364'
    },
    apiGateway: {
      comments: 'https://axr3eu7rii.execute-api.us-east-1.amazonaws.com/integration/comments',
      codes: 'https://axr3eu7rii.execute-api.us-east-1.amazonaws.com/integration/codes',
      comment_by_id: 'https://axr3eu7rii.execute-api.us-east-1.amazonaws.com/integration/comment'
    }
  },
  env: 'prod'
};
