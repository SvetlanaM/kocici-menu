import { useMutation } from '@apollo/client';
import router from 'next/router';
import { useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User_Insert_Input,
  User_Set_Input,
  User_Update_Column,
} from '../graphql/generated/graphql';
import { UPDATE_USER_PREFERENCES } from '../graphql/mutations';
import { getUser } from '../utils/user';
import SubmitButton from './SubmitButton';
import WelcomeBoxCheckbox from './WelcomeBoxCheckbox';

const WelcomeBoxForm = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isDirty },
  } = useForm();

  const [updateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER_PREFERENCES);

  const onSubmit = (data) => {
    const catUpdateInput: User_Insert_Input = {
      cats_preferences: JSON.stringify(
        data.item.length > 0 ? data.item.join(', ') : null
      ),
    };

    updateUser({
      variables: { id: getUser(), users: catUpdateInput },
    }).then(() => router.push('/my-cats'));
  };

  const checkBoxData = ['wet_food', 'dry_food', 'barf'];
  const watchedInput: [string] = watch('item');

  const disabled = isDirty
    ? (Array.isArray(watchedInput) && watchedInput.length) === 0
    : true;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex justify-between mb-6">
        {checkBoxData.map((item) => (
          <WelcomeBoxCheckbox
            name={item}
            registerRules={{
              ...register('item', {}),
            }}
          />
        ))}
      </fieldset>

      <div className="flex justify-center mt-10">
        <SubmitButton
          text="Uložiť výber"
          size="w-full xl-custom:w-1/3"
          disabled={disabled}
        />
      </div>
    </form>
  );
};

export default WelcomeBoxForm;
