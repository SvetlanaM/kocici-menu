import Menu from './Menu';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';
import SubmitButton from '../SubmitButton';

const HomepageLeftContainer = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="w-full lg:w-1/2 py-5 lg:py-8 lg:flex lg:flex-col">
      <div className="container-left-half-width">
        <Menu />
      </div>
      <div className="container-left-half-width flex justify-center flex-col h-auto lg:h-full mt-8 lg:mt-0 pl-0">
        <h1 className="font-extrabold text-4xl lg:text-5xl text-purple-darkest leading-none mb-6">
          {t(cs['menu_of_my_cat'])}

          <p className="">{t(cs['menu_cat'])}</p>
        </h1>
        <div className="text-purple-darkest text-md font-light leading-normal w-full lg:w-3/4 mb-8">
          {t(cs['web_banner_description'])}{' '}
          <span className="text-purple-light">{t(cs['web_banner_span'])}</span>
        </div>
        <SubmitButton
          text={t(cs['register_me'])}
          disabled={false}
          size="w-full lg:w-1/2"
        />
      </div>
    </div>
  );
};

export default HomepageLeftContainer;
