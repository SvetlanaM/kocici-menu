import React, { useCallback, useMemo } from 'react';
import {
  Cat_Insert_Input,
  CatTypeEnum_Enum as catTypes,
} from '../graphql/generated/graphql';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import FormErrorMessage from './form-error-message';
import FormLegend from './form-legend';
import FormInputWrapper from './form-input-wrapper';
import FormInputLabel from './form-input-label';
import FormInput from './form-input';
import FormSelectBox from './form-select-box';
import BackButton from '../components/back-button';
import SubmitButton from '../components/submit-button';
import ErrorScreen from './error-screen';

export type CatInputData = Omit<Cat_Insert_Input, 'CatTypeEnum'>;
interface CatFormInterface {
  handleSubmit1: { (cat: CatInputData): Promise<boolean> };
  submitText: string;
}

const CatForm = ({ handleSubmit1, submitText }: CatFormInterface) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const noteInputName = 'note';
  const watchedNote: string | undefined = watch(noteInputName);

  const onSubmit = useCallback(
    (data) => {
      const catInput: CatInputData = {
        age: Number(data.age),
        name: data.name,
        user_id: 1,
        doctor_email: data.doctor_email,
        nickname: data.nickname,
        weight: Number(data.weight),
        type: data.type,
        note: data.note,
      };

      handleSubmit1(catInput).then((success: boolean) => {
        if (success) {
          console.log('jupiii');
          router.push('/');
        } else {
          alert('Data sa nepodarilo ulozit');
        }
      });
    },
    [handleSubmit1]
  );

  const catTypeOptions = useMemo(() => {
    return Object.values(catTypes)
      .sort()
      .map((item) => {
        return (
          <option value={item} key={item}>
            {t(item || 'CAT_TYPE_NULL')}
          </option>
        );
      });
  }, [catTypes]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <fieldset>
        <FormLegend name="Zakladne informacie" />
        <div className="grid grid-cols-2 gap-10">
          <FormInputWrapper>
            <FormInputLabel name="Meno macky*" />
            <FormInput
              registerRules={{
                ...register('name', {
                  required: { value: true, message: 'Meno macky je povinne' },
                  maxLength: {
                    value: 100,
                    message: 'Meno macky je max do 100 znakov',
                  },
                }),
              }}
              type="text"
              placeholder="Meno macky do 100 znakov"
              errors={errors.name}
            />
            {errors.name && <FormErrorMessage error={errors.name?.message} />}
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name="Prezyvka macky" />
            <FormInput
              registerRules={{ ...register('nickname', { required: false }) }}
              type="text"
            />
          </FormInputWrapper>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <FormInputWrapper>
            <FormInputLabel name="Vek macky" />
            <FormInput
              registerRules={{
                ...register('age', { min: 0.5, max: 30, required: false }),
              }}
              type="number"
              errors={errors.age}
              placeholder="Vek od 0,5 do 30 rokov"
            />
            {errors.age && <FormErrorMessage error="Vek od 0,5 do 30 rokov" />}
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name="Vaha macky" />
            <FormInput
              registerRules={{ ...register('weight', { required: false }) }}
              type="number"
              placeholder="1,5 kg"
            />
          </FormInputWrapper>
        </div>
        <div className="grid grid-cols-2 gap-10 mt-3">
          <FormInputWrapper>
            <FormInputLabel name="Email veterinara" />
            <FormInput
              registerRules={{
                ...register('doctor_email', { required: false }),
              }}
              type="email"
              placeholder="email@email.sk"
            />
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name="Typ macky" />
            <FormSelectBox
              registerRules={{ ...register('type', { required: false }) }}
            >
              {catTypeOptions}
            </FormSelectBox>
          </FormInputWrapper>
        </div>
      </fieldset>
      {/* <fieldset>
          <FormLegend name="Specialne poziadavky" />
        </fieldset>
        <fieldset>
          <FormLegend name="Oblubene jedla" />
        </fieldset> */}
      <fieldset>
        <div className="flex flex-col w-full mt-2">
          <FormInputLabel name="Poznamka" />
          <textarea
            maxLength={500}
            {...register('note', {
              required: false,
              maxLength: {
                value: 500,
                message: 'Maximalne 500 znakov',
              },
            })}
            placeholder="Dodatocne poznamky. Maximalne 500 znakov."
            className="form-textarea w-full mb-3 mt-2 text-purple block border-rounded-base border-gray 
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray"
          ></textarea>
          <span className="text-sm font-light text-gray">
            {watchedNote !== undefined && watchedNote.length <= 500
              ? `Ostava ${500 - watchedNote?.length} znakov z 500`
              : null}
          </span>
          {errors.note && <FormErrorMessage error={errors.note} />}
        </div>
      </fieldset>
      <BackButton url={'/'} />
      <SubmitButton text={submitText} />
    </form>
  );
};

export default CatForm;
