self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Default Reminder', body: 'You have a new reminder!' };

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/icon.png',
  });
});
