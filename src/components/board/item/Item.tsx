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
  const refTimeWorkItem = useRef(item.timeWork);
  const dispatch = useAppDispatch();
  const context = useContext(Context);
  const idInterval = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (item.group === 'Development') {
      idInterval.current = setInterval(() => {
        setTimeWork((sec) => (sec += 1));
      }, 1000);
    }

    return () => {
      if (idInterval.current !== null) {
        clearInterval(idInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (item.group === 'Development') {
      dispatch(
        changeTaskTimeWork({
          taskId: item.id,
          timeWork: timeWork + (refTimeWorkItem.current ? refTimeWorkItem.current : 0),
        }),
      );
    }
  }, [timeWork]);

  const classNames = ['task__item-priority', `task__item-${item.priority}`].join(' ');
  const classNamesTimeWork = [
    'time-work',
    item.group === 'Development' ? 'time-work__active' : 'time-work__disabled',
  ].join(' ');

  const timeWorkDate = useMemo(() => {
    const timeWorkItem = refTimeWorkItem.current ?? 0;

    const hours = new String(Math.floor((timeWork + timeWorkItem) / 60 / 60));
    const minutes = new String(Math.floor((timeWork + timeWorkItem) / 60) - +hours * 60);
    const seconds = new String((timeWork + timeWorkItem) % 60);

    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }, [timeWork]);
  const subtaskNotCompleted = useMemo(() => {
    return item.subtasks ? item.subtasks.filter((subtask) => !subtask.completed) : [];
  }, [item.subtasks]);

  function openTask(e: MouseEvent) {
    e.stopPropagation();
    setTimeout(() => {
      dispatch(addTaskChange(item.id));
      context?.openPopupChange();
    }, 0);
  }

  return (
    <div
      id={item.id + ''}
      draggable={true}
      onClick={openTask}
      className={'task__item card dx-card'}>
      <div className="task__date">
        <p className="date-create">
          Дата создания: <span>{item.dateCreate}</span>
        </p>
        <p className={classNamesTimeWork}>
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
    </div>
  );
});
