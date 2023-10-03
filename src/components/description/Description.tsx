import { IItemTask } from '@/types';
import style from './Description.module.scss';
import { MouseEvent, useState } from 'react';

interface IProps {
  item: IItemTask;
}

export function DescriptionTruncate({ item }: IProps) {
  const [show, setShow] = useState(false);

  function handleMouseEnter(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    const el = e.target as HTMLParagraphElement;
    const length = el.textContent?.length;
    if (length && length > 60) setShow(true);
  }

  function handleMouseLeave(e: MouseEvent<HTMLDivElement>) {
    setShow(false);
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={style['description__wrapper']}>
      <p className={style.description}>{item.description}</p>
      {show && <p className={style['description-tooltip']}>{item.description}</p>}
    </div>
  );
}
