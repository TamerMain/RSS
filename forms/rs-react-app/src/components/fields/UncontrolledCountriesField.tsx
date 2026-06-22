import { useState } from 'react';
import { type EntryFormKeys, type EntryFormErrorFlatten } from '@/schemas/formSchema';

type UncontrolledCountriesFieldProps = {
  id: EntryFormKeys;
  label: string;
  options: string[];
  ref: React.RefObject<HTMLInputElement | null>;
  error: EntryFormErrorFlatten | null;
};

function UncontrolledCountriesField({
  id,
  label,
  options,
  ref,
  error,
}: UncontrolledCountriesFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [_, setSelected] = useState('');

  const errorMessage = error?.fieldErrors?.[id] || '';
  const filtered = options.filter((country) =>
    country.toLowerCase().includes(input.toLowerCase())
  );

  const handleSelectCountry = (country: string) => {
    setInput(country);
    setSelected(country);
    setIsOpen(false);

    if (ref.current) {
      ref.current.value = country;
      const event = new Event('input', { bubbles: true });
      ref.current.dispatchEvent(event);
    }
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
          ref={ref}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            setTimeout(() => setIsOpen(false), 100);
          }}
          placeholder={`Select ${label}`}
          className="w-full p-1 rounded bg-emerald-100"
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

export default UncontrolledCountriesField;