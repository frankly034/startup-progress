import { FunctionComponent } from "react";

export type CheckBoxProps = {
  checked: boolean;
  id: number;
  label: string;
  onChange: (id: number) => void;
};

const CheckBox: FunctionComponent<CheckBoxProps> = ({
  checked,
  id,
  label,
  onChange,
}) => {
  const handleOnChange = () => {
    onChange(id);
  };

  const idString = `${id}`;

  return (
    <div className="check-box">
      <input
        id={idString}
        onChange={handleOnChange}
        type="checkbox"
        checked={checked}
      />
      <label htmlFor={idString}>{label}</label>
    </div>
  );
};

export default CheckBox;
