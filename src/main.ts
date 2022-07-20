import { App } from 'aws-cdk-lib';
import { VideoEncoderStack } from './VideoEncoderStack';


const app = new App();

new VideoEncoderStack(app, 'intrinsic-highlights-test', { datadogApiKey: process.env.DATADOG_API_KEY! });

app.synth();
