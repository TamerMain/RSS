import { screen } from '@testing-library/react';
import { type UserEvent } from '@testing-library/user-event';
import { TEST_FIELDS_LABELS } from '@/tests/test-utils/constants';
import { type TEST_INPUT_TYPES } from './types';

export const mockUserFormFill = async (
  user: UserEvent,
  userInput: TEST_INPUT_TYPES
) => {
  const nameField: HTMLLabelElement = screen.getByLabelText(
    TEST_FIELDS_LABELS.NAME
  );
  if (userInput.NAME !== undefined) {
    await user.click(nameField);
    if (userInput.NAME !== '') {
      await user.keyboard(userInput.NAME);
    }
    if (userInput.NAME === '') {
      await user.keyboard('A');
      await user.keyboard('{Delete}');
    }
  }

  const emailField: HTMLLabelElement = screen.getByLabelText(
    TEST_FIELDS_LABELS.EMAIL
  );
  if (userInput.EMAIL !== undefined) {
    await user.click(emailField);
    if (userInput.EMAIL !== '') {
      await user.keyboard(userInput.EMAIL);
    }
    if (userInput.EMAIL === '') {
      await user.keyboard('A');
      await user.keyboard('{Delete}');
    }
  }

  const ageField: HTMLLabelElement = screen.getByLabelText(
    TEST_FIELDS_LABELS.AGE
  );
  if (userInput.AGE !== undefined) {
    await user.click(ageField);
    if (userInput.AGE !== '') {
      await user.keyboard(userInput.AGE);
    }
    if (userInput.AGE === '') {
      await user.keyboard('2');
      await user.keyboard('{Delete}');
    }
  }

  const passwordField: HTMLLabelElement = screen.getByLabelText(
    TEST_FIELDS_LABELS.PASSWORD
  );
  if (userInput.PASSWORD !== undefined) {
    await user.click(passwordField);
    if (userInput.PASSWORD !== '') {
      await user.keyboard(userInput.PASSWORD);
    }
    if (userInput.PASSWORD === '') {
      await user.keyboard('A');
      await user.keyboard('{Delete}');
    }
  }

  const confirmPasswordField: HTMLLabelElement = screen.getByLabelText(
    TEST_FIELDS_LABELS.CONFIRM_PASSWORD
  );
  if (userInput.CONFIRM_PASSWORD !== undefined) {
    await user.click(confirmPasswordField);
    if (userInput.CONFIRM_PASSWORD !== '') {
      await user.keyboard(userInput.CONFIRM_PASSWORD);
    }
    if (userInput.CONFIRM_PASSWORD === '') {
      await user.keyboard('A');
      await user.keyboard('{Delete}');
    }
  }

  const genderSelect: HTMLLabelElement = screen.getByLabelText(
    TEST_FIELDS_LABELS.GENDER
  );
  if (userInput.GENDER !== undefined) {
    if (userInput.GENDER !== false) {
      await user.selectOptions(genderSelect, userInput.GENDER);
    }
    if (userInput.GENDER === false) {
      await user.selectOptions(genderSelect, 'Other');
      await user.selectOptions(genderSelect, '');
    }
  }

  const countrySelect: HTMLLabelElement = screen.getByLabelText(
    TEST_FIELDS_LABELS.COUNTRY
  );
  if (userInput.COUNTRY !== undefined) {
    await user.click(countrySelect);
    if (userInput.COUNTRY !== '') {
      await user.keyboard(userInput.COUNTRY);
    }
    if (userInput.COUNTRY === '') {
      await user.keyboard('A');
      await user.keyboard('{Delete}');
    }
  }

  const termCheck: HTMLLabelElement = screen.getByLabelText(
    TEST_FIELDS_LABELS.TERMS
  );
  if (userInput.TERMS !== undefined) {
    await user.click(termCheck);
    if (userInput.TERMS === false) {
      await user.click(termCheck);
    }
  }
};
