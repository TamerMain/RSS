import { useDispatch } from 'react-redux';
import { addEntry } from '@/store/formEntriesSlice';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFormSchema, type EntryFormData } from '@/schemas/formSchema';
import { processFormImage } from '@/utils/processFormImage';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store/store';

import ControlledTextField from '@/components/fields/ControlledTextField';
import ControlledSelectField from '@/components/fields/ControlledSelectField';
import ControlledCheckboxField from '@/components/fields/ControlledCheckboxField';
import ControlledFileField from '@/components/fields/ControlledFileField';
import ControlledCountriesField from '@/components/fields/ControlledCountriesField';
import PasswordStrBar from './PasswordStrBar';

type ControlledFormProps = {
  onModalClose: () => void;
};

function ControlledForm(props: ControlledFormProps) {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);
  const formSchema = createFormSchema(countries);
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
      props.onModalClose();
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
        <ControlledTextField
          register={register}
          id="name"
          label="Name"
          placeholder="Enter Name"
          error={errors}
        />
        <ControlledTextField
          register={register}
          id="email"
          label="Email"
          placeholder="Enter Email"
          error={errors}
        />
        <ControlledTextField
          register={register}
          id="age"
          label="Age"
          placeholder="Enter Age"
          error={errors}
        />
        <PasswordStrBar password={password} />
        <ControlledTextField
          register={register}
          id="password"
          label="Password"
          placeholder="Enter Password"
          error={errors}
        />
        <ControlledTextField
          register={register}
          id="passwordConfirm"
          label="Confirm Password"
          placeholder="Confirm Password"
          error={errors}
        />
        <ControlledSelectField
          register={register}
          id="gender"
          label="Gender"
          options={[{ name: 'Female' }, { name: 'Male' }, { name: 'Other' }]}
          error={errors}
        />
        <ControlledCountriesField
          register={register}
          setInputValue={setValue}
          id="country"
          label="Country"
          options={countries}
          error={errors}
        />
        <ControlledFileField
          register={register}
          id="imageUpload"
          label="Upload Image"
          error={errors}
        />
        <ControlledCheckboxField
          register={register}
          id="termsAccepted"
          label="I've read Terms and Conditions"
          error={errors}
        />
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
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
