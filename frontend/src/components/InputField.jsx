import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({
  label,
  icon: Icon,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  showToggle,
  onToggle,
  showPassword,
  error = false,
  errorMessage = '',
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-2.5 text-gray-500">
          <Icon size={16} />
        </span>
        <input
          type={showToggle ? (showPassword ? 'text' : 'password') : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-2 border rounded-md outline-none placeholder-gray-500 focus:ring-2 ${
            error
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-emerald-500'
          }`}
          required
        />
        {showToggle && (
          <span
            onClick={onToggle}
            className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </span>
        )}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
