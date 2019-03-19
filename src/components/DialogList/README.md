```jsx
const { users, group, channel, bot } = require('../../fixtures/peerInfo');
const messages = require('../../fixtures/messages');
const { random } = require('lodash');
const info = [...users, group, channel, bot];
const lastMessages = [
  {
    sender: messages[0].sender,
    content: {
      type: 'text',
      text: messages[0].content.text,
    },
  },
  {
    sender: messages[3].sender,
    content: {
      type: 'location',
    },
  },
  {
    sender: messages[1].sender,
    content: {
      type: 'document',
    },
  },
];
const dialogs = [];

for (let i = 0; i < 200; i++) {
  dialogs.push({
    info: info[random(0, info.length - 1)],
    isMuted: !!random(0, 1),
    isPinned: !!random(0, 1),
    counter: random(0, 100),
    message: lastMessages[random(0, lastMessages.length - 1)],
  });
}

<div style={{ height: 400, width: 280 }}>
  <DialogList dialogs={dialogs} onRender={console.log} onSelect={console.log} />
</div>;
```
