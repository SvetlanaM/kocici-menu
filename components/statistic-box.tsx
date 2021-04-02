import Image from 'next/image';

const StatisticBox = ({ icon, title, desc }) => {
  return (
    <div className="flex pt-4 pb-4 pl-5 bg-gray-light border-rounded-base border-gray_lightest">
      <div>
        <Image src={'/icons/avg_cost.svg'} height={75} width={80} />
      </div>
      <div className="flex-col-base justify-center ml-6 leading-tight">
        <h4 className="mb-1.2 font-semibold text-gray">
          Priemerná mesačná spotreba {title}
        </h4>
        <p className="small-purple-text">1789 CZK {desc}</p>
      </div>
    </div>
  );
};

export default StatisticBox;
