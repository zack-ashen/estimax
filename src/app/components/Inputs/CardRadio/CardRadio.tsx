import React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  icon?: JSX.Element; // React component for icons (e.g., from FontAwesome)
}

interface RadioButtonGroupProps {
  options: RadioOption[];
  name: string;
  onChange: (...event: any[]) => void;
  value: string;
}

const CardRadioGroup = React.forwardRef<
  HTMLInputElement,
  RadioButtonGroupProps
>(({ options, name, onChange, value }, ref) => (
  <div className="flex flex-col">
    {options.map((option) => (
      <div
        key={option.value}
        className={`border-gray-200 flex flex-col rounded-lg border bg-white p-6 ${
          value === option.value ? 'border-blue-200 bg-blue-50' : ''
        } hover:cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100`}
      >
        <input
          ref={ref}
          type="radio"
          id={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          className="hidden" // Hide the default radio input
        />
        <label htmlFor={option.value} className="flex items-center">
          {option.icon && <span className="mr-2">{option.icon}</span>}
          {option.label}
        </label>
      </div>
    ))}
  </div>
));

CardRadioGroup.displayName = 'CardRadioGroup';

export default CardRadioGroup;
