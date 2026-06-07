import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import {
  type EntryFormData,
  type EntryFormKeys,
  type EntryFormErrorFlatten,
} from '@/schemas/formSchema';

type FileFieldProps = {
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

function FileField(props: FileFieldProps) {
  if (props.mode === 'controlled') {
    const errorMessage = props.error?.[props.id]?.message;
    return (
      <div className="grid grid-cols-2 m-2 gap-1 h-15 auto-rows-fr">
        <div className="col-span-2 justify-self-center">
          <label
            className=" min-w-45 text-right p-2 bg-purple-100 cursor-pointer"
            htmlFor={props.id}
            tabIndex={0}
          >
            ↪ {props.label}
          </label>
          <input
            {...props.register(props.id)}
            type="file"
            id={props.id}
            tabIndex={0}
            accept="image/jpeg,image/png"
            className="hidden"
          />
        </div>
        <div className="[grid-column:2] text-xs text-red-400">
          {errorMessage || ''}
        </div>
      </div>
    );
  }
  if (props.mode === 'uncontrolled') {
    const errorMessage = props.error?.fieldErrors?.[props.id] || '';
    return (
      <div className="grid grid-cols-2 m-2 gap-1 h-15 auto-rows-fr">
        <div className="col-span-2 justify-self-center">
          <label
            className=" min-w-45 text-right p-2 bg-emerald-100 cursor-pointer"
            htmlFor={props.id}
            tabIndex={0}
          >
            ↪ {props.label}
          </label>
          <input
            ref={props.ref}
            type="file"
            id={props.id}
            accept="image/jpeg,image/png"
            className="hidden"
          />
        </div>
        <div className="[grid-column:2] text-xs text-red-400">
          {errorMessage || ''}
        </div>
      </div>
    );
  }
}

export default FileField;
