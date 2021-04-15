import { useCallback, useMemo } from 'react';
import {
  Cat_Insert_Input,
  CatTypeEnum_Enum as catTypes,
} from '../graphql/generated/graphql';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
//pozeram s tym toolom ani neni treba
export type CatInputData = Omit<Cat_Insert_Input, 'id' | 'image_url'>;

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
    formState: { errors },
  } = useForm<CatInputData>();

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
          alert('Data sa nepodarilo poslat');
        }
      });
    },
    [handleSubmit1]
  );

  const catTypeOptions = Object.values(catTypes)
    .sort()
    .map((item) => {
      return (
        <option value={item} key={item}>
          {t(item || 'CAT_TYPE_NULL')}
        </option>
      );
    });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <fieldset>
          <legend className="pb-4 font-light text-gray">
            Základné informácie
          </legend>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col w-full">
              <label className="mb-1">
                <span className="base-medium-text font-light text-purple mb-1">
                  Meno macky*
                </span>
              </label>
              <input
                {...register('name', { required: true, maxLength: 100 })}
                className={`mb-3 mt-2 text-purple block border-rounded-base ${
                  errors.name ? 'border-red-400' : 'border-gray'
                }
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray`}
                type="text"
              ></input>
              <span className="block text-red-400 mb-3">
                {errors.name && 'Meno macky je povinne'}
              </span>
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-1">
                <span className="mt-2 base-medium-text font-light text-purple mb-1">
                  Prezyvka macky
                </span>
              </label>
              <input
                {...register('nickname', { required: false })}
                className="mb-3 mt-2 text-purple block border-rounded-base border-gray 
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray"
                type="text"
              ></input>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col w-full">
              <label className="mb-1">
                <span className="mt-2 base-medium-text font-light text-purple mb-1">
                  Vek macky
                </span>
              </label>
              <input
                {...register('age', { min: 1, max: 30, required: false })}
                placeholder="od 1 do 30 rokov"
                className="w-full mb-3 mt-2 text-purple block border-rounded-base border-gray 
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray"
                type="number"
              ></input>
              {errors.age && 'Vek od 1 do 30 rokov'}
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-1">
                <span className="mt-2 base-medium-text font-light text-purple mb-1">
                  Váha mačky
                </span>
              </label>
              <input
                {...register('weight', { required: false })}
                className="w-full mb-3 mt-2 text-purple block border-rounded-base border-gray 
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray"
                type="number"
              ></input>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <div className="flex flex-col w-full">
              <label className="mb-1">
                <span className="mt-2 base-medium-text font-light text-purple mb-1">
                  Email veterinara
                </span>
              </label>
              <input
                {...register('doctor_email', { required: false })}
                placeholder="email@email.cz"
                type="email"
                className="w-full mb-3 mt-2 text-purple block border-rounded-base border-gray 
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray"
              ></input>
              {errors.doctor_email && 'Email v zlom formate'}
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-1">
                <span className="mt-2 base-medium-text font-light text-purple mb-1">
                  Typ macky
                </span>
              </label>
              <select
                {...register('type', { required: false })}
                className="w-full mb-3 mt-2 text-purple block border-rounded-base border-gray 
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray"
              >
                {catTypeOptions}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend className="pb-4 font-light text-gray">
            Specialne poziadavky
          </legend>
        </fieldset>
        <fieldset>
          <legend className="pb-4 font-light text-gray">Oblubene jedla</legend>
        </fieldset>
        <fieldset>
          <div className="flex flex-col w-full">
            <label className="mb-1">
              <span className="mt-2 base-medium-text font-light text-purple mb-1">
                Poznamka
              </span>
            </label>
            <textarea
              {...register('note', { required: false })}
              placeholder="Dodatocne poznamky"
              className="w-full mb-3 mt-2 text-purple block border-rounded-base border-gray 
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray"
            ></textarea>
          </div>
        </fieldset>
        <button>{submitText}</button>
      </form>
    </>
  );
};

export default CatForm;
