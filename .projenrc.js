const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.30.0',
  defaultReleaseBranch: 'main',
  name: 'intrinsic-highlights',

  deps: [
    '@datadog/datadog-ci',
    '@matthewbonig/state-machine',
    '@wheatstalk/cdk-intrinsic-validator@0.2.8',
    'datadog-cdk-constructs-v2',
    'eslint',
  ],
});
project.synth();
