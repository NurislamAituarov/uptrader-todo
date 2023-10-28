import { MouseEvent } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getNameGroup } from '../../../lib/helpers';
import { IColumn } from '@/types';
import { Item } from '../item/Item';

interface IProps {
  column: IColumn;
  deleteItem: (value: number) => void;
}

export function Column({ column, deleteItem }: IProps) {
  return (
    <div className="kanban__column">
      <h2>{getNameGroup(column.title)}</h2>
      <Droppable droppableId={column.title}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {!!column.tasks.length &&
              column.tasks.map((task, taskIndex) => {
                return (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={taskIndex}>
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="kanban__task">
                          <Item item={task} deleteItem={deleteItem} />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
