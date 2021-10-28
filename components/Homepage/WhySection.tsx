import WhySectionWrapperProps from './WhySectionWrapper';

export default function WhySection(): JSX.Element {
  return (
    <div className="bg-gray-light pt-10 lg:pt-12 pb-10 flex items-center px-6 lg:px-10 grid grid-rows-2 md:grid-rows-1 lg:grid-cols-2 gap-12 text-purple-darkest flex items-stretch">
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
  );
}
