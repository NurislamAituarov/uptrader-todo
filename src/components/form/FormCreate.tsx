import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addNotice, addTask } from '../../store/actions';
import { Context } from '../../lib/context';

import './Form.scss';
import { CloseBtn } from '../close-btn/CloseBtn';

export function FormCreate() {
  const tasks = useAppSelector((state) => state.state.items);
  const [priority, setPriority] = useState('');
  const popup = useContext(Context);

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: '',
    file: null,
  });
  const dispatch = useAppDispatch();

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((data) => {
      return { ...data, [name]: value };
    });
  }

  function handleFileChange(e: any) {
    setForm((data) => {
      return { ...data, file: e.target.files[0] };
    });
  }

  function onCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (form.title) {
      const now = new Date();
      const UKDate = new Intl.DateTimeFormat('en-UK');
      const formattedTime = now.toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' });

      const formData = {
        number: tasks.length + 1,
        id: new Date().getTime(),
        dateCreate: `${UKDate.format(now)} ${formattedTime}`,
        timeWork: 0,
        title: form.title,
        description: form.description,
        priority,
        file: form.file,
        group: 'Queue',
      };

      dispatch(addTask(formData));
      dispatch(addNotice(`${form.title} is added!`));
      closeForm();
    }
  }

  function onChoosePriority(value: string) {
    setPriority(value);
  }

  function closeForm() {
    popup?.setPopup('');
  }

  return (
    <>
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
            <div className="form__item-priority">
              {['high', 'medium', 'low'].map((value, i) => {
                return (
                  <span
                    onClick={() => onChoosePriority(value)}
                    key={i}
                    className={[
                      'priority__item',
                      priority === value ? `priority__item-${priority}` : '',
                    ].join(' ')}>
                    {value}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="form__item">
            <label className="file" htmlFor="file">
              Добавить файл
            </label>
            <input name="file" id="file" type="file" onChange={handleFileChange} />
          </div>

          <button disabled={!form.title} className="btn btn__create" type="submit">
            create
          </button>

          <CloseBtn type="type-1" handelMore={closeForm} />
        </form>
      </div>

      <div onClick={closeForm} className="overlay"></div>
    </>
  );
}
