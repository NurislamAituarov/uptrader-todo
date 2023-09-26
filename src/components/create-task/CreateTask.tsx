import { useState } from 'react';
import './CreateTask.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addTask } from '../../store/actions';

export function CreateTask() {
  const tasks = useAppSelector((state) => state.state.items);

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: '',
    // file: null,
    status: '',
  });
  const dispatch = useAppDispatch();

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setForm((data) => {
      return { ...data, [name]: value };
    });
  }

  function handleFileChange(e: any) {
    // setForm({ file: e.target.files[0] });
  }

  function onCreateTask(e: any) {
    e.preventDefault();
    const now = new Date();
    const UKDate = new Intl.DateTimeFormat('en-UK');

    const formData = {
      number: tasks.length + 1,
      id: tasks.length + 1,
      dateCreate: UKDate.format(now),
      title: form.title,
      description: form.description,
      priority: form.priority,
      // file: form.file,
      group: form.status,
    };

    dispatch(addTask(formData));
  }

  return (
    <div className="popup__create">
      <form onSubmit={onCreateTask}>
        <div className="form__item">
          <label htmlFor="">Заголовок</label>
          <input name="title" type="text" value={form.title} onChange={handleInputChange} />
        </div>
        <div className="form__item">
          <label htmlFor="description">Описание</label>
          <textarea
            name="description"
            id="description"
            value={form.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form__item">
          <label htmlFor="priority">Приоритет</label>
          <input
            name="priority"
            id="priority"
            type="text"
            value={form.priority}
            onChange={handleInputChange}
          />
        </div>

        <div className="form__item">
          <label className="file" htmlFor="file">
            Добавить файл
          </label>
          <input name="file" id="file" type="file" onChange={handleFileChange} />
        </div>

        <div className="form__item">
          <label htmlFor="status">Текущий статус</label>
          <input
            name="status"
            id="status"
            type="text"
            value={form.status}
            onChange={handleInputChange}
          />
        </div>

        <button className="btn btn__create" type="submit">
          create
        </button>
      </form>
    </div>
  );
}
