import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import {
  type EntryFormData,
  type EntryFormKeys,
  type EntryFormErrorFlatten,
} from '@/schemas/formSchema';

type SelectFieldProps = {
  id: EntryFormKeys;
  label: string;
  options: { name: string }[];
} & (
  | {
      mode: 'uncontrolled';
      ref: React.RefObject<HTMLSelectElement | null>;
      error: EntryFormErrorFlatten | null;
    }
  | {
      mode: 'controlled';
      register: UseFormRegister<EntryFormData>;
      error: FieldErrors<EntryFormData> | null;
    }
);

function SelectField(props: SelectFieldProps) {
  if (props.mode === 'controlled') {
    const errorMessage = props.error?.[props.id]?.message;
    return (
      <div className="grid grid-cols-2 h-15 auto-rows-fr items-center">
        <label className="block min-w-45 text-right pr-2" htmlFor={props.id}>
          {props.label}
        </label>
        <div>
          <select
            {...props.register(props.id)}
            className="min-w-40 p-1 bg-purple-100 cursor-pointer capitalize"
            id={props.id}
          >
            <option className="text-gray" value="">
              Select {props.id}
            </option>
            {props.options.map((i) => (
              <option key={i.name} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
        <div className="[grid-column:2] text-xs text-red-500">
          {errorMessage || ''}
        </div>
      </div>
    );
  }

  if (props.mode === 'uncontrolled') {
    const errorMessage = props.error?.fieldErrors?.[props.id] || '';
    return (
      <div className="grid grid-cols-2 h-15 auto-rows-fr items-center">
        <label className="block min-w-45 text-right pr-2" htmlFor={props.id}>
          {props.label}
        </label>
        <div>
          <select
            ref={props.ref}
            className="min-w-40 p-1 bg-emerald-100 cursor-pointer capitalize"
            id={props.id}
          >
            <option className="text-gray" value="">
              Select {props.id}
            </option>
            {props.options.map((i) => (
              <option key={i.name} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
        <div className="[grid-column:2] text-xs text-red-500">
          {errorMessage || ''}
        </div>
      </div>
    );
  }
}

export default SelectField;
