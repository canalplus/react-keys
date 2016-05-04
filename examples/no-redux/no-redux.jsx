const {Binder, keysInit} = ReactKeys;

keysInit();

const Card = ({id, active}) => {
  const style = active ? 'selected' : '';
  return (
    <li id={id} className={style}>#{id}</li>
  );
};

function renderWithId(id) {
  ReactDOM.render(<Mosaic binderId="mosaic-1" selectedId={id}/>, document.getElementById('body'));
}

function onKey(element) {
  renderWithId(element.id);
}

const Mosaic = ({binderId, selectedId}) => {
  return (
    <Binder
      id={binderId}
      onLeft={onKey}
      onUp={onKey}
      onDown={onKey}
      onRight={onKey}>
      <ul>
        <Card id={binderId + '-1'} active={selectedId === binderId + '-1'}/>
        <Card id={binderId + '-2'} active={selectedId === binderId + '-2'}/>
        <Card id={binderId + '-3'} active={selectedId === binderId + '-3'}/>
        <Card id={binderId + '-4'} active={selectedId === binderId + '-4'}/>
        <Card id={binderId + '-5'} active={selectedId === binderId + '-5'}/>
        <Card id={binderId + '-6'} active={selectedId === binderId + '-6'}/>
      </ul>
    </Binder>
  );
};

ReactDOM.render(<Mosaic binderId="mosaic-1"
                        selectedId="mosaic-1-1"/>, document.getElementById('body'));
