import Link from 'next/link';
import AddProductReviewModal from './AddProductReviewModal';
import { useState } from 'react';
import { GetDashboardQuery } from '../graphql/generated/graphql';

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

  return (
    <tfoot>
      <tr>
        <td className="py-3 pl-3.6 base-medium-text" colSpan={5}>
          <Link href="/dashboard">
            <a onClick={openModal}>+ Pridať hodnotenie nového produktu</a>
          </Link>
          <AddProductReviewModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            selectCats={selectCats}
            selectProducts={selectProducts}
            onSaveSuccess={onSaveSuccess}
          />
        </td>
        <td className="pr-3.6 text-sm font-light text-gray text-right">
          <Link href="/products">
            <a>Zobraziť všetky</a>
          </Link>
        </td>
      </tr>
    </tfoot>
  );
};

export default TableFooter;
