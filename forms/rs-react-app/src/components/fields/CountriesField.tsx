import { useState } from 'react';
import {
  type UseFormRegister,
  type FieldErrors,
  type UseFormSetValue,
} from 'react-hook-form';
import {
  type EntryFormData,
  type EntryFormKeys,
  type EntryFormErrorFlatten,
} from '@/schemas/formSchema';

type CountriesFieldProps = {
  id: EntryFormKeys;
  label: string;
  options: string[];
} & (
  | {
      mode: 'uncontrolled';
      ref: React.RefObject<HTMLInputElement | null>;
      error: EntryFormErrorFlatten | null;
    }
  | {
      mode: 'controlled';
      register: UseFormRegister<EntryFormData>;
      setInputValue: UseFormSetValue<EntryFormData>;
      error: FieldErrors<EntryFormData> | null;
    }
);

const CountriesField = (props: CountriesFieldProps) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [, setSelected] = useState('');

  const filtered = props.options.filter((country) =>
    country.toLowerCase().includes(input.toLowerCase())
  );

  if (props.mode === 'controlled') {
    const errorMessage = props.error?.[props.id]?.message;

    const handleSelectCountry = (country: string) => {
      setInput(country);
      setSelected(country);
      setOpen(false);
      props.setInputValue(props.id, country, {
        shouldValidate: true,
      });
    };
    return (
      <div className="grid grid-cols-2 gap-1 h-15 auto-rows-fr items-center">
        <label className="block min-w-45 text-right pr-2" htmlFor={props.id}>
          {props.label}
        </label>
        <div className="relative">
          <input
            id={props.id}
            type="text"
            {...props.register(props.id, {
              onChange: (e) => {
                setInput(e.target.value);
              },
              onBlur: () => {
                setTimeout(() => setOpen(false), 100);
              },
            })}
            onFocus={() => setOpen(true)}
            placeholder={`Select ${props.label}`}
            className="w-full p-1 rounded bg-purple-100"
          />

          {open && (
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
          data-testid={`invalid_${props.id}`}
          className="[grid-column:2] text-xs text-red-400"
        >
          {errorMessage}
        </div>
      </div>
    );
  }

  if (props.mode === 'uncontrolled') {
    const errorMessage = props.error?.fieldErrors?.[props.id] || '';

    const handleSelectCountry = (country: string) => {
      setInput(country);
      setSelected(country);
      setOpen(false);

      if (props.ref.current) {
        props.ref.current.value = country;

        const event = new Event('input', { bubbles: true });
        props.ref.current.dispatchEvent(event);
      }
    };
    return (
      <div className="grid grid-cols-2 gap-1 h-15 auto-rows-fr items-center">
        <label className="block min-w-45 text-right pr-2" htmlFor={props.id}>
          {props.label}
        </label>
        <div className="relative">
          <input
            id={props.id}
            type="text"
            ref={props.ref}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              setTimeout(() => setOpen(false), 100);
            }}
            placeholder={`Select ${props.label}`}
            className="w-full p-1 rounded bg-emerald-100"
          />

          {open && (
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
          data-testid={`invalid_${props.id}`}
          className="[grid-column:2] text-xs text-red-400"
        >
          {errorMessage}
        </div>
      </div>
    );
  }
};

export default CountriesField;
