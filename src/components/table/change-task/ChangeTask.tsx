import { ChangeEvent, useEffect, useState } from 'react';
import style from './ChangeTask.module.scss';
import { useAppSelector } from '../../../hooks/redux';

interface IProps {}

export function ChangeTask() {
  const item = useAppSelector((state) => state.state.taskItem);

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: '',
    file: null,
  });

  useEffect(() => {
    item &&
      setForm((state) => {
        return { ...state, title: item.title, description: item.description };
      });
  }, [item]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((data) => {
      return { ...data, [name]: value };
    });
  }

  return (
    <div className={style.wrapper}>
      <input
        className={style.title}
        name="title"
        type="text"
        value={form.title}
        onChange={handleInputChange}
      />
    </div>
  );
}
