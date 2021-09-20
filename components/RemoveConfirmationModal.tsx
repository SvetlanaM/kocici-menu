import Modal from 'react-modal';
import SubmitButton from './SubmitButton';
import NeutralButton from './NeutralButton';
import Image from './Image';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
interface RemoveConfirmationModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onClickAction: () => void;
  rest: string | number;
}

const RemoveConfirmationModal = ({
  isOpen,
  closeModal,
  rest,
  onClickAction,
}: RemoveConfirmationModalProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      contentLabel="Add product review"
      className="w-full xl-custom:w-2/4 pt-8 pb-5 px-10 m-auto bg-white border-rounded-base center-modal"
    >
      <div className="flex flex-col justify-between text-purple leading-normal">
        <h2 className="font-medium text-2xl">
          {t(cs['remove_confirmation'])} {rest} {t(cs['sad_face'])}
        </h2>
        <div className="flex justify-between items-center mt-5 mb-5">
          <div className="font-light text-sm w-full pr-3.6">
            {t(cs['cat_remove_info'])} {rest}
            {t(cs['cat_remove_detail'])}
          </div>
          <Image src="/icons/cat-trash.svg" height={50} width={100} />
        </div>
        <div className="flex justify-between flex-row pt-1">
          <NeutralButton title="Zrušiť" onClick={closeModal} />
          <SubmitButton
            text="Vymazať"
            size="w-full xl-custom:w-1/4 ml-5 xl-custom:ml-0"
            color="bg-red-500"
            onClick={onClickAction}
            hover="hover:bg-red-800"
          />
        </div>
      </div>
    </Modal>
  );
};

export default RemoveConfirmationModal;
