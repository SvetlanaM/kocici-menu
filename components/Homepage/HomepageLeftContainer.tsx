import Menu from './Menu';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';
import SubmitButton from '../SubmitButton';

const HomepageLeftContainer = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="w-1/2 py-8 px-8 flex flex-col">
      <Menu />
      <div className="flex justify-center flex-col h-full">
        <h1 className="font-extrabold text-5xl text-purple-darkest leading-none mb-8">
          {t(cs['menu_of_my_cat'])}
          <br />
          {t(cs['menu_cat'])}
        </h1>
        <div className="text-purple-darkest text-lg font-light leading-normal w-3/4 mb-10">
          {t(cs['web_banner_description'])}{' '}
          <span className="text-purple-light">{t(cs['web_banner_span'])}</span>
        </div>
        <SubmitButton
          text={t(cs['register_me'])}
          disabled={false}
          size="w-1/2"
        />
      </div>
    </div>
  );
};

export default HomepageLeftContainer;
