import Title from './Title';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

export default function AboutWrapper(): JSX.Element {
  const { t } = useTranslation();
  return (
    <section className="bg-purple-darkest px-5 lg:px-10 pt-16 pb-14 mt-10 lg:mt-20 text-white text-center w-full">
      <div className="container-width flex items-center flex-col">
        <Title title={'about_project'} color="text-white" />
        <div className="w-full lg:w-3/5 mt-8 text-left lg:text-center">
          {t(cs['about_project_desc'])}

          <p className="text-purple-light mt-10 font-bold leading-normal">
            Sveťa Margetová
          </p>
        </div>
      </div>
    </section>
  );
}
