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

  const passwordStrengthStatus = {
    
  }


  if (props.mode === 'controlled') {
    return (
      <div className="grid grid-cols-2 auto-rows-fr items-center">
        <label className="block min-w-45 text-right pr-2" htmlFor={props.id}>
          {props.label}
        </label>
        <input
          {...props.register(props.id)}
          className="outline-none"
          type="text"
          id={props.id}
          placeholder={props.placeholder}
        />
        <div className="[grid-column:2] text-xs text-red-500">
          {props.error?.[props.id]?.message || ''}
        </div>
      </div>
    );
  }

  if (props.mode === 'uncontrolled')
    return (
      <div className="grid grid-cols-2 auto-rows-fr items-center">
        <label className="block min-w-45 text-right pr-2" htmlFor={props.id}>
          {props.label}
        </label>
        {props.mode === 'uncontrolled' && (
          <input
            ref={props.ref}
            className="outline-none"
            type="text"
            id={props.id}
            placeholder={props.placeholder}
          />
        )}
        <div className="[grid-column:2] text-xs text-red-500">
          {props.error?.fieldErrors?.[props.id] || ''}
        </div>
      </div>
    );
}

export default TextField;
