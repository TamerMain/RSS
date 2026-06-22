import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type EntryFormData, type EntryFormKeys } from '@/schemas/formSchema';

type ControlledCheckboxFieldProps = {
  id: EntryFormKeys;
  label: string;
  register: UseFormRegister<EntryFormData>;
  error: FieldErrors<EntryFormData> | null;
};

function ControlledCheckboxField({
  id,
  label,
  register,
  error,
}: ControlledCheckboxFieldProps) {
  const errorMessage = error?.[id]?.message;

  return (
    <div className="grid grid-cols-2 gap-1 h-18 auto-rows-fr">
      <div className="flex items-center col-span-2 justify-self-center">
        <label className="min-w-45 text-right pr-2" htmlFor={id}>
          {label}
        </label>
        <input
          {...register(id)}
          type="checkbox"
          id={id}
          className="w-4 h-4 pl-2 cursor-pointer"
        />
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

export default ControlledCheckboxField;