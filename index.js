
import * as OneSignal from '@onesignal/node-onesignal';

export const handler = async (event) => {
    const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;
    /*
    * CREATING ONESIGNAL KEY TOKENS
    */
    const app_key_provider = {
        getToken() {
            return  process.env.REST_API_KEY;
        }
    };
    console.log('app_key_provider', app_key_provider.getToken());
    /**
     * CREATING ONESIGNAL CLIENT
     */
    const configuration = OneSignal.createConfiguration({
        authMethods: {
            app_key: {
                tokenProvider: app_key_provider
            }
        }
    });
    const client = new OneSignal.DefaultApi(configuration);

    /**
     * CREATE PUSH NOTIFICATION
     */
    const notification = new OneSignal.Notification();
    notification.app_id = ONESIGNAL_APP_ID;
    notification.included_segments = ['Subscribed Users'];
    notification.contents = {
        en: "Hello OneSignal!"
    };

    let {id} = await client.createNotification(notification);

    /**
     * CREATE EMAIL NOTIFICATION
     */
    const email = new OneSignal.Notification();
    email.app_id = ONESIGNAL_APP_ID;
    email.included_segments = ['Subscribed Users'];
    email.contents.email_subject = 'Welcome to OneSignal!',
    email.contents.email_body = '<html><head><body><h1>Welcome to OneSignal NodeJS SDK<h1></body></html>';

    await client.createNotification(email);
    
    /**
     * VIEW NOTIFICATION  
     */
     const response = await client.getNotification(ONESIGNAL_APP_ID, id);
     console.log(response);
     return response;
};

