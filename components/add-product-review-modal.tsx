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
      className="w-2/4 pt-9 pb-7 px-10 m-auto bg-white border-rounded-base center-modal"
    >
      <div className="flex flex-col justify-between text-purple leading-normal">
        <h2 className="font-medium text-2xl">
          Pridat hodnotenie noveho produktu
        </h2>
        <div className="flex justify-between items-center">
          <div className="font-light text-sm w-4/6 pr-3.6">
            Hodnotenie nového produktu v{' '}
            <span className="text-purple-light">3 super easy krokoch.</span>
            <p className="mt-3">
              Hodnotenie je mozne pridat iba pre produkt, ktory macka nema
              hodnoteny, inak je editovatelny v detaily macky.
            </p>
          </div>
          <div className="w-2/6">
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
      />
    </Modal>
  );
};

export default AddProductReviewModal;
