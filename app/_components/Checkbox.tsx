import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = ({ ...rest }: CheckboxProps) => {
  return (
    <label>
      <input className="peer hidden" type="checkbox" {...rest} />
      <div className="bg-white relative rounded-full size-[20px] after:hidden peer-checked:after:block after:content-[''] after:absolute after:size-[11px] after:bg-black after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:rounded-full" />
    </label>
  );
};

export default Checkbox;
