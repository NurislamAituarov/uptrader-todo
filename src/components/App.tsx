import { useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import { Context } from '../lib/context';
import './App.css';
import { Table } from './table/Table';
import { Form } from './create-task/Form';

function App() {
  const [popup, setPopup] = useState('');
  const notice = useAppSelector((state) => state.state.notice);

  return (
    <Context.Provider value={{ popup, setPopup }}>
      <div className="wrapper">
        <div className="header">Name project</div>
        <div onClick={() => setPopup('create')}>Add Task</div>
        {notice && <p id="notice">{notice}</p>}
        <main className="main">
          <Table />
        </main>

        {popup === 'create' && <Form />}
      </div>
    </Context.Provider>
  );
}

export default App;
