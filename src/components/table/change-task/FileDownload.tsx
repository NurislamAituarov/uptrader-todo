import { IFormTaskChange } from '@/types';
import style from './FileDownload.module.scss';
import { FileDocIcon } from '../../../components/svg/FileDocIcon';
import { FilePdfIcon } from '../../../components/svg/FilePdfIcon';
import { useMemo } from 'react';

interface IProps {
  file: any;
}

export function FileDownload({ file }: IProps) {
  let content;
  const typeFile = useMemo(() => {
    return (
      file.type === 'text/plain' ||
      file?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
  }, [file]);
  const typeImg = file?.type.match(/\bimage\b/g);

  if (typeImg) {
    content = (
      <a href={file?.base64Data} download={file?.name} className={style['wrapper-img']}>
        <img src={file?.base64Data} alt="img" />
      </a>
    );
  } else if (file?.type === 'application/pdf' || typeFile) {
    const fileTypeIcon = typeFile ? <FileDocIcon /> : <FilePdfIcon />;

    content = (
      <a href={file?.base64Data} download={file?.name} className={style.document}>
        {fileTypeIcon}
        <div>
          <p className={style['name-file']}>{file?.name}</p>
          <span>{typeFile ? 'Текстовый файл' : 'PDF файл'}</span>
        </div>
      </a>
    );
  }

  return <div className={style['downloaded-file']}>{content}</div>;
}
