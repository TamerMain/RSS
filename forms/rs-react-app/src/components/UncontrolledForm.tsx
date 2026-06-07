import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEntry } from '@/store/formEntriesSlice';
import { z } from 'zod';
import countryList from '@/assets/country-list.json';
import { formSchema, type EntryFormErrorFlatten } from '@/schemas/formSchema';
import TextField from '@/components/fields/TextField';
import SelectField from '@/components/fields/SelectField';
import CheckboxField from '@/components/fields/CheckboxField';
import FileField from '@/components/fields/FileField';
import { processFormImage } from '@/utils/processFormImage';

type UnontrolledFormProps = {
  onCloseModal: () => void;
};

function UncontrolledForm(props: UnontrolledFormProps) {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState<EntryFormErrorFlatten | null>(
    null
  );
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const genderSelect = useRef<HTMLSelectElement>(null);
  const termsCheck = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const passwordConfirmInput = useRef<HTMLInputElement>(null);
  const countrySelect = useRef<HTMLSelectElement>(null);
  const imageUpload = useRef<HTMLInputElement>(null);

  async function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      name: nameInput.current?.value,
      email: emailInput.current?.value,
      gender: genderSelect.current?.value,
      password: passwordInput.current?.value,
      passwordConfirm: passwordConfirmInput.current?.value,
      age: ageInput.current?.value,
      country: countrySelect.current?.value,
      imageUpload: imageUpload.current?.files,
      termsAccepted: termsCheck.current?.checked,
    };
    const result = formSchema.safeParse(formData);
    if (result.success) {
      try {
        const base64Image = await processFormImage(result.data.imageUpload);
        const submissionData = {
          ...result.data,
          imageUpload: base64Image,
        };
        dispatch(addEntry(submissionData));
        setFormErrors(null);
        props.onCloseModal();
      } catch {
        setFormErrors({
          formErrors: [],
          fieldErrors: {
            imageUpload: [
              'Failed to process image. Please try a different file.',
            ],
          },
        });
      }
    } else {
      setFormErrors(z.flattenError(result.error));
    }
  }
  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-2 p-4 bg-emerald-50"
    >
      <TextField
        mode="uncontrolled"
        ref={nameInput}
        id="name"
        label="Name"
        placeholder="Enter Name"
        error={formErrors}
      />
      <TextField
        mode="uncontrolled"
        ref={emailInput}
        id="email"
        label="Email"
        placeholder="Enter Email"
        error={formErrors}
      />
      <TextField
        mode="uncontrolled"
        ref={ageInput}
        id="age"
        label="Age"
        placeholder="Enter Age"
        error={formErrors}
      />
      <TextField
        mode="uncontrolled"
        ref={passwordInput}
        id="password"
        label="Password"
        placeholder="Enter Password"
        error={formErrors}
      />
      <TextField
        mode="uncontrolled"
        ref={passwordConfirmInput}
        id="passwordConfirm"
        label="Confirm Password"
        placeholder="Confirm Password"
        error={formErrors}
      />
      <SelectField
        mode="uncontrolled"
        ref={genderSelect}
        id="gender"
        label="Gender"
        options={[{ name: 'Female' }, { name: 'Male' }, { name: 'Other' }]}
        error={formErrors}
      />
      <SelectField
        mode="uncontrolled"
        ref={countrySelect}
        id="country"
        label="Country"
        options={countryList}
        error={formErrors}
      />
      <FileField
        mode="uncontrolled"
        ref={imageUpload}
        id="imageUpload"
        label="Upload Image"
        error={formErrors}
      />
      <CheckboxField
        mode="uncontrolled"
        ref={termsCheck}
        id="termsAccepted"
        label="I've read Terms and Conditions"
        error={formErrors}
      />
      <button
        type="submit"
        className={`text-6xl text-bitcount cursor-pointer disabled:cursor-not-allowed`}
      >
        Send
      </button>
    </form>
  );
}

export default UncontrolledForm;
