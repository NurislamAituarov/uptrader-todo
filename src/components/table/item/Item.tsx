import { useMemo, useState } from 'react';
import './Item.scss';

export const Item = ({ item }: any) => {
  const [expand, setExpand] = useState(false);

  const handleDragStart = (e: any) => {
    e.dataTransfer.setData('id', e.target.id);
  };

  const classNames = ['task__item-priority', `task__item-${item.priority}`].join(' ');

  function expandText() {
    setExpand((value) => !value);
  }

  return (
    <li
      key={item.id}
      id={item.id}
      draggable
      onDragStart={handleDragStart}
      className={['task__item', expand ? 'expand' : ''].join(' ')}>
      <div className="task__date">
        <p className="date-create">Дата создания: {item.dateCreate}</p>
        <p className="date-end">Дата окончания: {item.dateEnd}</p>
        <p className="time-work">Время в работе: {item.timeWork}</p>
      </div>
      <div className="title__wrapper">
        <p className="title"> {item.name}</p>
        <p className="description" onClick={expandText}>
          {item.description}
        </p>
      </div>

      <p className={classNames}> {item.priority}</p>
    </li>
  );
};
