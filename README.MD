# OneSignal NodeJS-AWS-Lambda-Sample

<p>
  <a href="https://github.com/OneSignal/onesignal-expo-plugin/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://twitter.com/onesignaldevs" target="_blank">
    <img alt="Twitter: onesignaldevelopers" src="https://img.shields.io/twitter/follow/onesignaldevs?style=social" />
  </a>
</p>

This sample app demonstrates how to send push notifications to your app using the [OneSignal NodeJS SDK Client library](https://github.com/OneSignal/node-onesignal) and [AWS Lambdas](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html).

The NodeJS code was generated with [NodeJS](https://nodejs.org/de/blog/release/v14.16.0/) version v14.16.0

Take a look at the [OneSignal documentation](https://documentation.onesignal.com/docs) to learn how to integrate OneSignal into your project. After you have integrated OneSignal into your application, you can use NodeJS to send push notification using the OneSignal NodeJS SDK Client Library.

The AWS Lambda was generated with [AWS Lambda](https://aws.amazon.com/lambda/) NodeJS version v16.X.X.


## NodeJS SDK Client Library Setup

- Install the OneSignal NodeJS Client by running `npm install @onesignal/node-onesignal --save` (npm install).

- Now, create the .zip from the project to be able to upload it to AWS Lambda.

Run the following command to create the .zip file:

Windows: `7z a -tzip -r OneSignal-NodeJS-AWS-Lambda-Sample.zip .`
OSX: `zip -r OneSignal-NodeJS-AWS-Lambda-Sample.zip .`

Open the .zip file in your AWS Lambda console.

### Tokens Builder

To authentificate the app, you will need to use your OneSignal REST API key. Create a key provider object with the function `getToken()` that returns your key.

```javascript
 const app_key_provider = {
     getToken() {
         return process.env.REST_API_KEY';
     }
 };
```

### Client Configuration
We can configure the client using the `createConfiguration()` function. The configuration object can be used to set the `app_key_provider` properties.

```javascript
const configuration = OneSignal.createConfiguration({
    authMethods: {
        user_key: {
            tokenProvider: user_key_provider
        },
        app_key: {
            tokenProvider: app_key_provider
        }
    }
});
const client = new OneSignal.DefaultApi(configuration);
```

### Create Notification

Create a push notification and send it to your users of your app.

- [Postman](https://www.postman.com/onesignaldevs/workspace/onesignal-api/request/16845437-c4f3498f-fd80-4304-a6c1-a3234b923f2c)
- [REST API Reference](https://documentation.onesignal.com/reference#create-notification)

```javascript
const notification = new OneSignal.Notification();
notification.app_id = ONESIGNAL_APP_ID;
notification.included_segments = ['Subscribed Users'];
notification.contents = {
  en: "Hello OneSignal!"
};

const {id} = await client.createNotification(notification);
```
### View Notification

View the details from a push notification you have sent using OneSignal.

- [Postman](https://www.postman.com/onesignaldevs/workspace/onesignal-api/request/16845437-6c96ecf0-5882-4eac-a386-0d0cabc8ecd2)
- [REST API Reference](https://documentation.onesignal.com/reference#view-notification)

```javascript
const response = await client.getNotification(ONESIGNAL_APP_ID, id);
console.log(response);
```

### Show Your Support

Give a :star:️ if this project helped you!

### Join the OneSignal Developers Community
The OneSignal Developer community is a group of passionate individuals who work with OneSignal products. Community members have the opportunity to expand their network and knowledge across different technologies.

* Website: https://onesignal.com/onesignal-developers
* Twitter: [@OneSignalDevs](https://twitter.com/onesignal)
* Github:  [@OneSignalDevelopers](https://github.com/OneSignal)
* Discord: [@onesignal-metabase](https://linkedin.com/company/onesignal)