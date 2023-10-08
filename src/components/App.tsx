import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import { Context } from '../lib/context';
import './App.scss';
import { Table } from './table/Table';
import { FormCreate } from './form/FormCreate';
import { ChangeTask } from './table/change-task/ChangeTask';

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
  function openPopupChange() {
    setPopup('change');
  }

  function closePopup() {
    setPopup('');
  }

  return (
    <Context.Provider value={{ popup, closePopup, openPopupChange }}>
      <div className="wrapper">
        <div className="project__control">
          <h1>Название проекта</h1>
          <button className="btn" onClick={openPopup}>
            Добавить задачу
          </button>
        </div>

        {notice && noticeActive && (
          <p id="notice" className="notice">
            {notice}
          </p>
        )}
        <main className="main" onClick={() => setPopup('')}>
          <Table />
        </main>

        {popup === 'create' && <FormCreate />}
        {popup === 'change' && <ChangeTask />}
      </div>
    </Context.Provider>
  );
}

export default App;
