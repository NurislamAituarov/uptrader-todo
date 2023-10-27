import './SwitchTheme.scss';

interface IProps {
  toggleTheme: () => void;
  checked: boolean;
}

export function SwitchTheme({ toggleTheme, checked }: IProps) {
  return (
    <label id="switch" className="switch">
      <input type="checkbox" id="slider" checked={checked} onChange={toggleTheme} />
      <span className="slider round"></span>
    </label>
  );
}
