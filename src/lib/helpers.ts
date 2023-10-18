import { IItemTask } from '@/types';

export function getNameGroup(group: string) {
  switch (group) {
    case 'Development':
      return 'Разработка';
    case 'Done':
      return 'Выполнен';
    default:
      return 'Очередь';
  }
}

export function downloadFile(files: any, setForm: any) {
  const reader = new FileReader();

  reader.onload = (event: any) => {
    const file = {
      base64Data: event.target.result,
      name: files?.name || '',
      type: files?.type || '',
      size: files?.size || 0,
      id: new Date().getTime(),
    };
    setForm((data: any) => {
      return { ...data, files: [...data.files, file] };
    });
  };
  reader.readAsDataURL(files);
}

export function moveElementWithCondition(
  target: any,
  item: IItemTask,
  moveGroup: (id: number, groupId: string) => void,
  items: IItemTask[],
): void {
  if (target.tagName === 'UL' && target.id !== item.group) {
    moveGroup(item.id, target.id);
  } else if (target.tagName === 'LI' && target.id !== item.id) {
    let group = items.find((item: any) => item.id === +target.id)?.group;
    group && moveGroup(item.id, group);
  }
}

export function touchMoveElement(
  element: HTMLElement | null,
  refColumn: any,
  refMain: any,
  touch: any,
  deltaX: number,
  deltaY: number,
) {
  if (element && refColumn.current && refMain.current) {
    element.style.position = 'absolute';
    element.style.zIndex = '10';

    const topDistance = `${touch.pageY - refColumn.current.offsetTop - element.offsetHeight / 2}px`;
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
