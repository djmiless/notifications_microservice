
const publicVapidKey = 'BGmG1JXYpIOss7GWLoppCF0wJqAVZ2AAlujZjEe3tDBupZRHD3QSOqaHkDPYZhm0ydEy6mPBNClr8OhiBs5uaJI';

// check for service worker

if ('serviceWorker' in navigator){
    send().catch(err => console.error(err))
}

// Register service worker, Register Push, Send Push

async function send() {
    // Register Service Worker
    console.log('Registering service worker...')
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope:'/'
    });
    console.log('service worker registered...');

    //Register push 
    console.log('Registering Push')
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey
    })

    console.log('Push Registered....')


    // send push notification 
    console.log('sending push....');
    await fetch('/subscribe', {
        method:'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push Sent')
}

 