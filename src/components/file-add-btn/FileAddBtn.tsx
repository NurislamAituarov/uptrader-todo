import { ChangeEvent } from 'react';
import style from './FileAddBtn.module.scss';
import cn from 'classnames';

interface IProps {
  handleFileChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type: 'create' | 'change';
}

export function FileAddBtn({ handleFileChange, type }: IProps) {
  return (
    <div className={cn({ [style['download-add']]: type === 'change' })}>
      <label className={cn({ [style.file]: type === 'create' })} htmlFor="file">
        {type === 'change' && '+'} Добавить файл
      </label>
      <input name="file" id="file" type="file" onChange={handleFileChange} />
    </div>
  );
}
