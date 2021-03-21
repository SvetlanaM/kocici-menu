import Image from 'next/image';

const StatisticSection = ({ icon, title, desc }) => {
  return (
    <div className="bg-gray-light py-1.5 border rounded-1.2xl border-gray_lightest flex pt-4 pb-4 pl-5">
      <div>
        <Image src={'/icons/avg_cost.svg'} height={75} width={80} />
      </div>
      <div className="flex flex-col justify-center ml-6 leading-tight">
        <h4 className="text-gray font-semibold mb-1.2">
          Priemerná mesačná spotreba {title}
        </h4>
        <p className="text-purple text-sm">1789 CZK {desc}</p>
      </div>
    </div>
  );
};

export default StatisticSection;
