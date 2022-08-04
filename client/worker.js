console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "DjMiles",
    icon: "https://commons.wikimedia.org/wiki/File:Pok%C3%A9mon_Dark_Type_Icon.svg"
  });
});