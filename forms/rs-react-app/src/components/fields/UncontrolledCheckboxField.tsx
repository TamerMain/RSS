import {
  type EntryFormKeys,
  type EntryFormErrorFlatten,
} from '@/schemas/formSchema';

type UncontrolledCheckboxFieldProps = {
  id: EntryFormKeys;
  label: string;
  ref: React.RefObject<HTMLInputElement | null>;
  error: EntryFormErrorFlatten | null;
};

function UncontrolledCheckboxField({
  id,
  label,
  ref,
  error,
}: UncontrolledCheckboxFieldProps) {
  const errorMessage = error?.fieldErrors?.[id] || '';

  return (
    <div className="grid grid-cols-2 gap-1 h-18 auto-rows-fr">
      <div className="flex items-center col-span-2 justify-self-center">
        <label className="min-w-45 text-right pr-2" htmlFor={id}>
          {label}
        </label>
        <input
          ref={ref}
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

export default UncontrolledCheckboxField;
