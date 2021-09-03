import Image from './Image';
import {
  CatDetailFieldsFragmentFragment,
  DeleteCatMutation,
  DeleteCatMutationVariables,
} from '../graphql/generated/graphql';
import CatBasicInfo from './CatBasicInfo';
import Link from 'next/link';
import RemoveConfirmationModal from './RemoveConfirmationModal';
import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CAT } from '../graphql/mutations';
import {
  CATS_DETAIL_QUERY,
  CATS_QUERY,
  DASHBOARD_QUERY,
  REVIEWS_QUERY,
  USER_STATS_QUERY,
} from '../graphql/queries';
import { TIP_LIMIT } from '../utils/constants';
import { getUser } from '../utils/user';
import DateFormatObject from '../utils/getFormatDate';
import DoctorExportLink from './DoctorExportLink';
import { BackLinkType } from "../utils/backlinks";
interface CatDetailInfoBoxProps {
  data: CatDetailFieldsFragmentFragment;
}
const CatDetailInfoBox = ({ data }: CatDetailInfoBoxProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [catId, setCatId] = useState<number>(data.id);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const lastWeek = DateFormatObject().lastWeek();

  const [deleteCat] = useMutation<
    DeleteCatMutation,
    DeleteCatMutationVariables
  >(DELETE_CAT, {
    refetchQueries: [
      {
        query: CATS_DETAIL_QUERY,
        variables: {
          user_id: getUser(),
          limit: 5,
          withProducts: true,
          limitProducts: 5,
          brand_type: 'Feringa',
        },
      },
      {
        query: CATS_QUERY,
        variables: {
          withProducts: true,
          user_id: getUser(),
          limit: 2,
        },
      },
      {
        query: DASHBOARD_QUERY,
        variables: {
          limitTips: TIP_LIMIT,
          user_id: getUser(),
        },
      },
      {
        query: USER_STATS_QUERY,
        variables: {
          user_id: getUser(),
          updated_at: lastWeek,
        },
      },
      {
        query: REVIEWS_QUERY,
        variables: {
          user_id: getUser(),
        },
      },
    ],
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
        console.log(e);
        return false;
      }
    },
    [deleteCat]
  );

  const afterDeletion = useCallback(() => {
    deleteMyCat(catId).then(() => closeModal());
  }, [catId]);

  return (
    <div className="grid xl-custom:grid-cols-4 xl-custom:grid-rows-0 divide-y xl-custom:divide-y-0 xl-custom:divide-x gap-y-2 divide-gray_lightest border-rounded-base border-gray w-9/12">
      <div className="flex small-purple-text text-left my-cat">
        <div className="flex flex-row px-3 align-middle py-3 justify-between cat-detail-box">
          <CatBasicInfo cat={data} />
        </div>
      </div>
      <div className="flex small-purple-text text-left my-cat">
        <div className="px-5">
          <ul className="small-light-text justify-evenly flex flex-col cat-detail-box">
            <li>
              <span className="text-gray">Prezyvka:</span> --
            </li>
            <li>
              <span className="text-gray">Pohlavie:</span> {data.gender || '--'}
            </li>
            <li>
              <span className="text-gray">Farba:</span> {data.color || '--'}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex small-purple-text text-left my-cat">
        <div className="px-5">
          <ul className="small-light-text justify-evenly flex flex-col cat-detail-box">
            <li>
              <span className="text-gray">Váha:</span> {data.weight || '--'} kg
            </li>
            <li>
              <span className="text-gray">Email doktora:</span>
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
                  <a> Napísať</a>
                </DoctorExportLink>
              ) : (
                ' --'
              )}
            </li>
            <li>
              <span className="text-gray">Denná dávka:</span>{' '}
              {data.daily_food || '--'} g
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-flow-col py-5 xl-custom:py-0 xl-custom:grid-flow-row xl-custom:divide-y border-gray">
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
                  pathname: "/my-cats/[slug]",
                  query: { slug: data.slug, backlink: BackLinkType.MY_CATS }
                }}
                //as={`/my-cats/${encodeURIComponent(data.slug)}`}
            >
              Upraviť mačku
            </Link>
          </p>
        </div>
        <div className="delete-box flex flex-row items-center justify-start pl-3">
          <Image src="/icons/delete.svg" height={20} width={20} />
          <p className="uppercase text-gray text-sm ml-2 font-light">
            <Link href="/my-cats">
              <a
                onClick={() => {
                  openModal();
                  setCatId(data.id);
                }}
              >
                Vymazať mačku
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
