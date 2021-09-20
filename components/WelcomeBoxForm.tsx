import { useMutation } from '@apollo/client';
import router from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User_Insert_Input,
} from '../graphql/generated/graphql';
import { UPDATE_USER_PREFERENCES } from '../graphql/mutations';
import { getUser } from '../utils/user';
import SubmitButton from './SubmitButton';
import WelcomeBoxCheckbox from './WelcomeBoxCheckbox';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';

type WelcomBoxSubmissionForm = {
  item: ['wet_food', 'dry_food', 'barf'];
};

const WelcomeBoxForm = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { isDirty },
  } = useForm<WelcomBoxSubmissionForm>();

  const [updateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER_PREFERENCES);

  const onSubmit: SubmitHandler<WelcomBoxSubmissionForm> = (data) => {
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
  const watchedInput: ['wet_food', 'dry_food', 'barf'] = watch('item');
  const { t } = useTranslation();
  const disabled = isDirty
    ? (Array.isArray(watchedInput) && watchedInput.length) === 0
    : true;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex justify-between mb-6">
        {checkBoxData.map((item) => (
          <WelcomeBoxCheckbox
            name={item}
            key={item}
            registerRules={{
              ...register('item', {}),
            }}
          />
        ))}
      </fieldset>

      <div className="flex justify-center mt-10">
        <SubmitButton
          text={t(cs['save_meal'])}
          size="w-full xl-custom:w-1/3"
          disabled={disabled}
        />
      </div>
    </form>
  );
};

export default WelcomeBoxForm;
