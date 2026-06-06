import { type FormErrorFlatten } from '@/schemas/formSchema';

type FieldErrorKeys = keyof NonNullable<FormErrorFlatten['fieldErrors']>;

type FileFieldProps = {
  ref: React.RefObject<HTMLInputElement | null>;
  id: FieldErrorKeys;
  label: string;
  error: string[] | undefined;
};

function FileField(props: FileFieldProps) {
  return (
    <div className="grid grid-cols-2 auto-rows-fr">
      <div className="col-span-2 justify-self-center">
        <label className=" min-w-45 text-right pr-2" htmlFor={props.id}>
          {props.label}
        </label>
        <input
          ref={props.ref}
          type="file"
          id={props.id}
          accept="image/jpeg,image/png"
          className="hidden"
        />
      </div>
      <div className="[grid-column:2] text-xs text-red-500">
        {props.error?.[0] || ''}
      </div>
    </div>
  );
}

export default FileField;
