import { DragEvent, TouchEvent, memo } from 'react';
import Item from '../item/Item';
import { IItemTask } from '@/types';
import { getNameGroup, moveElementWithCondition } from '../../../lib/helpers';
import { useAppSelector } from '../../../hooks/redux';

interface IProps {
  group: string;
  groupItems: IItemTask[];
  moveGroup: (itemId: number, groupToMove: any) => void;
  deleteItem: (itemId: number) => void;
  items: IItemTask[];
}

export const Column = memo(({ group, groupItems, moveGroup, deleteItem, items }: IProps) => {
  const dragItemId = useAppSelector((state) => state.state.draggedItemId);
  const handleDrop = (e: DragEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
    const id = dragItemId;
    if (id) {
      let item = items.find((item) => item.id === +id);
      const target = e.currentTarget;

      item && moveElementWithCondition(target, item, moveGroup, items);

      if (e.type === 'touchend') {
        // Обработка события onTouchEnd
        const event = e as React.TouchEvent<HTMLElement>;
        const touches = event.changedTouches;
        if (touches.length > 0) {
          let touchEndElement = document.elementFromPoint(touches[0].clientX, touches[0].clientY);
          const li = document.querySelectorAll('.task__item');
          li.forEach((el) => {
            if (el.contains(touchEndElement)) {
              touchEndElement = el;
            }
          });
          console.log(touchEndElement);
          touchEndElement &&
            item &&
            moveElementWithCondition(touchEndElement, item, moveGroup, items);
        }
      }
    }
  };

  const itemList = groupItems.map((item: any) => {
    return <Item item={item} key={item.id} deleteItem={deleteItem} />;
  });

  return (
    <div className="container">
      <h3>{getNameGroup(group)}</h3>
      <ul
        className="col"
        id={group}
        draggable={true}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={handleDrop}
        onTouchEnd={handleDrop}>
        {itemList}
      </ul>
    </div>
  );
});
