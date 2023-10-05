import { IFormTaskChange } from '@/types';
import style from './FileDownload.module.scss';
import { FileDocIcon } from '../../../components/svg/FileDocIcon';
import { FilePdfIcon } from '../../../components/svg/FilePdfIcon';

interface IProps {
  form: IFormTaskChange;
}

export function FileDownload({ form }: IProps) {
  let content;

  if (form.file?.type === 'image/jpeg') {
    content = <img src={form.srcDownload} alt="img" />;
  } else if (form.file?.type === 'text/plain' || form.file?.type === 'application/pdf') {
    const isPlainText = form.file?.type === 'text/plain';
    const fileTypeIcon = isPlainText ? <FileDocIcon /> : <FilePdfIcon />;

    content = (
      <div className={style.document}>
        {fileTypeIcon}
        <div>
          <p className={style['name-file']}>{form.file?.name}</p>
          <span>{isPlainText ? 'Текстовый файл' : 'PDF файл'}</span>
        </div>
      </div>
    );
  }
  return <div className={style['downloaded-wrapper']}>{content}</div>;
}
