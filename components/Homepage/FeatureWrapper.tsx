import Feature from './Feature';
import FeatureImage from './FeatureImage';
import Title from './Title';

export default function FeatureWrapper(): JSX.Element {
  return (
    <div className="mt-20">
      <Title title={'what_we_offer'} color="text-purple-darkest" />
      <div className="px-10 mt-10 grid grid-cols-2 grid-flow-row auto-rows-max flex items-center py-10">
        <Feature title={'feature1'} description={'feature_desc1'} />
        <FeatureImage
          imageUrl={'/icons/feature1.png'}
          width={615}
          alt="feature_alt1"
        />
      </div>
      <div className="mt-20 grid grid-cols-2 gap-12 flex items-center bg-gray-light py-20">
        <FeatureImage
          imageUrl={'/icons/feature2.svg'}
          width={500}
          height={280}
          extraStyling={'w-2/3 mx-auto'}
          alt="feature_alt2"
        />
        <Feature title={'feature2'} description={'feature_desc2'} />
      </div>
      <div className="mt-20 grid grid-cols-1 flex flex-row items-center justify-center text-center w-full">
        <Feature title={'feature3'} width="w-2/5" flexType="flex-row" />
        <FeatureImage
          imageUrl={'/icons/feature3.png'}
          width={900}
          extraStyling={'pt-10 mx-auto'}
          alt="feature_alt3"
        />
      </div>
      <div className="my-32 grid grid-cols-2 grid-flow-row auto-rows-max flex items-center px-10">
        <Feature title={'feature4'} description={'feature_desc4'} />
        <FeatureImage
          imageUrl={'/icons/feature4.svg'}
          width={200}
          height={100}
          extraStyling={'w-1/2 mx-auto'}
          alt="feature_alt4"
        />
      </div>
    </div>
  );
}
