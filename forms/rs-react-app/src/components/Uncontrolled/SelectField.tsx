import { type FormErrorFlatten } from '@/schemas/formSchema';

type FieldErrorKeys = keyof NonNullable<FormErrorFlatten['fieldErrors']>;

type TextFieldProps = {
  ref: React.RefObject<HTMLSelectElement | null>;
  id: FieldErrorKeys;
  label: string;
  options: { name: string }[];
  error: string[] | undefined;
};

function SelectField(props: TextFieldProps) {
  return (
    <div className="grid grid-cols-2 auto-rows-fr items-center">
      <label className="block min-w-45 text-right pr-2" htmlFor={props.id}>
        {props.label}
      </label>
      <div>
        <select ref={props.ref} className="min-w-40 outline-none" id={props.id}>
          <option className="text-gray" value="">
            Select
          </option>
          {props.options.map((i) => (
            <option value={i.name}>{i.name}</option>
          ))}
        </select>
      </div>
      <div className="[grid-column:2] text-xs text-red-500">
        {props.error?.[0] || ''}
      </div>
    </div>
  );
}

export default SelectField;
