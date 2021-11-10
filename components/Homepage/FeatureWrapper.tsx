import Feature from './Feature';
import FeatureImage from './FeatureImage';
import Title from './Title';

export default function FeatureWrapper(): JSX.Element {
  return (
    <div className="mt-10 lg:mt-20">
      <Title title={'what_we_offer'} color="text-purple-darkest" />
      <div className="lg:mt-10 grid grid-rows-1 lg:grid-cols-2 lg:grid-flow-row lg:auto-rows-max flex items-center py-10 container-width">
        <Feature title={'feature1'} description={'feature_desc1'} />
        <FeatureImage
          imageUrl={'/icons/feature1.webp'}
          width={615}
          height={250}
          alt="feature_alt1"
        />
      </div>
      <div className="mt-3 lg:mt-20 bg-gray-light py-10 lg:py-20">
        <div className="container-width grid grid-rows-1 lg:grid-cols-2 lg:gap-12 flex items-center">
          <FeatureImage
            imageUrl={'/icons/feature2.svg'}
            width={500}
            height={280}
            extraStyling={'w-full mb-10 lg:mb-0 md:w-2/3 mx-auto'}
            alt="feature_alt2"
          />
          <Feature title={'feature2'} description={'feature_desc2'} />
        </div>
      </div>
      <div className="mt-10 lg:mt-20 grid grid-cols-1 flex flex-row items-center justify-center text-center w-full container-width py-10 custom-lg:py-0">
        <Feature
          title={'feature3'}
          width="w-full lg:w-2/5"
          flexType="flex-row"
        />
        <FeatureImage
          imageUrl={'/icons/feature3.webp'}
          width={900}
          extraStyling={'pt-3 lg:pt-10 mx-auto'}
          alt="feature_alt3"
          height={609}
        />
      </div>
      <div className="my-10 lg:my-32 grid grid-rows-1 lg:grid-cols-2 grid-flow-row auto-rows-max flex items-center container-width">
        <Feature title={'feature4'} description={'feature_desc4'} />
        <FeatureImage
          imageUrl={'/icons/feature4.svg'}
          width={200}
          height={100}
          extraStyling={'w-full md:w-1/2 mx-auto mt-10 lg:mt-0'}
          alt="feature_alt4"
        />
      </div>
    </div>
  );
}
