import Modal from 'react-modal'
import AddProductReviewForm from "./add-product-review-form";
import { GetDashboardQuery } from "../graphql/generated/graphql";

interface AddProductReviewModalProps {
    isOpen: boolean;
    closeModal: () => void;
    onSaveSuccess: () => void;
    selectCats: GetDashboardQuery['selectCats'];
    selectProducts: GetDashboardQuery['selectProducts'];
}

const AddProductReviewModal = ({ isOpen, closeModal, onSaveSuccess, selectCats, selectProducts }: AddProductReviewModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Add product review"
        >
            <button onClick={closeModal}>close</button>
            <AddProductReviewForm onBackAction={closeModal} selectCats={selectCats} selectProducts={selectProducts} onSuccess={onSaveSuccess} />
        </Modal>
    );
};

export default AddProductReviewModal;