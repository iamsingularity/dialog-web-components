```jsx
initialState = {
  online: 2,
  members: 10,
};

const handleChangeOnline = () => {
  setState({
    online: state.online + 1,
  });
};

const handleChangeMembers = () => {
  setState({
    members: state.members + 1,
  });
};

<>
  <div className="styleguide__buttons">
    <Button theme="primary" size="small" onClick={handleChangeOnline}>
      Change online
    </Button>
    <Button theme="primary" size="small" onClick={handleChangeMembers}>
      Change member
    </Button>
  </div>
  <br />
  <GroupOnline online={state.online} members={state.members} />
</>;
```
