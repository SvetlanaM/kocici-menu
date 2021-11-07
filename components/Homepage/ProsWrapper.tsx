import Pros from './Pros';

export default function ProsWrapper(): JSX.Element {
  return (
    <div className="grid grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 gap-12 grid-flow-col mt-16 lg:mt-16 text-center text-purple-darkest text-md font-light leading-normal container-width pt-14 custom-lg:pt-0">
      <Pros
        imageAlt="pros_alt1"
        imageUrl="/icons/pros1.svg"
        title="pros1"
        description="pros_desc1"
      />
      <Pros
        imageAlt="pros_alt2"
        imageUrl="/icons/pros2.svg"
        title="pros2"
        description="pros_desc2"
      />
      <Pros
        imageAlt="pros_alt3"
        imageUrl="/icons/pros3.svg"
        title="pros3"
        description="pros_desc3"
      />
    </div>
  );
}
