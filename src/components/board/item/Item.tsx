import { MouseEvent, memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';

import { DescriptionTruncate } from '../../description/Description';
import { SubtaskIcon } from '../../svg/SubtaskIcon';
import { changeTaskTimeWork, addTaskChange } from '../../../store/actions';
import { useAppDispatch } from '../../../hooks/redux';
import { Context } from '../../../lib/context';
import { getTimeWorkDate } from '../../../lib/helpers';
import { IItemTask } from '@/types';
import './Item.scss';

interface IProps {
  item: IItemTask;
  deleteItem: (itemId: number) => void;
}

export const Item = memo(({ item, deleteItem }: IProps) => {
  const [seconds, setSeconds] = useState(0);
  const timeWorkItem = useRef(item.timeWork);
  const dispatch = useAppDispatch();
  const context = useContext(Context);
  const idInterval = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (item.group === 'Development') {
      idInterval.current = setInterval(() => {
        setSeconds((sec) => (sec += 1));
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
          timeWork: seconds + (timeWorkItem.current ? timeWorkItem.current : 0),
        }),
      );
    }
  }, [seconds]);

  // Динамические классы
  const classNamesTimeWork = [
    'time-work',
    item.group === 'Development' ? 'time-work__active' : 'time-work__disabled',
  ].join(' ');

  // Кэширование данных
  const timeWorkDate = useMemo(() => {
    return getTimeWorkDate(timeWorkItem.current ?? 0, seconds);
  }, [seconds]);

  const subtaskNotCompleted = useMemo(() => {
    return item.subtasks ? item.subtasks.filter((subtask) => !subtask.completed) : [];
  }, [item.subtasks]);

  // Открыть задачу для изменение
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
      tabIndex={1}
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
