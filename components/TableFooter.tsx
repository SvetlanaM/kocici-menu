import Link from 'next/link';
import AddProductReviewModal from './AddProductReviewModal';
import { useState } from 'react';
import { GetDashboardQuery } from '../graphql/generated/graphql';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';

interface TableFooterProps {
  selectCats: GetDashboardQuery['selectCats'];
  selectProducts: GetDashboardQuery['selectProducts'];
  onSaveSuccess: () => void;
}

const TableFooter = ({
  selectCats,
  selectProducts,
  onSaveSuccess,
}: TableFooterProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { t } = useTranslation();

  return (
    <div className="w-full flex border-b-1 border-l-1 border-r-1 rounded-b-lg border-gray">
      <div className="flex items-center justify-between w-full">
        <div className="py-3 pl-3.6 base-medium-text text-purple">
          <Link href="/dashboard">
            <a onClick={openModal} className="add-review-btn">
              {t(sk['add_new_review'])}
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

        <div className="pr-3.6 text-sm font-light text-gray text-right">
          <Link href="/products">
            <a className="hover:text-gray-dark">{t(sk['show_all'])}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TableFooter;
