import {
  type EntryFormKeys,
  type EntryFormErrorFlatten,
} from '@/schemas/formSchema';

type UncontrolledFileFieldProps = {
  id: EntryFormKeys;
  label: string;
  ref: React.RefObject<HTMLInputElement | null>;
  error: EntryFormErrorFlatten | null;
};

function UncontrolledFileField({
  id,
  label,
  ref,
  error,
}: UncontrolledFileFieldProps) {
  const errorMessage = error?.fieldErrors?.[id] || '';

  return (
    <div className="grid grid-cols-2 m-2 gap-1 h-15 auto-rows-fr">
      <div className="col-span-2 justify-self-center">
        <label
          className="min-w-45 text-right p-2 bg-emerald-100 cursor-pointer"
          htmlFor={id}
          tabIndex={0}
        >
          ↪ {label}
        </label>
        <input
          ref={ref}
          type="file"
          id={id}
          tabIndex={-1}
          accept="image/jpeg,image/png"
          className="hidden"
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

export default UncontrolledFileField;
