import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEntry } from '@/store/formEntriesSlice';
import { z } from 'zod';
import { processFormImage } from '@/utils/processFormImage';
import {
  createFormSchema,
  type EntryFormErrorFlatten,
} from '@/schemas/formSchema';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store/store';

import UncontrolledTextField from '@/components/fields/UncontrolledTextField';
import UncontrolledSelectField from '@/components/fields/UncontrolledSelectField';
import UncontrolledCheckboxField from '@/components/fields/UncontrolledCheckboxField';
import UncontrolledFileField from '@/components/fields/UncontrolledFileField';
import UncontrolledCountriesField from '@/components/fields/UncontrolledCountriesField';
import PasswordStrBar from './PasswordStrBar';

type UncontrolledFormProps = {
  onModalClose: () => void;
};

function UncontrolledForm(props: UncontrolledFormProps) {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);
  const formSchema = createFormSchema(countries);
  const [formErrors, setFormErrors] = useState<EntryFormErrorFlatten | null>(
    null
  );
  const [password, setPassword] = useState('');

  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const genderSelect = useRef<HTMLSelectElement>(null);
  const termsCheck = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const passwordConfirmInput = useRef<HTMLInputElement>(null);
  const countrySelect = useRef<HTMLInputElement>(null);
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
        props.onModalClose();
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
      className="relative flex flex-col gap-2 p-4 bg-emerald-50"
    >
      <UncontrolledTextField
        ref={nameInput}
        id="name"
        label="Name"
        placeholder="Enter Name"
        error={formErrors}
      />
      <UncontrolledTextField
        ref={emailInput}
        id="email"
        label="Email"
        placeholder="Enter Email"
        error={formErrors}
      />
      <UncontrolledTextField
        ref={ageInput}
        id="age"
        label="Age"
        placeholder="Enter Age"
        error={formErrors}
      />
      <PasswordStrBar password={password} />
      <UncontrolledTextField
        ref={passwordInput}
        setPassword={setPassword}
        id="password"
        label="Password"
        placeholder="Enter Password"
        error={formErrors}
      />
      <UncontrolledTextField
        ref={passwordConfirmInput}
        id="passwordConfirm"
        label="Confirm Password"
        placeholder="Confirm Password"
        error={formErrors}
      />
      <UncontrolledSelectField
        ref={genderSelect}
        id="gender"
        label="Gender"
        options={[{ name: 'Female' }, { name: 'Male' }, { name: 'Other' }]}
        error={formErrors}
      />
      <UncontrolledCountriesField
        ref={countrySelect}
        id="country"
        label="Country"
        options={countries}
        error={formErrors}
      />
      <UncontrolledFileField
        ref={imageUpload}
        id="imageUpload"
        label="Upload Image"
        error={formErrors}
      />
      <UncontrolledCheckboxField
        ref={termsCheck}
        id="termsAccepted"
        label="I've read Terms and Conditions"
        error={formErrors}
      />
      <button
        type="submit"
        className="text-6xl text-bitcount cursor-pointer disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default UncontrolledForm;
