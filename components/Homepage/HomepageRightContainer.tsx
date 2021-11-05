import Image from '../Image';

export default function HomepageRightContainer(): JSX.Element {
  return (
    <div className="bg-purple-darkest w-1/2 items-center justify-center h-600 hidden lg:flex">
      <Image src="/icons/banner_web.svg" height={390} width={370} />
    </div>
  );
}
