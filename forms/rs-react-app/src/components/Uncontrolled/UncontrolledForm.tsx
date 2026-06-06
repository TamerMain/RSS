import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import countryList from '@/assets/country-list.json';
import {
  formSchema,
  type FormData,
  type FormErrorFlatten,
} from '@/schemas/formSchema';
import { addEntry } from '@/store/formEntriesSlice';
import TextField from './TextField';
import SelectField from './SelectField';
import CheckboxField from './CheckboxField';
import FileField from './FileField';

function UncontrolledForm() {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState<FormErrorFlatten | null>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const genderSelect = useRef<HTMLSelectElement>(null);
  const termsCheck = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const passwordConfirmInput = useRef<HTMLInputElement>(null);
  const countrySelect = useRef<HTMLSelectElement>(null);
  const imageDownload = useRef<HTMLInputElement>(null);

  function handleFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {
      name: nameInput.current?.value,
      email: emailInput.current?.value,
      age: ageInput.current?.value,
      gender: genderSelect.current?.value,
      termsAccepted: termsCheck.current?.checked,
      password: passwordInput.current?.value,
      passwordConfirm: passwordConfirmInput.current?.value,
      country: countrySelect.current?.value,
      imageDownload: imageDownload.current?.files?.[0],
    };
    const result = formSchema.safeParse(formData);
    if (result.success) {
      dispatch(addEntry(result.data));
      setFormErrors(null);
    } else {
      setFormErrors(() => {
        console.log(formData.imageDownload);
        console.log(z.flattenError(result.error).fieldErrors);
        return z.flattenError(result.error);
      });
    }
  }
  return (
    <form
      onSubmit={handleFormSubmit}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[35vh] justify-items-stretch gap-2"
    >
      <TextField
        ref={nameInput}
        id="name"
        label="Name"
        placeholder="Enter Name"
        error={formErrors?.fieldErrors['name']}
      />
      <TextField
        ref={emailInput}
        id="email"
        label="Email"
        placeholder="Enter Email"
        error={formErrors?.fieldErrors['email']}
      />
      <TextField
        ref={ageInput}
        id="age"
        label="Age"
        placeholder="Enter Age"
        error={formErrors?.fieldErrors['age']}
      />
      <SelectField
        ref={genderSelect}
        id="gender"
        label="Gender"
        options={[{ name: 'Female' }, { name: 'Male' }, { name: 'Other' }]}
        error={formErrors?.fieldErrors['gender']}
      />
      <CheckboxField
        ref={termsCheck}
        id="termsAccepted"
        label="I've read Terms and Conditions"
        error={formErrors?.fieldErrors['termsAccepted']}
      />
      <TextField
        ref={ageInput}
        id="password"
        label="Password"
        placeholder="Enter Password"
        error={formErrors?.fieldErrors['password']}
      />
      <TextField
        ref={ageInput}
        id="passwordConfirm"
        label="Confirm Password"
        placeholder="Confirm Password"
        error={formErrors?.fieldErrors['passwordConfirm']}
      />
      <SelectField
        ref={countrySelect}
        id="country"
        label="Country"
        options={countryList}
        error={formErrors?.fieldErrors['gender']}
      />
      <FileField
        ref={imageDownload}
        id="imageDownload"
        label="Upload Image"
        error={formErrors?.fieldErrors['imageDownload']}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default UncontrolledForm;
