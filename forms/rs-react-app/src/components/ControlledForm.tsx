import { useDispatch } from 'react-redux';
import { addEntry } from '@/store/formEntriesSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type EntryFormData } from '@/schemas/formSchema';
import countryList from '@/assets/country-list.json';
import TextField from '@/components/fields/TextField';
import SelectField from '@/components/fields/SelectField';
import CheckboxField from '@/components/fields/CheckboxField';
import FileField from '@/components/fields/FileField';
import { processFormImage } from '@/utils/processFormImage';

type ControlledFormProps = {
  onCloseModal: () => void;
};

function ControlledForm(props: ControlledFormProps) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
    setError,
    clearErrors,
  } = useForm<EntryFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: EntryFormData) => {
    try {
      const base64Image = await processFormImage(data.imageDownload);
      const submissionData = {
        ...data,
        imageDownload: base64Image,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };
      dispatch(addEntry(submissionData));
      clearErrors('imageDownload');
      props.onCloseModal();
    } catch (error) {
      setError('imageDownload', {
        type: 'manual',
        message: 'Failed to process image. Please try a different file.',
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="justify-items-stretch gap-2"
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
        <SelectField
          mode="controlled"
          register={register}
          id="gender"
          label="Gender"
          options={[{ name: 'Female' }, { name: 'Male' }, { name: 'Other' }]}
          error={errors}
        />
        <CheckboxField
          mode="controlled"
          register={register}
          id="termsAccepted"
          label="I've read Terms and Conditions"
          error={errors}
        />
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
          id="country"
          label="Country"
          options={countryList}
          error={errors}
        />
        <FileField
          mode="controlled"
          register={register}
          id="imageDownload"
          label="Upload Image"
          error={errors}
        />

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Send'}
        </button>
      </form>
    </>
  );
}

export default ControlledForm;
