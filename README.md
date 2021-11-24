# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### SSL certs
You will need to add the ssl cert that was created for the Node backend app to be added to this project also.  2 key value pairs in the .env.example need to be added to the .env file. 
```
SSL_CRT_FILE=server.cert 
SSL_KEY_FILE=server.key
```
 Add Server.cert and server.key to the root of this project.  Next you will have to add the cert to the mac key chain of the development machine.  You will do this by going into Chrome settings/Privacy and security/Security/Manage certificates.  This will bring up the keychain access.  

In keychain access click "login" on the left. then click File/import items in the menu at the top. Select the server.cert file from its location.  

Once it is added you need to tell the browser chrome to trust it.  double click the blue plus sign.  Click trust section. Select "When using this certificate: Always Trust"  This should set all the drop down items to "Always Trust"  close and restart chrome.  Local host should be loading after you click to to this site anyway.  