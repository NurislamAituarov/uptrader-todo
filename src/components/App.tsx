import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import 'devextreme/dist/css/dx.light.css';

import { Context } from '../lib/context';
import './App.scss';
import { Table } from './board/Table';
import { FormCreate } from './form/FormCreate';
import { ChangeTask } from './board/change-task/ChangeTask';
import KanbanBoard from './board/Board';
import { getDataLocalStorage } from '../lib/localStorage';
import { newMovedTaskItems } from '../store/actions';

function App() {
  const notice = useAppSelector((state) => state.state.notice);
  const [popup, setPopup] = useState('');
  const [noticeActive, setNoticeActive] = useState(false);
  const tasks = useAppSelector((state) => state.state.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localTasks = getDataLocalStorage('tasks');

    localTasks && dispatch(newMovedTaskItems(getDataLocalStorage('tasks')));
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
          {/* <Table /> */}
          <KanbanBoard tasks={tasks} />
        </main>

        {popup === 'create' && <FormCreate />}
        {popup === 'change' && <ChangeTask />}
      </div>
    </Context.Provider>
  );
}

export default App;

// var tasks = [
//   {
//     Task_ID: 1,
//     Task_Assigned_Employee_ID: 1,
//     Task_Owner_ID: 1,
//     Task_Subject: 'Plans 2015',
//     Task_Start_Date: '2015-01-01T00:00:00',
//     Task_Due_Date: '2015-04-01T00:00:00',
//     Task_Status: 'Done',
//     Task_Priority: 4,
//     Task_Completion: 100,
//     Task_Parent_ID: 0,
//   },
//   {
//     Task_ID: 2,
//     Task_Assigned_Employee_ID: 2,
//     Task_Owner_ID: 1,
//     Task_Subject: 'Health Insurance',
//     Task_Start_Date: '2015-02-12T00:00:00',
//     Task_Due_Date: '2015-05-30T00:00:00',
//     Task_Status: 'Development',
//     Task_Priority: 4,
//     Task_Completion: 75,
//     Task_Parent_ID: 0,
//   },
//   {
//     Task_ID: 3,
//     Task_Assigned_Employee_ID: 4,
//     Task_Owner_ID: 4,
//     Task_Subject: 'New Brochures',
//     Task_Start_Date: '2015-02-17T00:00:00',
//     Task_Due_Date: '2015-03-01T00:00:00',
//     Task_Status: 'Development',
//     Task_Priority: 3,
//     Task_Completion: 100,
//     Task_Parent_ID: 0,
//   },
//   {
//     Task_ID: 4,
//     Task_Assigned_Employee_ID: 31,
//     Task_Owner_ID: 33,
//     Task_Subject: 'Training',
//     Task_Start_Date: '2015-03-02T00:00:00',
//     Task_Due_Date: '2015-06-29T00:00:00',
//     Task_Status: 'Development',
//     Task_Priority: 3,
//     Task_Completion: 100,
//     Task_Parent_ID: 0,
//   },
//   {
//     Task_ID: 5,
//     Task_Assigned_Employee_ID: 5,
//     Task_Owner_ID: 5,
//     Task_Subject: 'NDA',
//     Task_Start_Date: '2015-03-12T00:00:00',
//     Task_Due_Date: '2015-05-01T00:00:00',
//     Task_Status: 'Queue',
//     Task_Priority: 3,
//     Task_Completion: 90,
//     Task_Parent_ID: 0,
//   },
//   {
//     Task_ID: 6,
//     Task_Assigned_Employee_ID: 7,
//     Task_Owner_ID: 1,
//     Task_Subject: 'Revenue Projections',
//     Task_Start_Date: '2015-03-24T00:00:00',
//     Task_Due_Date: '2015-04-15T00:00:00',
//     Task_Status: 'Queue',
//     Task_Priority: 3,
//     Task_Completion: 100,
//     Task_Parent_ID: 0,
//   },
//   {
//     Task_ID: 7,
//     Task_Assigned_Employee_ID: 9,
//     Task_Owner_ID: 9,
//     Task_Subject: 'TV Recall',
//     Task_Start_Date: '2015-04-18T00:00:00',
//     Task_Due_Date: '2016-02-04T00:00:00',
//     Task_Status: 'Queue',
//     Task_Priority: 4,
//     Task_Completion: 90,
//     Task_Parent_ID: 0,
//   },
// ];
