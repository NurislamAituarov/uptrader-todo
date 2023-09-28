import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import { Context } from '../lib/context';
import './App.scss';
import { Table } from './table/Table';
import { FormCreate } from './form/FormCreate';

function App() {
  const notice = useAppSelector((state) => state.state.notice);
  const [popup, setPopup] = useState('');
  const [noticeActive, setNoticeActive] = useState(false);

  useEffect(() => {
    if (popup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [popup]);

  useEffect(() => {
    setNoticeActive(true);
    setTimeout(() => {
      setNoticeActive(false);
    }, 2000);
  }, [notice]);

  function openPopup() {
    setPopup('create');
  }

  return (
    <Context.Provider value={{ popup, setPopup }}>
      <div className="wrapper">
        <div className="project__control">
          <h1>Name project</h1>
          <button className="btn" onClick={openPopup}>
            Add Task
          </button>
        </div>

        {notice && noticeActive && (
          <p id="notice" className="notice">
            {notice}
          </p>
        )}
        <main className="main">
          <Table />
        </main>

        {popup === 'create' && <FormCreate />}
      </div>
    </Context.Provider>
  );
}

export default App;
