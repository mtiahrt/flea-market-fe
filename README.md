## Setting up Development environment
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
To get started first install on the app using node.  Open a command line prompt and type:
This Repo depends on the BE being set up already.  If you have not done so start there first.  
[located here](https://github.com/mtiahrt/flea-market-BE)

I'm using node version `16.15.1`

First clone this repo
followed by 
`npm install`

Create env file.  ```.env.development```
### SSL certs
You will need to add the ssl cert that was created for the Node backend app to be added to this project also.  2 key value pairs in the .env.example need to be added to the .env file. 
```
SSL_CRT_FILE=server.cert 
SSL_KEY_FILE=server.key
```
 Add Server.cert and server.key to the root of this project.  This should be a copy of the files you generated for the Backend project.  
 Next you will have to add the cert to the mac keychain of the development machine.  You will do this by going into 
 Chrome settings/Privacy and security/Security/Manage certificates.  This will bring up the keychain access.
### Facebook and Google OAuth
environment variables for firebase are in the env file.  Facebook appId and app secret are in Firebase under Authentication.  Facebook needs the redirect URI you get from Firebase.  This redirect from firebase has to be added in Facebook for developers site.  Click facebook login/settings under "Valid OAuth Redirect URIs"
### Mac cert install
Open your keychain.  `cmd + space` type keychain access. In keychain access click 
1. "login" on the left. 
2. click File/import items in the menu at the top. 
3. Select the server.cert file from its location.  Should be in the root of this project  

Once it is added you need to tell the browser in this case Chrome to trust it.  
In keychain access 
1. select the `certificates` tab at the top left
2. double-click on the local host cert
3. expand the `Trust` option 
4. Select "When using this certificate: Always Trust"  
   - This should set all the dropdowns items to "Always Trust"
5. save and close
6. close and restart chrome.

### `npm start`

Runs the app in the development mode.
Open [https://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Production Environment
The front end app is stored on a S3 bucket on AWS.  This bucket is private and only
accessible through AWS Cloudfront service.  The Cloudfront service will distribute the 
React files to the requesting browser over https.  The SSL cert was created using AWS Certificate manager.
The domain was purchased on www.GoDaddy.com.  I changed the nameservers on GoDaddy to the 
values I received from Cloudfront.  

Create env file.  ```.env.production```  remove the values mentioned in the ```env.example```

I followed this tutorial to set up the production
environment for this app.  [Deploy React App to CloudFront with HTTPS Custom Domain
](https://www.youtube.com/watch?v=lPVgfSXTE1Y&list=WL&index=3&ab_channel=SamMeech-Ward)
All environment variables stored in these files .env is ok to be served to the browser.  
They are public values, and they alone will not give unauthorized access.

## Deployment
This app can be deployed through npm commands.  Before that is done you will need to set up the CLI on your machine.  [Install AWS CLI.](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
The IAM user used to update the s3 bucket is  `app-sync-s3`.  You will need to create an access key in AWS to finish the CLI configuration.  
This can be completed in 4 easy steps.
1. Commit your changes to the git repo
2. Build the app by running `npm run build` This creates the package bundles in the build folder.  These files need to be uploaded to S3.
3. Upload the files `npm run sync` 
4. To make these changes visible immediately the cloudfront cache need to be refreshed. `npm run invalidate`