import { Column } from './column/Column';
import './Table.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addNotice, changeTaskDateEnd, newMovedTaskItems, removeTask } from '../../store/actions';
import { useContext, useEffect } from 'react';
import { Context } from '../../lib/context';
import { getDataLocalStorage, setDataLocalStorage } from '../../lib/localStorage';
import { getNameGroup } from '../../lib/helpers';

export function Table() {
  const items = useAppSelector((state) => state.state.items);
  const dispatch = useAppDispatch();
  const context = useContext(Context);
  const groups = ['Queue', 'Development', 'Done'];

  useEffect(() => {
    const localTasks = getDataLocalStorage('tasks');

    localTasks && dispatch(newMovedTaskItems(getDataLocalStorage('tasks')));
  }, []);

  const moveGroup = (itemId: number, groupToMove: string) => {
    const index = items.findIndex((item) => item.id === itemId);
    const itemToMove = items[index];
    if (itemToMove) {
      itemToMove.group = groupToMove;
      const newItemsMoved = [...items.slice(0, index), itemToMove, ...items.slice(index + 1)];
      dispatch(newMovedTaskItems(newItemsMoved));
      setDataLocalStorage('tasks', newItemsMoved);
      dispatch(
        addNotice(`${itemToMove.title} перенесен в столбец ${getNameGroup(itemToMove.group)}!`),
      );

      if (itemToMove.group === 'Done') {
        dispatch(changeTaskDateEnd({ taskId: itemToMove.id, status: 'Done' }));
      } else {
        dispatch(changeTaskDateEnd({ taskId: itemToMove.id }));
      }
    }
  };

  const deleteItem = (itemId: number) => {
    const index = items.findIndex((item) => item.id === itemId);
    const name = items[index].title;
    name && dispatch(addNotice(`${name} удален!`));
    dispatch(removeTask(itemId));
    context?.closePopup();
  };

  const mainList = groups.map((group) => {
    const groupItems = items ? items.filter((item) => item.group === group) : [];
    return (
      <Column
        group={group}
        groupItems={groupItems}
        moveGroup={moveGroup}
        deleteItem={deleteItem}
        items={items}
        key={group}
      />
    );
  });

  return <div className="table__content">{mainList}</div>;
}
