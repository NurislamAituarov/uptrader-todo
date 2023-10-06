import { memo } from 'react';
import Item from '../item/Item';
import { IItemTask } from '@/types';

interface IProps {
  group: string;
  groupItems: IItemTask[];
  moveGroup: (itemId: number, groupToMove: any) => void;
  deleteItem: (itemId: number) => void;
  items: IItemTask[];
}

export const Column = memo(({ group, groupItems, moveGroup, deleteItem, items }: any) => {
  const handleDrop = (e: any) => {
    let id = e.dataTransfer.getData('id');
    let item = items.find((item: any) => item.id === +id);
    if (e.target.tagName === 'UL' && e.target.id !== item.group) {
      moveGroup(item.id, e.target.id);
    } else if (e.target.tagName === 'LI' && e.target.id !== item.id) {
      let group = items.find((item: any) => item.id === +e.target.id).group;
      moveGroup(item.id, group);
    }
  };
  const itemList = groupItems.map((item: any) => {
    return <Item item={item} key={item.id} deleteItem={deleteItem} />;
  });

  return (
    <div className="container">
      <h3>{group}</h3>
      <ul
        className="col"
        id={group}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={handleDrop}>
        {itemList}
      </ul>
    </div>
  );
});
