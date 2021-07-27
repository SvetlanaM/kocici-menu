import Link from 'next/link';
import Image from './Image';
import SubmitButton from './SubmitButton';

export default function CatDetailEmptyBox() {
  return (
    <div className="flex justify-center flex-col min-h-auto items-center py-10">
      <Image src="/icons/no_cats.svg" height={205} width={150} />
      <h2 className="text-2xl font-medium text-purple-darkest mt-5">
        Zatiaľ nemáte pridanú žiadnu mačku.
      </h2>
      <p className="font-light px-32 text-center pt-3.6 pb-4 text-purple-darkest leading-normal">
        Začnite pridaním vašich mačiek, kde je možné priamo nahrať aj obľúbené
        produkty a iné detaily. Zaberie to chvíľku a potom môžete naplno
        využívať benefity a starostlivosť o vaše mačky.
      </p>
      <Link href="/my-cats/new-cat">
        <a className="bg-purple-darkest w-1/4 text-white float-right mb-5 py-1.5 h-10 border-rounded-base font-medium text-center transition duration-500 ease-in hover:bg-yellow-dark">
          Pridať novú mačku
        </a>
      </Link>
    </div>
  );
}
