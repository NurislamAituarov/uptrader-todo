import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import 'devextreme/dist/css/dx.light.css';

import { Context } from '../../lib/context';
import { FormCreate } from '../form/FormCreate';
import { ChangeTask } from '.././board/change-task/ChangeTask';
import { KanbanBoard } from '.././board/Table';
import { getDataLocalStorage } from '../../lib/localStorage';
import { newMovedTaskItems } from '../../store/actions';
import './App.scss';

function App() {
  const tasks = useAppSelector((state) => state.state.items);

  const notice = useAppSelector((state) => state.state.notice);
  const [popup, setPopup] = useState('');
  const [noticeActive, setNoticeActive] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localTasks = getDataLocalStorage('tasks');
    localTasks && dispatch(newMovedTaskItems(localTasks));
  }, []);
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
          <KanbanBoard tasks={tasks} />
        </main>

        {popup === 'create' && <FormCreate />}
        {popup === 'change' && <ChangeTask />}
      </div>
    </Context.Provider>
  );
}

export default App;
