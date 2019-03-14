```jsx
const { users, group, channel, bot } = require('../../fixtures/peerInfo');
const messages = require('../../fixtures/messages');
const { random } = require('lodash');

initialState = {
  current: null,
  unread: new Map(),
  muted: new Set(),
  pinned: new Set(),
};

function handleSelect(peer) {
  setState({ current: peer.key });
}

function toggleMuted() {
  setState(({ current, muted }) => {
    if (muted.has(current)) {
      muted.delete(current);
      return {
        muted,
      };
    } else {
      return {
        muted: muted.add(current),
      };
    }
  });
}

function togglePinned() {
  setState(({ current, pinned }) => {
    if (pinned.has(current)) {
      pinned.delete(current);
      return {
        pinned,
      };
    } else {
      return {
        pinned: pinned.add(current),
      };
    }
  });
}

function randomizeCounter() {
  setState(({ current, unread }) => {
    return {
      unread: unread.set(current, random(0, 100)),
    };
  });
}

<>
  <Button size="small" onClick={toggleMuted}>
    Toggle muted for selected
  </Button>
  {'  '}
  <Button size="small" onClick={togglePinned}>
    Toggle pinned for selected
  </Button>
  {'  '}
  <Button size="small" onClick={randomizeCounter}>
    Randomize counter
  </Button>
  <hr />
  <div style={{ width: 300 }}>
    {[...users, group, channel, bot].map((peer) => (
      <DialogListItem
        uid={2}
        info={peer}
        key={peer.peer.key}
        counter={state.unread.get(peer.peer.key)}
        selected={peer.peer.key === state.current}
        isPinned={state.pinned.has(peer.peer.key)}
        isMuted={state.muted.has(peer.peer.key)}
        message={{
          type: 'text',
          sender: messages[1].sender,
          content: messages[1].content.text,
        }}
        onSelect={handleSelect}
      />
    ))}
  </div>
</>;
```
