import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import 'devextreme/dist/css/dx.light.css';

import { Context } from '../../lib/context';
import { FormCreate } from '../form/FormCreate';
import { ChangeTask } from '.././board/change-task/ChangeTask';
import { KanbanBoard } from '.././board/KanbanBoard';
import { getDataLocalStorage } from '../../lib/localStorage';
import { newMovedTaskItems } from '../../store/actions';
import './App.scss';
import { SwitchTheme } from '../switch-theme/SwitchTheme';

function App() {
  const tasks = useAppSelector((state) => state.state.items);

  const notice = useAppSelector((state) => state.state.notice);
  const [popup, setPopup] = useState('');
  const [noticeActive, setNoticeActive] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localTasks = getDataLocalStorage('tasks');
    localTasks && dispatch(newMovedTaskItems(localTasks));
    startTheme();
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

  // Theme
  const [checked, setChecked] = useState(false);

  function setTheme(themeName: string) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
  }

  function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
      setChecked(false);
    } else {
      setTheme('theme-dark');
      setChecked(true);
    }
  }

  function startTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
      setChecked(true);
    } else {
      setTheme('theme-light');
      setChecked(false);
    }
  }

  return (
    <Context.Provider value={{ popup, closePopup, openPopupChange }}>
      <div className="wrapper">
        <div className="project__control">
          <SwitchTheme toggleTheme={toggleTheme} checked={checked} />
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
