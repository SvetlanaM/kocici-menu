import Modal from 'react-modal';
import SubmitButton from './submit-button';
import NeutralButton from './neutral-button';
import Image from './image';

interface RemoveConfirmationModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onClickAction: () => void;
  rest: any;
}

const RemoveConfirmationModal = ({
  isOpen,
  closeModal,
  rest,
  onClickAction,
}: RemoveConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add product review"
      className="w-full xl-custom:w-2/4 pt-8 pb-5 px-10 m-auto bg-white border-rounded-base center-modal"
    >
      <div className="flex flex-col justify-between text-purple leading-normal">
        <h2 className="font-medium text-2xl">
          Potvrdiť vymazanie mačky {rest} :(
        </h2>
        <div className="flex justify-between items-center mb-5">
          <div className="font-light text-sm w-full pr-3.6">
            Naozaj chcete vymazať mačku {rest}? Vymazanie je trvalé a nie je
            možné ho vrátiť späť.
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
