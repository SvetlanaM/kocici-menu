import Modal from 'react-modal';
import AddProductReviewForm from './add-product-review-form';
import { GetDashboardQuery } from '../graphql/generated/graphql';
import Image from '../components/image';
interface AddProductReviewModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSaveSuccess: () => void;
  selectCats: GetDashboardQuery['selectCats'];
  selectProducts: GetDashboardQuery['selectProducts'];
  index?: number;
}

const AddProductReviewModal = ({
  isOpen,
  closeModal,
  onSaveSuccess,
  selectCats,
  selectProducts,
  index,
}: AddProductReviewModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add product review"
      className="xl-custom:w-2/4 pt-9 pb-7 px-10 m-auto bg-white border-rounded-base w-full h-screen xl-custom:h-auto xl-custom:center-modal overflow-auto"
    >
      <div className="flex flex-col justify-between text-purple leading-normal">
        <h2 className="font-medium text-2xl">
          Pridať hodnotenie nového produktu
        </h2>
        <div className="flex flex-col xl-custom:flex-row justify-between items-start pt-10 xl-custom:pt-0 xl-custom:items-center">
          <div className="font-light text-sm w-full xl-custom:w-4/6 pr-3.6">
            Hodnotenie nového produktu v{' '}
            <span className="text-purple-light">3 super easy krokoch.</span>
            <p className="mt-3">
              Hodnotenie je možné pridať iba pre produkt, ktorý mačka nemá
              hodnotený, inak je editovateľný v detaily mačky.
            </p>
          </div>
          <div className="w-full xl-custom:w-2/6 mt-5 xl-custom:mt-0">
            <Image
              src={'/icons/new-review-icon.svg'}
              height={170}
              width={247}
            />
          </div>
        </div>
      </div>
      <AddProductReviewForm
        onBackAction={closeModal}
        selectCats={selectCats}
        selectProducts={selectProducts}
        onSuccess={onSaveSuccess}
        index={index}
      />
    </Modal>
  );
};

export default AddProductReviewModal;
