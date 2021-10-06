import WhySectionWrapperProps from './WhySectionWrapper';

export default function WhySection(): JSX.Element {
  return (
    <div className="bg-gray-light pt-14 pb-10 flex items-center px-10 grid grid-cols-2 gap-12 text-purple-darkest">
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
