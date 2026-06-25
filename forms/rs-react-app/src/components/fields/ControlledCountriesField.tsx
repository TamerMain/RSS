import { useState } from 'react';
import { type UseFormRegister, type FieldErrors, type UseFormSetValue } from 'react-hook-form';
import { type EntryFormData, type EntryFormKeys } from '@/schemas/formSchema';

type ControlledCountriesFieldProps = {
  id: EntryFormKeys;
  label: string;
  options: string[];
  register: UseFormRegister<EntryFormData>;
  setInputValue: UseFormSetValue<EntryFormData>;
  error: FieldErrors<EntryFormData> | null;
};

function ControlledCountriesField({
  id,
  label,
  options,
  register,
  setInputValue,
  error,
}: ControlledCountriesFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [_, setSelected] = useState('');

  const errorMessage = error?.[id]?.message;
  const filtered = options.filter((country) =>
    country.toLowerCase().includes(input.toLowerCase())
  );

  const handleSelectCountry = (country: string) => {
    setInput(country);
    setSelected(country);
    setIsOpen(false);
    setInputValue(id, country, {
      shouldValidate: true,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-1 h-15 auto-rows-fr items-center">
      <label className="block min-w-45 text-right pr-2" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          {...register(id, {
            onChange: (e) => {
              setInput(e.target.value);
            },
            onBlur: () => {
              setTimeout(() => setIsOpen(false), 100);
            },
          })}
          onFocus={() => setIsOpen(true)}
          placeholder={`Select ${label}`}
          className="w-full p-1 rounded bg-purple-100"
        />

        {isOpen && (
          <ul
            tabIndex={-1}
            className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-auto"
          >
            {filtered.map((country) => (
              <li
                key={country}
                onClick={() => handleSelectCountry(country)}
                className="p-2 hover:bg-blue-50 cursor-pointer"
              >
                {country}
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="p-2 text-gray-500">No results</li>
            )}
          </ul>
        )}
      </div>
      <div
        data-testid={`invalid_${id}`}
        className="[grid-column:2] text-xs text-red-400"
      >
        {errorMessage}
      </div>
    </div>
  );
}

export default ControlledCountriesField;