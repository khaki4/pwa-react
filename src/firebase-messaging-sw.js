importScripts('https://www.gstatic.com/firebasejs/5.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.2/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyCkSzadKeQPBoyhXiYEnxI8ZktVfrhw8Is",
  authDomain: "react-pwa-1e7cf.firebaseapp.com",
  databaseURL: "https://react-pwa-1e7cf.firebaseio.com",
  projectId: "react-pwa-1e7cf",
  storageBucket: "react-pwa-1e7cf.appspot.com",
  messagingSenderId: "232333505269"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(({ data }) => {
  const title = data.title || 'Title';
  const opts = Object.assign({
    body: data.body || 'Body'
  }, data);

  return self.registration.showNotification(title, opts);
});