import Modal from 'react-modal';
import AddProductReviewForm from './add-product-review-form';
import { GetDashboardQuery } from '../graphql/generated/graphql';

interface AddProductReviewModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSaveSuccess: () => void;
  selectCats: GetDashboardQuery['selectCats'];
  selectProducts: GetDashboardQuery['selectProducts'];
}

const AddProductReviewModal = ({
  isOpen,
  closeModal,
  onSaveSuccess,
  selectCats,
  selectProducts,
}: AddProductReviewModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add product review"
      className="w-1/2 py-7 px-10 m-auto bg-white border-rounded-base center-modal"
    >
      <div className="flex justify-between mb-5">
        <h2 className="font-bold text-purple leading-normal text-center">
          Pridat hodnotenie noveho produktu
        </h2>
      </div>
      <AddProductReviewForm
        onBackAction={closeModal}
        selectCats={selectCats}
        selectProducts={selectProducts}
        onSuccess={onSaveSuccess}
      />
    </Modal>
  );
};

export default AddProductReviewModal;
