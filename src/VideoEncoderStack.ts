import { Stack, StackProps } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Datadog } from 'datadog-cdk-constructs-v2';
import { TriggerTranscodingFunction } from './constructs/TriggerTranscoding/TriggerTranscodingFunction';
import { VideoTranscodingStackTest } from './constructs/VideoTranscodingStackTest/VideoTranscodingStackTest';

interface VideoEncoderStackProps extends StackProps {

}

export class VideoEncoderStack extends Stack {
  constructor(scope: Construct, id: string, props: VideoEncoderStackProps) {
    super(scope, id, props);

    const mediaBucket = new Bucket(this, 'MediaBucket', {
      blockPublicAccess: {
        blockPublicAcls: true,
        ignorePublicAcls: true,
        blockPublicPolicy: true,
        restrictPublicBuckets: true,
      },
      eventBridgeEnabled: true,
    });
    const transcoder = new TriggerTranscodingFunction(this, 'TranscodingTrigger', {
      bucket: mediaBucket,
    });

    new VideoTranscodingStackTest(this, 'Tester', {
      bucket: mediaBucket,
    });

    const datadog = new Datadog(this, 'Datadog', {
      nodeLayerVersion: 81,
      addLayers: true,
      apiKey: '6f194f7c5766a544765cd0658953342e',
      enableDatadogTracing: true,
      enableDatadogLogs: true,
      env: 'dev',
      service: 'transcoder',
    });
    datadog.addLambdaFunctions([transcoder.lambda]);

  }
}
