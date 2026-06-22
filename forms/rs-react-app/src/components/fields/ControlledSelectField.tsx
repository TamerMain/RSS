import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type EntryFormData, type EntryFormKeys } from '@/schemas/formSchema';

type ControlledSelectFieldProps = {
  id: EntryFormKeys;
  label: string;
  options: { name: string }[];
  register: UseFormRegister<EntryFormData>;
  error: FieldErrors<EntryFormData> | null;
};

function ControlledSelectField({
  id,
  label,
  options,
  register,
  error,
}: ControlledSelectFieldProps) {
  const errorMessage = error?.[id]?.message;

  return (
    <div className="grid grid-cols-2 gap-1 h-15 auto-rows-fr items-center">
      <label className="block min-w-45 text-right pr-2" htmlFor={id}>
        {label}
      </label>
      <div>
        <select
          {...register(id)}
          className="min-w-40 p-1 bg-purple-100 cursor-pointer capitalize"
          id={id}
        >
          <option className="text-gray" value="">
            Select {label}
          </option>
          {options.map((i) => (
            <option key={i.name} value={i.name}>
              {i.name}
            </option>
          ))}
        </select>
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

export default ControlledSelectField;