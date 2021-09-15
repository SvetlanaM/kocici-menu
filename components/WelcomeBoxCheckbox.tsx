import Image from './Image';
import cs from '../public/locales/cs/common.json';
import { useTranslation } from 'react-i18next';

interface WelcomeBoxCheckboxProps {
  name: string;
  registerRules: any;
}

export default function WelcomeBoxCheckbox({
  name,
  registerRules,
}: WelcomeBoxCheckboxProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        name={name}
        value={name}
        {...registerRules}
        className="opacity-0 absolute w-200 h-200 cursor-pointer"
      />
      <div className="bg-white border-rounded-base w-200 h-200 flex flex-col justify-center items-center  focus-within:border-purple">
        <Image src={`/icons/${name}.svg`} />
        <h3 className="mt-3.6 text-purple-darkest font-normal">
          {t(cs[name])}
        </h3>
      </div>
    </div>
  );
}
