import {
  DragEvent,
  MouseEvent,
  TouchEventHandler,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import cn from 'classnames';

import { IItemTask } from '@/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { changeTaskTimeWork, addTaskChange, setDraggedItemId } from '../../../store/actions';
import { Context } from '../../../lib/context';
import { SubtaskIcon } from '../../../components/svg/SubtaskIcon';
import { DescriptionTruncate } from '../../../components/description/Description';
import './Item.scss';
import { setDataLocalStorage } from '../../../lib/localStorage';

interface IProps {
  item: IItemTask;
  deleteItem: (itemId: number) => void;
}

export default memo(({ item, deleteItem }: IProps) => {
  const items = useAppSelector((state) => state.state.items);
  const [timeWork, setTimeWork] = useState(0);
  const refTimeWorkItem = useRef(item.timeWork);
  const dispatch = useAppDispatch();
  const context = useContext(Context);
  const idInterval = useRef<NodeJS.Timer | null>(null);
  const refColumn = useRef<HTMLElement | null>(null);
  const refItem = useRef<HTMLElement | null>(null);
  const refMain = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (item.group === 'Development') {
      idInterval.current = setInterval(() => {
        setTimeWork((sec) => (sec += 1));
      }, 1000);
    }

    setDataLocalStorage('tasks', items);
    refItem.current = document.getElementById(`${item.id}`);
    refColumn.current = document.querySelector(`#${item.group}`);
    refMain.current = document.querySelector('.main');

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

  const handleDragStart = (e: any) => {
    const targetElement = e.target as HTMLElement;
    if (targetElement) {
      const id = targetElement.id;
      dispatch(setDraggedItemId(id));
    }
  };

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

  // touch
  const [isDragging, setIsDragging] = useState(false);
  const [stateStart, setStateStart] = useState({
    startX: 0,
    startY: 0,
  });
  const handleTouchStart: TouchEventHandler<HTMLLIElement> = (e) => {
    const targetElement = e.currentTarget;

    if (targetElement) {
      const id = targetElement.id;
      dispatch(setDraggedItemId(id));
      setIsDragging(true);
    }

    const touch = e.touches[0];
    setStateStart({
      startX: touch.clientX,
      startY: touch.clientY,
    });
  };

  const handleTouchMove: TouchEventHandler<HTMLLIElement> = (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      const element = refItem.current;
      const deltaX = touch.clientX - stateStart.startX;
      const deltaY = touch.clientY - stateStart.startY;

      if (element && refColumn.current && refMain.current) {
        element.style.position = 'absolute';
        element.style.zIndex = '10';

        const topDistance = `${
          touch.pageY - refColumn.current.offsetTop - element.offsetHeight / 2
        }px`;
        const leftDistance = `${
          touch.pageX +
          refMain.current.scrollLeft -
          refColumn.current.offsetLeft -
          element.offsetWidth / 2
        }px`;
        if (deltaX < 160) {
          refMain.current.scrollBy({ left: deltaX, top: deltaY, behavior: 'smooth' });
        }
        element.style.top = topDistance;
        element.style.left = leftDistance;
      }
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLLIElement> = (e) => {
    dispatch(setDraggedItemId(''));
    setIsDragging(false);

    if (refItem.current) {
      refItem.current.style.cssText = 'position: relative; top: 0px; left: 0px; z-index: 0;';
    }

    setStateStart({
      startX: 0,
      startY: 0,
    });
  };

  return (
    <li
      key={item.id}
      id={item.id + ''}
      draggable={true}
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={openTask}
      className={'task__item'}>
      <div className="task__date">
        <p className="date-create">
          Дата создания: <span>{item.dateCreate}</span>
        </p>
        <p
          className={[
            'time-work',
            item.group === 'Development' ? 'time-work__active' : 'time-work__disabled',
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
    </li>
  );
});
