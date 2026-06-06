import { type FormErrorFlatten } from '@/schemas/formSchema';

type FieldErrorKeys = keyof NonNullable<FormErrorFlatten['fieldErrors']>;

type TextFieldProps = {
  ref: React.RefObject<HTMLInputElement | null>;
  id: FieldErrorKeys;
  label: string;
  placeholder: string;
  error: string[] | undefined;
};

function TextField(props: TextFieldProps) {
  return (
    <div className="grid grid-cols-2 auto-rows-fr items-center">
      <label className="block min-w-45 text-right pr-2" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        ref={props.ref}
        className="outline-none"
        type="text"
        id={props.id}
        placeholder={props.placeholder}
      />
      <div className="[grid-column:2] text-xs text-red-500">
        {props.error?.[0] || ''}
      </div>
    </div>
  );
}

export default TextField;
