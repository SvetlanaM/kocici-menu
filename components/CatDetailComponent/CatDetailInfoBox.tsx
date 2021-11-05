import Image from '../Image';
import {
  CatFieldsFragmentFragment,
  DeleteCatMutation,
  DeleteCatMutationVariables,
} from '../../graphql/generated/graphql';
import CatBasicInfo from '../CatDetailComponent/CatBasicInfo';
import Link from 'next/link';
import RemoveConfirmationModal from '../RemoveConfirmationModal';
import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CAT } from '../../graphql/mutations';
import { getUser } from '../../utils/user';
import DoctorExportLink from '../DoctorExportLink';
import { BackLinkType } from '../../utils/backlinks';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';
import { getRefetchQueries } from '../../graphql/refetchQueries';
interface CatDetailInfoBoxProps {
  data: CatFieldsFragmentFragment;
  onEditCat: () => void;
}
const CatDetailInfoBox = ({
  data,
  onEditCat,
}: CatDetailInfoBoxProps): JSX.Element => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [catId, setCatId] = useState<number>(data.id);
  const { t } = useTranslation();
  const refetchQueries = getRefetchQueries(getUser(), [
    'CATS_DETAIL_QUERY',
    'CATS_QUERY',
    'DASHBOARD_QUERY',
    'USER_STATS_QUERY',
    'REVIEWS_QUERY',
  ]);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [deleteCat] = useMutation<
    DeleteCatMutation,
    DeleteCatMutationVariables
  >(DELETE_CAT, {
    refetchQueries: refetchQueries,
  });

  const deleteMyCat = useCallback(
    async (catMainId: number) => {
      try {
        const result = await deleteCat({
          variables: {
            id: catMainId,
          },
        });
        if (result.data?.delete_Cat_by_pk.id) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    },
    [deleteCat]
  );

  const afterDeletion = useCallback(() => {
    deleteMyCat(catId).then(() => closeModal());
  }, [catId]);

  return (
    <div className="grid xl-custom:grid-cols-4 xl-custom:grid-rows-0 divide-y xl-custom:divide-y-0 xl-custom:divide-x gap-y-2 divide-gray_lightest border-rounded-base border-gray w-full xl-custom:w-9/12">
      <div className="flex small-purple-text text-left my-cat">
        <div className="flex flex-row px-3 align-middle py-3 justify-between cat-detail-box">
          <CatBasicInfo cat={data} />
        </div>
      </div>
      <div className="flex small-purple-text text-left my-cat">
        <div className="px-5">
          <ul className="small-light-text justify-evenly flex flex-col cat-detail-box">
            <li>
              <span className="text-gray">{t(cs['nickname'])}:</span> --
            </li>
            <li>
              <span className="text-gray">{t(cs['gender'])}:</span>{' '}
              {t(cs[data.gender]) || '--'}
            </li>
            <li>
              <span className="text-gray">{t(cs['color'])}:</span>{' '}
              {data.color || '--'}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex small-purple-text text-left my-cat">
        <div className="px-5">
          <ul className="small-light-text justify-evenly flex flex-col cat-detail-box">
            <li>
              <span className="text-gray">{t(cs['weight'])}:</span>{' '}
              {data.weight || '--'} kg
            </li>
            <li>
              <span className="text-gray">{t(cs['doctor_email'])}:</span>
              {data.doctor_email ? (
                <DoctorExportLink
                  catContactData={{
                    email: data.doctor_email,
                    age: data.age,
                    weight: data.weight,
                    name: data.name,
                    gender: data.gender,
                  }}
                >
                  <a className="hover:text-purple-light"> {t(cs['write'])}</a>
                </DoctorExportLink>
              ) : (
                ' --'
              )}
            </li>
            <li>
              <span className="text-gray">{t(cs['daily_food'])}:</span>{' '}
              {data.daily_food || '--'} g
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-flow-row xl-custom:grid-flow-col gap-5 xl-custom:gap-0 py-5 xl-custom:py-0 xl-custom:grid-flow-row xl-custom:divide-y border-gray">
        <div className="edit-box flex flex-row items-center justify-start pl-3">
          <Image
            src="/icons/change_stars.svg"
            placeholder="/default_cat.svg"
            height={20}
            width={20}
          />
          <p className="uppercase text-gray text-sm ml-2 font-light">
            <Link
              href={{
                pathname: `/my-cats/${data.slug}`,
                query: { backlink: BackLinkType.MY_CATS },
              }}
              //as={`/my-cats/${encodeURIComponent(data.slug)}`}
            >
              <a className="hover:text-gray-dark" onClick={onEditCat}>
                {t(cs['edit_cat'])}
              </a>
            </Link>
          </p>
        </div>
        <div className="delete-box flex flex-row items-center justify-start pl-3">
          <Image src="/icons/delete.svg" height={20} width={20} />
          <p className="uppercase text-gray text-sm ml-2 font-light">
            <Link href="/my-cats">
              <a
                className="hover:text-gray-dark"
                onClick={() => {
                  openModal();
                  setCatId(data.id);
                }}
              >
                {t(cs['delete_cat'])}
              </a>
            </Link>
          </p>
          <RemoveConfirmationModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            rest={data.name}
            onClickAction={afterDeletion}
          />
        </div>
      </div>
    </div>
  );
};

export default CatDetailInfoBox;
