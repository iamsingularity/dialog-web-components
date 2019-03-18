```jsx
const { users, group, channel, bot } = require('../../fixtures/peerInfo');
const messages = require('../../fixtures/messages');
const { random } = require('lodash');
const info = [...users, group, channel, bot];
const dialogs = [];

for (let i = 0; i < 200; i++) {
  dialogs.push({
    info: info[random(0, info.length - 1)],
    isMuted: !!random(0, 1),
    isPinned: !!random(0, 1),
    counter: random(0, 100),
    message: !!random(0, 1)
      ? {
          sender: messages[0].sender,
          content: {
            type: 'text',
            text: messages[0].content.text,
          },
        }
      : null,
  });
}

<div style={{ height: 400, width: 260, overflow: 'auto' }}>
  <DialogList dialogs={dialogs} onRender={console.log} onSelect={console.log} />
</div>;
```
