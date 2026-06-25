import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type EntryFormData, type EntryFormKeys } from '@/schemas/formSchema';

type ControlledTextFieldProps = {
  id: EntryFormKeys;
  label: string;
  placeholder: string;
  register: UseFormRegister<EntryFormData>;
  error: FieldErrors<EntryFormData> | null;
};

function ControlledTextField({
  id,
  label,
  placeholder,
  register,
  error,
}: ControlledTextFieldProps) {
  const errorMessage = error?.[id]?.message;

  return (
    <div className="grid grid-cols-2 gap-1 h-15 auto-rows-fr items-center">
      <label
        className="block min-w-45 min-h-7 text-right pr-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        {...register(id)}
        className="p-1 bg-purple-100 rounded"
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

export default ControlledTextField;