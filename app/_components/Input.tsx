import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  errors?: string[];
}

const Input = ({ name, label, errors, ...rest }: InputProps) => {
  return (
    <div>
      <label className="flex items-center">
        <span className="w-[120px]">{label}</span>

        <div className="border grow px-2 py-1 rounded-md has-[:focus]:border-orange-500">
          <input
            name={name}
            className="w-full bg-transparent outline-none border border-none"
            {...rest}
          />
        </div>
      </label>
      {errors && (
        <div className="text-red-500 text-[12px] pl-[120px] pt-1">
          {errors[0]}
        </div>
      )}
    </div>
  );
};

export default Input;
