import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Cat_Insert_Input,
  Cat_Set_Input,
  CatTypeEnum_Enum as catTypes,
  CatFieldsFragmentFragment,
} from '../graphql/generated/graphql';
import { useForm, Controller } from 'react-hook-form';
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
import { getUser } from '../utils/user';
import sk from '../public/locales/sk/common.json';
import UploadImage from './upload-image';
import { DEFAULT_CAT_IMAGE as defaultImage } from '../utils/constants';
import { useS3Upload } from 'next-s3-upload';

export type CatInputData = Omit<Cat_Insert_Input, 'CatTypeEnum'>;
interface CatFormInterface {
  handleSubmit1: {
    (cat: CatInputData | Cat_Set_Input): Promise<boolean>;
  };
  submitText: string;
  catData?: CatFieldsFragmentFragment;
}

const CatForm = ({ handleSubmit1, submitText, catData }: CatFormInterface) => {
  const catImage = useMemo<string>(
    () => (catData && catData.image_url ? catData.image_url : defaultImage),
    [catData]
  );
  const [imageUrl, setImageUrl] = useState<string>(catImage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const { t } = useTranslation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const noteInputName = 'note';
  const watchedNote: string | undefined = watch(noteInputName);

  const handleFileChange = async (file: File) => {
    setIsLoading(true);
    if (checkFileType(file)) {
      let { url } = await uploadToS3(file);
      setImageUrl(url);
      setIsLoading(false);
    } else {
      alert('Nepodporovaný formát');
    }
  };

  const fileTypes = ['png', 'jpg', 'gif', 'webp', 'jpeg'];
  const checkFileType = (file: File) => {
    let value = file.name;
    let fileType = value.substring(value.lastIndexOf('.') + 1, value.length);
    if (fileTypes.indexOf(fileType) > -1) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = useCallback(
    (data) => {
      const catInput: CatInputData | Cat_Set_Input = {
        age: Number(data.age),
        name: data.name,
        user_id: getUser(),
        doctor_email: data.doctor_email,
        nickname: data.nickname,
        weight: Number(data.weight),
        type: data.type,
        note: data.note,
        color: data.color,
        daily_food: Number(data.daily_food),
        id: catData ? catData.id : null,
        image_url: imageUrl,
      };

      handleSubmit1(catInput).then((success: boolean) => {
        if (success) {
          console.log('jupiii2');
          if (catData) {
            router.push('/my-cats');
          } else {
            router.push('/');
          }
        } else {
          alert('Data sa nepodarilo ulozit');
        }
      });
    },
    [handleSubmit1, imageUrl]
  );

  const catTypeOptions = useMemo(() => {
    let newEnum = ['CAT_TYPE_NULL', ...Object.values(catTypes).sort()];
    return newEnum.map((item) => {
      return (
        <option value={item} key={item}>
          {t(sk[item] || sk['CAT_TYPE_NULL'])}
        </option>
      );
    });
  }, [catTypes]);

  useEffect(() => {
    if (catData) {
      let fields = Object.keys(catData).slice(1);
      for (let field of fields) {
        setValue(field, catData[field]);
      }
    }
  }, [catData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <fieldset>
        <FormLegend name="Základné informácie" />
        <div>
          <UploadImage
            imageUrl={imageUrl}
            openFileDialog={openFileDialog}
            isLoading={isLoading}
          />
          <Controller
            name="cat_image"
            control={control}
            rules={{
              required: false,
              validate: {
                checkFileType: checkFileType,
              },
            }}
            render={() => (
              <FileInput
                onChange={handleFileChange}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
              />
            )}
            {...(errors.cat_image &&
              errors.cat_image.type === 'checkFileType' && (
                <FormErrorMessage
                  error={`Nahrajte subor v jednom z tychto formatov ${fileTypes}`}
                />
              ))}
          />
        </div>
        <div className="grid grid-cols-2 gap-10">
          <FormInputWrapper>
            <FormInputLabel name="Meno mačky*" />
            <FormInput
              registerRules={{
                ...register('name', {
                  required: { value: true, message: 'Meno mačky je povinné' },
                  maxLength: {
                    value: 100,
                    message: 'Meno mačky je max do 100 znakov',
                  },
                }),
              }}
              type="text"
              placeholder="Meno mačky do 100 znakov"
              errors={errors.name}
            />
            {errors.name && <FormErrorMessage error={errors.name?.message} />}
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name="Prezývka mačky" />
            <FormInput
              registerRules={{ ...register('nickname', { required: false }) }}
              type="text"
              // defaultValue={catData.nickname}
            />
          </FormInputWrapper>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <FormInputWrapper>
            <FormInputLabel name="Vek mačky" />
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
            <FormInputLabel name="Farba mačky" />
            <FormInput
              registerRules={{ ...register('color', { required: false }) }}
              type="text"
            />
          </FormInputWrapper>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <FormInputWrapper>
            <FormInputLabel name="Váha mačky v kg" />
            <FormInput
              registerRules={{ ...register('weight', { required: false }) }}
              type="number"
              placeholder="1,5 kg"
            />
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name="Denná dávka v g" />
            <FormInput
              registerRules={{ ...register('daily_food', { required: false }) }}
              type="number"
              placeholder="700g/denne"
            />
          </FormInputWrapper>
        </div>
        <div className="grid grid-cols-2 gap-10 mt-3">
          <FormInputWrapper>
            <FormInputLabel name="Email veterinára" />
            <FormInput
              registerRules={{
                ...register('doctor_email', { required: false }),
              }}
              type="email"
              placeholder="email@email.sk"
            />
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name="Typ mačky" />
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
          <FormInputLabel name="Poznámka" />
          <textarea
            maxLength={500}
            {...register('note', {
              required: false,
              maxLength: {
                value: 500,
                message: 'Maximálne 500 znakov',
              },
            })}
            placeholder="Dodatočné poznámky. Maximálne 500 znakov."
            className="form-textarea w-full mb-3 mt-2 text-purple block border-rounded-base border-gray 
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray"
          ></textarea>
          <span className="text-sm font-light text-gray">
            {watchedNote !== undefined && watchedNote.length <= 500
              ? `Ostáva ${500 - watchedNote?.length} znakov z 500`
              : null}
          </span>
          {errors.note && <FormErrorMessage error={errors.note} />}
        </div>
      </fieldset>
      <div className="mt-8">
        <BackButton url={'/'} />
        <SubmitButton text={submitText} disabled={false} size="w-1/4" />
      </div>
    </form>
  );
};

export default CatForm;
