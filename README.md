# receptionbot-slackbot-fe

This is the frontend component of the Reception Slackbot. It is the interface with which to interact with the [backend API](https://github.com/thebarbariangroup/receptionbot-slackbot-fe).

## Prerequisites
 - [Node](https://nodejs.org/en/) v6.12.3 (NPM v3.10.10)
 - [Vue](https://vuejs.org/) v2.5.2 

## Building the app

### Install modules

```npm install```

### Running server
- Check the ```config/dev.env.js``` file and set the appropriate variables
- - Change ```API_URI``` to the URI that the backend API is being served
- - Make sure ```NODE_ENV``` is set to 'development' for development or 'production' for production

#### Dev build:
- Start the server via ```npm run dev```

If everything goes well, you should see: 
```Listening at http://localhost:8080``` (or whatever port you have open above 8080)
and the app should open in your browser.

You can now update the code in your Vue application and have the browser hot-reload the changes.


#### Prod build:
- Start the build process via ```npm start```
- Serve the built files (located in the ```/dist``` folder via your favorite webserver)

## Logging in for the first time
The first user that is created from the Sign Up page will be given Admin rights. All subsequent users need to be verified by an Admin.
Users can be verified by clicking on their username in the admin panel and then clicking Verify.

## Creating an API Key
In order for an external source to access the API (such as an Alexa skill or another website), an API key needs to be created and sent with each request as a Bearer token.
The API key can be created on the Admin panel.