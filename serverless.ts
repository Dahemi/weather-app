import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'weather-app',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-domain-manager',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      WEATHER_API_KEY: '6addfa0f0aa2b1796b17f86986f7a9e5',
    },
  },
  // import the function via paths
  functions: { hello },
  package: { individually: true },
  custom: {
    customDomain: {
      domainName: 'weather.dahami.online',
      certificateName: '*.dahami.online',
      createRoute53Record: true,
      endpointType: 'regional',
      securityPolicy: 'tls_1_2',
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
