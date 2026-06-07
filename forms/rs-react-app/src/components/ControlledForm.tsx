import { useDispatch } from 'react-redux';
import { addEntry } from '@/store/formEntriesSlice';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type EntryFormData } from '@/schemas/formSchema';
import { processFormImage } from '@/utils/processFormImage';

import countryList from '@/assets/country-list.json';
import TextField from '@/components/fields/TextField';
import SelectField from '@/components/fields/SelectField';
import CheckboxField from '@/components/fields/CheckboxField';
import FileField from '@/components/fields/FileField';
import CountriesField from '@/components/fields/CountriesField';
import PasswordStrBar from './PasswordStrBar';

type ControlledFormProps = {
  onCloseModal: () => void;
};

function ControlledForm(props: ControlledFormProps) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<EntryFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });
  const password = useWatch({
    control,
    name: 'password',
  });

  const onSubmit = async (data: EntryFormData) => {
    try {
      const base64Image = await processFormImage(data.imageUpload);
      const submissionData = {
        ...data,
        imageUpload: base64Image,
      };
      dispatch(addEntry(submissionData));
      clearErrors('imageUpload');
      props.onCloseModal();
    } catch {
      setError('imageUpload', {
        type: 'manual',
        message: 'Failed to process image. Please try a different file.',
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-2 p-4 bg-purple-50"
      >
        <TextField
          mode="controlled"
          register={register}
          id="name"
          label="Name"
          placeholder="Enter Name"
          error={errors}
        />
        <TextField
          mode="controlled"
          register={register}
          id="email"
          label="Email"
          placeholder="Enter Email"
          error={errors}
        />
        <TextField
          mode="controlled"
          register={register}
          id="age"
          label="Age"
          placeholder="Enter Age"
          error={errors}
        />
        <PasswordStrBar password={password} />
        <TextField
          mode="controlled"
          register={register}
          id="password"
          label="Password"
          placeholder="Enter Password"
          error={errors}
        />
        <TextField
          mode="controlled"
          register={register}
          id="passwordConfirm"
          label="Confirm Password"
          placeholder="Confirm Password"
          error={errors}
        />
        <SelectField
          mode="controlled"
          register={register}
          id="gender"
          label="Gender"
          options={[{ name: 'Female' }, { name: 'Male' }, { name: 'Other' }]}
          error={errors}
        />
        <CountriesField
          mode="controlled"
          register={register}
          setInputValue={setValue}
          id="country"
          label="Country"
          options={countryList}
          error={errors}
        />
        <FileField
          mode="controlled"
          register={register}
          id="imageUpload"
          label="Upload Image"
          error={errors}
        />
        <CheckboxField
          mode="controlled"
          register={register}
          id="termsAccepted"
          label="I've read Terms and Conditions"
          error={errors}
        />
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
          onClick={() => {
            console.log(Object.keys(errors).length);
          }}
          tabIndex={0}
          className={`text-6xl text-bitcount cursor-pointer disabled:cursor-not-allowed`}
        >
          {isSubmitting ? 'Processing...' : 'Send'}
        </button>
      </form>
    </>
  );
}

export default ControlledForm;
