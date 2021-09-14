import Link from 'next/link';
import Image from './Image';
import SubmitButton from './SubmitButton';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';
export default function CatDetailEmptyBox() {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center flex-col min-h-auto items-center py-10">
      <Image src="/icons/no_cats.svg" height={205} width={150} />
      <h2 className="text-2xl font-medium text-purple-darkest mt-5">
        {t(sk['no_cat_added'])}
      </h2>
      <p className="font-light px-32 text-center pt-3.6 pb-4 text-purple-darkest leading-normal">
        {t(sk['add_cat_long_text'])}
      </p>
      <Link href="/my-cats/new-cat">
        <a className="bg-purple-darkest w-1/4 text-white float-right mb-5 py-1.5 h-10 border-rounded-base font-medium text-center transition duration-500 ease-in hover:bg-yellow-dark">
          {t(sk['add_cat'])}
        </a>
      </Link>
    </div>
  );
}
