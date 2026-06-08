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
    const errorMessage = props.error?.[props.id]?.message;
    return (
      <div className="grid grid-cols-2 gap-1 h-18 auto-rows-fr">
        <div className="flex items-center col-span-2 justify-self-center">
          <label className=" min-w-45 text-right pr-2" htmlFor={props.id}>
            {props.label}
          </label>
          <input
            {...props.register(props.id)}
            type="checkbox"
            id={props.id}
            className="w-4 h-4 pl-2  cursor-pointer"
          />
        </div>
        <div data-testid={`invalid_${props.id}`} className="[grid-column:2] text-xs text-red-400">
          {errorMessage}
        </div>
      </div>
    );
  }

  if (props.mode === 'uncontrolled') {
    const errorMessage = props.error?.fieldErrors?.[props.id] || '';
    return (
      <div className="grid grid-cols-2 gap-1 h-18 auto-rows-fr">
        <div className="flex items-center col-span-2 justify-self-center">
          <label className=" min-w-45 text-right pr-2" htmlFor={props.id}>
            {props.label}
          </label>
          <input
            ref={props.ref}
            type="checkbox"
            id={props.id}
            className="w-4 h-4 pl-2 cursor-pointer"
          />
        </div>
        <div data-testid={`invalid_${props.id}`} className="[grid-column:2] text-xs text-red-400">
          {errorMessage}
        </div>
      </div>
    );
  }
}

export default CheckboxField;
