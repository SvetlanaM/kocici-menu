import Modal from 'react-modal';
import AddProductReviewForm from './AddProductReviewForm';
import { GetDashboardQuery } from '../graphql/generated/graphql';
import Image from './Image';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
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
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add product review"
      className="xl-custom:w-2/4 pt-8 pb-3 px-10 m-auto bg-white border-rounded-base w-full h-full xl-custom:h-auto center-modal overflow-x-auto"
    >
      <div className="flex flex-col justify-between text-purple leading-normal">
        <h2 className="font-medium text-2xl pt-10 xl-custom:pt-0">
          {t(cs['new_review'])}
        </h2>
        <div className="flex flex-col xl-custom:flex-row justify-between items-start pt-5 xl-custom:pt-0 xl-custom:items-center">
          <div className="font-light text-sm w-full xl-custom:w-4/6 pr-3.6">
            {t(cs['new_review_modal'])}{' '}
            <span className="text-purple-light">{t(cs['3_steps'])}</span>
            <p className="mt-3">{t(cs['review_rules'])}</p>
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
