import { Column } from './column/Column';
import './Table.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addNotice, newMovedTaskItems, removeTask } from '../../store/actions';
import { useContext, useEffect } from 'react';
import { Context } from '../../lib/context';

export function Table() {
  const items = useAppSelector((state) => state.state.items);
  const dispatch = useAppDispatch();
  const context = useContext(Context);
  const groups = ['Queue', 'Development', 'Done'];

  useEffect(() => {}, [items]);

  const moveGroup = (itemId: number, groupToMove: string) => {
    const index = items.findIndex((item) => item.id === itemId);
    const itemToMove = items[index];
    if (itemToMove) {
      itemToMove.group = groupToMove;
      const newItemsMoved = [...items.slice(0, index), itemToMove, ...items.slice(index + 1)];
      dispatch(newMovedTaskItems(newItemsMoved));
      dispatch(addNotice(`${itemToMove.title} is moved to ${itemToMove.group}!`));
    }
  };

  const deleteItem = (itemId: number) => {
    const index = items.findIndex((item) => item.id === itemId);
    const name = items[index].title;
    name && dispatch(addNotice(`${name} is deleted!`));
    dispatch(removeTask(itemId));
    context?.closePopup();
  };

  const mainList = groups.map((group) => {
    const groupItems = items.filter((item) => item.group === group);
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
