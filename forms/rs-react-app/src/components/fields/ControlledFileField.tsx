import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type EntryFormData, type EntryFormKeys } from '@/schemas/formSchema';

type ControlledFileFieldProps = {
  id: EntryFormKeys;
  label: string;
  register: UseFormRegister<EntryFormData>;
  error: FieldErrors<EntryFormData> | null;
};

function ControlledFileField({
  id,
  label,
  register,
  error,
}: ControlledFileFieldProps) {
  const errorMessage = error?.[id]?.message;

  return (
    <div className="grid grid-cols-2 m-2 gap-1 h-15 auto-rows-fr">
      <div className="col-span-2 justify-self-center">
        <label
          className="min-w-45 text-right p-2 bg-purple-100 cursor-pointer"
          htmlFor={id}
          tabIndex={0}
        >
          ↪ {label}
        </label>
        <input
          {...register(id)}
          type="file"
          id={id}
          accept="image/jpeg,image/png"
          className="hidden"
          tabIndex={-1}
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

export default ControlledFileField;