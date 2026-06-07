import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import {
  type EntryFormData,
  type EntryFormKeys,
  type EntryFormErrorFlatten,
} from '@/schemas/formSchema';

type TextFieldProps = {
  id: EntryFormKeys;
  label: string;
  placeholder: string;
} & (
  | {
      mode: 'uncontrolled';
      ref: React.RefObject<HTMLInputElement | null>;
      error: EntryFormErrorFlatten | null;
    }
  | {
      mode: 'controlled';
      register: UseFormRegister<EntryFormData>;
      error: FieldErrors<EntryFormData> | null;
    }
);

function TextField(props: TextFieldProps) {
  if (props.mode === 'controlled') {
    const errorMessage = props.error?.[props.id]?.message;
    return (
      <div className="grid grid-cols-2 h-15 auto-rows-fr items-center">
        <label
          className="block min-w-45 min-h-7 text-right pr-2"
          htmlFor={props.id}
        >
          {props.label}
        </label>
        <input
          {...props.register(props.id)}
          className="p-1 bg-purple-100 rounded"
          type="text"
          id={props.id}
          placeholder={props.placeholder}
        />
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
        {props.mode === 'uncontrolled' && (
          <input
            ref={props.ref}
            className="p-1 bg-emerald-100"
            type="text"
            id={props.id}
            placeholder={props.placeholder}
          />
        )}
        <div className="[grid-column:2] text-xs text-red-500">
          {errorMessage || ''}
        </div>
      </div>
    );
  }
}

export default TextField;
