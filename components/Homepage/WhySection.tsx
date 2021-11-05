import WhySectionWrapperProps from './WhySectionWrapper';

export default function WhySection(): JSX.Element {
  return (
    <div className="bg-gray-light pt-16 xl-custom:pt-10 pb-8 xl-custom:pb-10 px-6 lg:px-0 text-purple-darkest">
      <div className="container-width flex items-center grid grid-rows-2 md:grid-rows-1 lg:grid-cols-2 gap-12 flex items-stretch">
        <WhySectionWrapperProps
          src="/icons/avg_cost.svg"
          title="why_1"
          description="why_1_desc"
        />
        <WhySectionWrapperProps
          src="/icons/why_icon2.svg"
          title="why_2"
          description="why_2_desc"
        />
      </div>
    </div>
  );
}
