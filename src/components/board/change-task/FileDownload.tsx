import { useMemo } from 'react';
import { FileDocIcon } from '../../svg/FileDocIcon';
import { FilePdfIcon } from '../../svg/FilePdfIcon';
import style from './FileDownload.module.scss';
import { IFile } from '@/types';

interface IProps {
  file: IFile;
}

export function FileDownload({ file }: IProps) {
  let content;
  const typeFile = useMemo(() => {
    return (
      file.type === 'text/plain' ||
      file?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file?.type === 'application/vnd.oasis.opendocument.text'
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
