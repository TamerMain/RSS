import { type EntryFormKeys, type EntryFormErrorFlatten } from '@/schemas/formSchema';

type UncontrolledSelectFieldProps = {
  id: EntryFormKeys;
  label: string;
  options: { name: string }[];
  ref: React.RefObject<HTMLSelectElement | null>;
  error: EntryFormErrorFlatten | null;
};

function UncontrolledSelectField({
  id,
  label,
  options,
  ref,
  error,
}: UncontrolledSelectFieldProps) {
  const errorMessage = error?.fieldErrors?.[id] || '';

  return (
    <div className="grid grid-cols-2 gap-1 h-15 auto-rows-fr items-center">
      <label className="block min-w-45 text-right pr-2" htmlFor={id}>
        {label}
      </label>
      <div>
        <select
          ref={ref}
          className="min-w-40 p-1 bg-emerald-100 cursor-pointer capitalize"
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

export default UncontrolledSelectField;