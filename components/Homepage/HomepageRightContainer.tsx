import Image from '../Image';

export default function HomepageRightContainer(): JSX.Element {
  return (
    <div className="bg-purple-darkest w-1/2 flex items-center justify-center h-screen">
      <Image src="/icons/banner_web.svg" height={390} width={370} />
    </div>
  );
}
