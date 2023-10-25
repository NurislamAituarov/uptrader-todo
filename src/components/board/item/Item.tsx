import { MouseEvent, memo, useContext, useEffect, useMemo, useRef, useState } from 'react';

import cn from 'classnames';

import { IItemTask } from '@/types';
import { useAppDispatch } from '../../../hooks/redux';
import { changeTaskTimeWork, addTaskChange } from '../../../store/actions';
import { Context } from '../../../lib/context';
import { SubtaskIcon } from '../../svg/SubtaskIcon';
import { DescriptionTruncate } from '../../description/Description';
import './Item.scss';

interface IProps {
  item: IItemTask;
  deleteItem: (itemId: number) => void;
}

export const Item = memo(({ item, deleteItem }: IProps) => {
  const [timeWork, setTimeWork] = useState(0);
  const [statusGroup, setStatusGroup] = useState('');
  const refTimeWorkItem = useRef(item.timeWork);
  const dispatch = useAppDispatch();
  const context = useContext(Context);
  const idInterval = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    const lists = document.querySelectorAll('.list');
    const task = document.getElementById(`${item.id}`);
    lists.forEach((item) => {
      if (item.contains(task) && item.id === 'Development') {
        setStatusGroup('Development');
        idInterval.current = setInterval(() => {
          setTimeWork((sec) => (sec += 1));
        }, 1000);
      }
    });

    return () => {
      if (idInterval.current !== null) {
        clearInterval(idInterval.current);
        setStatusGroup('');
      }
    };
  }, [item]);

  useEffect(() => {
    const lists = document.querySelectorAll('.list');
    const task = document.getElementById(`${item.id}`);
    lists.forEach((list) => {
      if (list.contains(task) && list.id === 'Development') {
        setStatusGroup('Development');
        dispatch(
          changeTaskTimeWork({
            taskId: item.id,
            timeWork: timeWork + (refTimeWorkItem.current ? refTimeWorkItem.current : 0),
          }),
        );
      }
    });
  }, [timeWork]);

  const classNames = ['task__item-priority', `task__item-${item.priority}`].join(' ');

  const timeWorkDate = useMemo(() => {
    const timeWorkItem = refTimeWorkItem.current ?? 0;

    const hours = new String(Math.floor((timeWork + timeWorkItem) / 60 / 60));
    const minutes = new String(Math.floor((timeWork + timeWorkItem) / 60) - +hours * 60);
    const seconds = new String((timeWork + timeWorkItem) % 60);

    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }, [timeWork]);

  function openTask(e: MouseEvent) {
    e.stopPropagation();
    setTimeout(() => {
      dispatch(addTaskChange(item.id));
      context?.openPopupChange();
    }, 0);
  }

  const subtaskNotCompleted = useMemo(() => {
    return item.subtasks ? item.subtasks.filter((subtask) => !subtask.completed) : [];
  }, [item.subtasks]);

  return (
    <li id={item.id + ''} draggable={true} onClick={openTask} className={'task__item card dx-card'}>
      <div className="task__date">
        <p className="date-create">
          Дата создания: <span>{item.dateCreate}</span>
        </p>
        <p
          className={[
            'time-work',
            statusGroup === 'Development' ? 'time-work__active' : 'time-work__disabled',
          ].join(' ')}>
          Время в работе: <span>{timeWorkDate}</span>
        </p>
        <p className="date-end">
          Дата окончания: <span>{item.dateEnd}</span>
        </p>
      </div>
      {!!subtaskNotCompleted?.length && (
        <div className={cn('task__subtasks', {})}>
          <span>{subtaskNotCompleted?.length}</span>
          <SubtaskIcon />
        </div>
      )}

      <div className="title__wrapper">
        <p className="title"> {item.title}</p>
        {item.description && <DescriptionTruncate item={item} />}
      </div>

      <p className="task__number">№: {item.number}</p>
      <p className={classNames}> {item.priority}</p>

      <button
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
          deleteItem(item.id);
        }}
        className="btn">
        удалить
      </button>

      <div className={`card-priority priority-${item.priority}`}></div>
    </li>
  );
});
