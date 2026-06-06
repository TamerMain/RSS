import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import {
  type EntryFormData,
  type EntryFormKeys,
  type EntryFormErrorFlatten,
} from '@/schemas/formSchema';

type CheckboxFieldProps = {
  id: EntryFormKeys;
  label: string;
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

function CheckboxField(props: CheckboxFieldProps) {
  if (props.mode === 'controlled') {
    return (
      <div className="grid grid-cols-2 auto-rows-fr">
        <div className="col-span-2 justify-self-center">
          <label className=" min-w-45 text-right pr-2" htmlFor={props.id}>
            {props.label}
          </label>
          <input
            className="pl-2"
            {...props.register(props.id)}
            type="checkbox"
            id={props.id}
          />
        </div>
        <div className="[grid-column:2] text-xs text-red-500">
          {props.error?.[props.id]?.message || ''}
        </div>
      </div>
    );
  }

  if (props.mode === 'uncontrolled') {
    return (
      <div className="grid grid-cols-2 auto-rows-fr">
        <div className="col-span-2 justify-self-center">
          <label className=" min-w-45 text-right pr-2" htmlFor={props.id}>
            {props.label}
          </label>
          <input
            className="pl-2"
            ref={props.ref}
            type="checkbox"
            id={props.id}
          />
        </div>
        <div className="[grid-column:2] text-xs text-red-500">
          {props.error?.fieldErrors?.[props.id] || ''}
        </div>
      </div>
    );
  }
}

export default CheckboxField;
