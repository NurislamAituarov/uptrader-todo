import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addNotice, addTask } from '../../store/actions';
import { Context } from '../../lib/context';
import { CloseBtn } from '../close-btn/CloseBtn';

import './Form.scss';
import { IFile } from '@/types';
import { setDataLocalStorage } from '../../lib/localStorage';
import { CloseIcon } from '../svg/CloseIcon';

interface IForm {
  title: string;
  description: string;
  priority: string;
  files: IFile[];
}

export function FormCreate() {
  const tasks = useAppSelector((state) => state.state.items);
  const [priority, setPriority] = useState('');
  const popup = useContext(Context);

  const [form, setForm] = useState<IForm>({
    title: '',
    description: '',
    priority: '',
    files: [],
  });
  const dispatch = useAppDispatch();

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((data) => {
      return { ...data, [name]: value };
    });
  }

  function handleFileChange(e: any) {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const file = {
        base64Data: event.target.result,
        name: e.target.files[0]?.name || '',
        type: e.target.files[0]?.type || '',
        size: e.target.files[0]?.size || 0,
        id: new Date().getTime(),
      };
      setForm((data) => {
        return { ...data, files: [...data.files, file] };
      });
    };
    reader.readAsDataURL(e.target.files[0]);
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
        files: form.files,
        description: form.description,
        priority,
        group: 'Queue',
      };

      dispatch(addTask(formData));
      setDataLocalStorage('tasks', [...tasks, formData]);
      dispatch(addNotice(`${form.title} добавлен!`));
      closeForm();
    }
  }

  function onChoosePriority(value: string) {
    setPriority(value);
  }

  function closeForm() {
    popup?.closePopup();
  }

  function onRemoveFile(id: number | undefined) {
    setForm((data) => {
      return { ...data, files: data.files.filter((file) => file.id !== id) };
    });
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
            {form.files &&
              form.files.map((file) => {
                return (
                  <div className="download-files" key={file.id}>
                    <div className="download-file">
                      {file.name}
                      <CloseIcon onClick={() => onRemoveFile(file.id)} />
                    </div>
                  </div>
                );
              })}
          </div>

          <button disabled={!form.title} className="btn btn__create" type="submit">
            создать
          </button>

          <CloseBtn type="type-1" handelMore={closeForm} />
        </form>
      </div>

      <div onClick={closeForm} className="overlay"></div>
    </>
  );
}
