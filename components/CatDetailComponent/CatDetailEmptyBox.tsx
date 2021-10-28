import Link from 'next/link';
import Image from '../Image';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

export default function CatDetailEmptyBox(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center flex-col min-h-auto items-center py-10 pt-28 lg:pt-28 xl-custom:pt-4 text-center">
      <Image src="/icons/no_cats.svg" height={205} width={150} />
      <h2 className="text-2xl font-medium text-purple-darkest mt-5">
        {t(cs['no_cat_added'])}
      </h2>
      <p className="font-light lg:px-32 text-center pt-3.6 pb-6 text-purple-darkest leading-normal">
        {t(cs['add_cat_long_text'])}
      </p>
      <Link href="/my-cats/new-cat">
        <a className="bg-purple-darkest w-full lg:w-1/4 text-white float-right mb-5 py-1.5 h-10 border-rounded-base font-medium text-center transition duration-500 ease-in hover:bg-yellow-dark">
          {t(cs['add_cat'])}
        </a>
      </Link>
    </div>
  );
}
