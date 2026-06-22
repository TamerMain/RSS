import { type Dispatch, type SetStateAction } from 'react';
import {
  type EntryFormKeys,
  type EntryFormErrorFlatten,
} from '@/schemas/formSchema';

type UncontrolledTextFieldProps = {
  id: EntryFormKeys;
  label: string;
  placeholder: string;
  ref: React.RefObject<HTMLInputElement | null>;
  error: EntryFormErrorFlatten | null;
  setPassword?: Dispatch<SetStateAction<string>>;
};

function UncontrolledTextField({
  id,
  label,
  placeholder,
  ref,
  error,
  setPassword,
}: UncontrolledTextFieldProps) {
  const errorMessage = error?.fieldErrors?.[id] || '';

  return (
    <div className="grid grid-cols-2 gap-1 h-15 auto-rows-fr items-center">
      <label className="block min-w-45 text-right pr-2" htmlFor={id}>
        {label}
      </label>
      <input
        onChange={(e) => {
          if (setPassword) setPassword(e.currentTarget.value);
        }}
        ref={ref}
        className="p-1 bg-emerald-100"
        type="text"
        id={id}
        placeholder={placeholder}
      />
      <div
        data-testid={`invalid_${id}`}
        className="[grid-column:2] text-xs text-red-400"
      >
        {errorMessage}
      </div>
    </div>
  );
}

export default UncontrolledTextField;
