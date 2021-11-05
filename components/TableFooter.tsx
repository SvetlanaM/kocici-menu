import Link from 'next/link';
import AddProductReviewModal from './AddProductReviewModal';
import { useState } from 'react';
import {
  GetDashboardQuery,
  SelectCatFieldsFragment,
} from '../graphql/generated/graphql';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';

type CatSelectOptions = {
  id: SelectCatFieldsFragment['id'];
  name: SelectCatFieldsFragment['name'];
  image_url: SelectCatFieldsFragment['image_url'];
  reviews: SelectCatFieldsFragment['reviews'];
};
interface TableFooterProps {
  selectCats: Array<CatSelectOptions>;
  selectProducts: GetDashboardQuery['selectProducts'];
  onSaveSuccess: () => void;
}

const TableFooter = ({
  selectCats,
  selectProducts,
  onSaveSuccess,
}: TableFooterProps): JSX.Element => {
  const { t } = useTranslation();
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full flex xl-custom:border-b-1 xl-custom:border-l-1 xl-custom:border-r-1 xl-custom:rounded-b-lg xl-custom:border-gray">
      <div className="flex items-center justify-between w-full">
        <div className="pt-3 md:py-3 pl-3.6 base-medium-text text-purple">
          <Link href="/dashboard">
            <a
              onClick={openModal}
              className="add-review-btn hover:text-purple-light"
            >
              {t(cs['add_new_review'])}
            </a>
          </Link>
          <AddProductReviewModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            selectCats={selectCats}
            selectProducts={selectProducts}
            onSaveSuccess={onSaveSuccess}
          />
        </div>

        <div className="pr-3.6 text-sm font-light text-gray text-right hidden md:flex">
          <Link href="/products">
            <a className="hover:text-gray-dark">{t(cs['show_all'])}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TableFooter;
