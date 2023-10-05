import { IFormTaskChange } from '@/types';
import style from './FileDownload.module.scss';
import { FileDocIcon } from '../../../components/svg/FileDocIcon';
import { FilePdfIcon } from '../../../components/svg/FilePdfIcon';
import { useMemo } from 'react';

interface IProps {
  form: IFormTaskChange;
}

export function FileDownload({ form }: IProps) {
  let content;
  const typeFile = useMemo(() => {
    return (
      form.file?.type === 'text/plain' ||
      form.file?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
  }, [form]);
  const typeImg = form.file?.type.match(/\bimage\b/g);

  if (typeImg) {
    content = (
      <a href={form.base64Data} download={form.file?.name} className={style['wrapper-img']}>
        <img src={form.base64Data} alt="img" />
      </a>
    );
  } else if (form.file?.type === 'application/pdf' || typeFile) {
    const fileTypeIcon = typeFile ? <FileDocIcon /> : <FilePdfIcon />;

    content = (
      <a href={form.base64Data} download={form.file?.name} className={style.document}>
        {fileTypeIcon}
        <div>
          <p className={style['name-file']}>{form.file?.name}</p>
          <span>{typeFile ? 'Текстовый файл' : 'PDF файл'}</span>
        </div>
      </a>
    );
  }

  return <div className={style['downloaded-wrapper']}>{content}</div>;
}
