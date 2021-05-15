import Image from '../components/image';

const CatDetailInfoBox = (data) => {
  return (
    <div className="grid grid-cols-4 divide-x divide-gray_lightest border-rounded-base border-gray">
      <div className="flex small-purple-text text-left my-cat">
        <div className="flex flex-row px-3 align-middle items-center justify-between cat-detail-box">
          <Image src="/icons/default.svg" />
          <div className="flex-col-base ml-3">
            <h4>Stacy</h4>
            <p className="small-light-text">domaca</p>
            <p className="small-light-text text-gray">4 roky</p>
          </div>
        </div>
      </div>
      <div className="flex small-purple-text text-left my-cat">
        <div className="px-5">
          <ul className="small-light-text justify-evenly flex flex-col cat-detail-box">
            <li>
              <span className="text-gray">Pohlavie:</span> Macka
            </li>
            <li>
              <span className="text-gray">Prezyvka:</span> Stacy 2
            </li>
            <li>
              <span className="text-gray">Farba:</span> cierno-biela
            </li>
          </ul>
        </div>
      </div>
      <div className="flex small-purple-text text-left my-cat">
        <div className="px-5">
          <ul className="small-light-text justify-evenly flex flex-col cat-detail-box">
            <li>
              <span className="text-gray">Vaha:</span> 7 kg
            </li>
            <li>
              <span className="text-gray">Email doktora:</span> --
            </li>
            <li>
              <span className="text-gray">Denna davka:</span> 2,5 kg
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-flow-row divide-y border-gray">
        <div className="edit-box flex flex-row items-center justify-start pl-3">
          <Image src="/icons/change_stars.svg" height={20} width={20} />
          <p className="uppercase text-gray text-sm ml-2 font-light">
            Upravit macku
          </p>
        </div>
        <div className="delete-box flex flex-row items-center justify-start pl-3">
          <Image src="/icons/delete.svg" height={20} width={20} />
          <p className="uppercase text-gray text-sm ml-2 font-light">
            Vymazat macku
          </p>
        </div>
      </div>
    </div>
  );
};

export default CatDetailInfoBox;
