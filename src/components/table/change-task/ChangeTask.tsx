import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { debounce } from 'lodash';

import style from './ChangeTask.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { CheckboxIcon } from '../../../components/svg/CheckboxIcon';
import { IFormTaskChange } from '@/types';
import { addSubtask, updateTaskChange } from '../../../store/actions';
import { DeleteIcon } from '../../../components/svg/DeleteIcon';
import { FileDownload } from './FileDownload';
import { setDataLocalStorage } from '../../../lib/localStorage';
import { downloadFile } from '../../../lib/helpers';
import { FileAddBtn } from '../../../components/file-add-btn/FileAddBtn';

export function ChangeTask() {
  const items = useAppSelector((state) => state.state.items);
  const item = useAppSelector((state) => state.state.taskItem);
  const [dropdownPriority, setDropdownPriority] = useState(false);
  const [form, setForm] = useState<IFormTaskChange>({
    id: 0,
    title: '',
    description: '',
    priority: '',
    files: [],
    subtasks: [],
    comments: '',
  });
  const [activeSubtask, setActiveSubtask] = useState('');
  const refWrapper = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  // закрыть сплывающий sidebar, и удалять если в подзадачи ничего не добавили
  useEffect(() => {
    document.body.addEventListener('click', (e: any) => {
      const target = e.target as HTMLElement;
      if (refWrapper.current && refWrapper.current.contains(target)) {
        setDropdownPriority(false);
      }

      setForm((data) => {
        return { ...data, subtasks: data.subtasks?.filter((subtask) => subtask.title) };
      });
    });
  }, []);

  // добавить в форму при первой инициализации данные с хранилище
  useEffect(() => {
    item &&
      setForm((state: any) => {
        return {
          ...state,
          id: item.id,
          title: item.title,
          description: item.description,
          priority: item.priority ? item.priority : '',
          subtasks: item.subtasks || [],
          files: item.files,
          comments: item.comments ?? '',
        };
      });
  }, [item]);

  // добавить подзадачи в хранилище
  useEffect(() => {
    dispatch(addSubtask({ idTask: form.id, subtasks: form.subtasks }));
  }, [form.subtasks]);

  // функция-обертка для dispatch
  const debouncedDispatch = debounce((idTask, task) => {
    dispatch(updateTaskChange({ idTask, task }));
    setDataLocalStorage(
      'tasks',
      items.map((item) => {
        if (idTask === item.id) {
          return { ...item, ...task };
        }
        return item;
      }),
    );
  }, 1000);

  // добавить данные формы в хранилище
  useEffect(() => {
    debouncedDispatch(form.id, form);
  }, [form.title, form.description, form.priority, form.comments, form.subtasks, form.files]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((data) => {
      return { ...data, [name]: value };
    });
  }

  function handleInputSubtaskChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, id } = e.target;
    const newSubtask = form.subtasks.map((el) => {
      if (el.id === id) {
        return { ...el, title: value };
      }
      return el;
    });
    setForm((data: any) => {
      return { ...data, subtasks: newSubtask };
    });
  }

  function handleFileChange(e: any) {
    downloadFile(e.target.files[0], setForm);
  }

  function selectPriorityListItem(value: string) {
    setForm((state) => {
      return {
        ...state,
        priority: value,
      };
    });

    setDropdownPriority(false);
  }

  function onActivatePriority(e: MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    setDropdownPriority((value) => !value);
  }

  function addNewSubtask(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setForm((data) => {
      data.subtasks.push({
        title: '',
        id: new Date().getTime() + '',
        completed: false,
      });
      return { ...data };
    });
  }

  function completedTask(id: string) {
    setForm((data) => {
      return {
        ...data,
        subtasks: data.subtasks.map((task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          }

          return task;
        }),
      };
    });
  }

  function deleteSubtaskItem(id: string) {
    setForm((data) => {
      return { ...data, subtasks: data.subtasks.filter((subtask) => subtask.id !== id) };
    });
  }

  return (
    <div ref={refWrapper} className={style.wrapper}>
      <form>
        <input
          className={style.title}
          name="title"
          type="text"
          value={form.title}
          onChange={handleInputChange}
        />
        <div className={style['wrapper-input']}>
          <label>
            Приоритет задачи:
            <span onClick={(e) => onActivatePriority(e)} className={style['priority-active']}>
              {form.priority ? form.priority : '-'}
            </span>
          </label>
          {dropdownPriority && (
            <div className={style['dropdown-priority']}>
              {['high', 'medium', 'low'].map((value, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => selectPriorityListItem(value)}
                    className={style['priority-list']}>
                    {value}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className={style['wrapper-input']}>
          <label htmlFor="description">Описание</label>
          <textarea
            className={style['description-text']}
            name="description"
            id="description"
            value={form.description}
            onChange={handleInputChange}
          />
        </div>

        <div className={style['wrapper-subtask']}>
          <p className={style.label}>Подзадачи</p>
          {form.subtasks &&
            form.subtasks.map((task) => {
              return (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSubtask(task.id);
                  }}
                  tabIndex={0}
                  key={task.id}
                  className={cn(style['subtask-item'], {
                    [style['subtask-item__active']]: activeSubtask === task.id,
                  })}>
                  <div
                    onClick={() => {
                      completedTask(task.id);
                    }}
                    className={cn(style['subtask-checkbox'], {
                      [style['subtask-checkbox__active']]: task.completed,
                    })}>
                    <CheckboxIcon />
                  </div>
                  <input
                    type="text"
                    name="title"
                    id={task.id}
                    value={task.title}
                    onChange={(e) => handleInputSubtaskChange(e)}
                  />
                  <div
                    onClick={() => deleteSubtaskItem(task.id)}
                    className={style['subtask-delete']}>
                    <DeleteIcon />
                  </div>
                </div>
              );
            })}
          <div onClick={addNewSubtask} className={style['subtask-add']}>
            +<p>Добавить подзадачу</p>
          </div>
        </div>

        <div className={style['wrapper-files']}>
          <div className={style.comment}>
            <textarea
              name="comments"
              id="comment"
              value={form.comments}
              onChange={handleInputChange}></textarea>
          </div>

          <div className={style['download-wrapper']}>
            <FileAddBtn handleFileChange={handleFileChange} type="change" />

            {!!form.files?.length && (
              <div className={style['download-wrapper__files']}>
                {form.files.map((file) => {
                  return <FileDownload file={file} />;
                })}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
