# Getting Started
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### SSL certs
You will need to add the ssl cert that was created for the Node backend app to be added to this project also.  2 key value pairs in the .env.example need to be added to the .env file. 
```
SSL_CRT_FILE=server.cert 
SSL_KEY_FILE=server.key
```
 Add Server.cert and server.key to the root of this project.  Next you will have to add the cert to the mac key chain of the development machine.  You will do this by going into 
 Chrome settings/Privacy and security/Security/Manage certificates.  This will bring up the keychain access.  

In keychain access click "login" on the left. then click File/import items in the menu at the top. Select the server.cert file from its location.  

Once it is added you need to tell the browser chrome to trust it.  double click the blue plus sign.  Click trust section. Select "When using this certificate: Always Trust"  This should set all the drop down items to "Always Trust"  close and restart chrome.  Local host should be loading after you click to to this site anyway.  
