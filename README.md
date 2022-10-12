zz# Getting Started
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
To get started first install on the app using node.  Open a command line prompt and type:
This Repo depends on the BE being set up already.  If you have not done so start there first.  
[located here](https://github.com/mtiahrt/flea-market-BE)

I'm using node version `16.15.1`

First clone this repo
followed by 
`npm install`


### SSL certs
You will need to add the ssl cert that was created for the Node backend app to be added to this project also.  2 key value pairs in the .env.example need to be added to the .env file. 
```
SSL_CRT_FILE=server.cert 
SSL_KEY_FILE=server.key
```
 Add Server.cert and server.key to the root of this project.  This should be a copy of the files you generated for the Backend project.  
 Next you will have to add the cert to the mac key chain of the development machine.  You will do this by going into 
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
   - This should set all the drop downs items to "Always Trust"
5. save and close
6. close and restart chrome.

### `npm start`

Runs the app in the development mode.
Open [https://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
