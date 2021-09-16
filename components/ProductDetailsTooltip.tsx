import i18next from 'i18next';
import { ReviewFieldsFragmentFragment } from '../graphql/generated/graphql';
import setUppercaseTitle from '../utils/setUppercaseTitle';
import Image from './Image';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
i18next.init({
  lng: 'cs',
  debug: false,
  resources: {
    sk: {
      translation: {
        meal: '% mesa',
        meal_type: 'Typ mesa',
        plant_type: 'Rastlinne zlozky',
        other_type: 'Ostatne zlozky',
        note: 'Dalsie suroviny',
        daily_food: 'Doporucena denna davka',
        conservants: 'Konzervanty',
        feeding: 'Dorucene davkovanie',
        ingredient_name: 'Ingrediencie',
      },
    },
    cs: {
      translation: {
        meal: '% masa',
        meal_type: 'Typ masa',
        plant_type: 'Rostlinné složky',
        other_type: 'Ostatní složky',
        note: 'Další suroviny',
        daily_food: 'Doporučená denní dávka',
        conservants: 'Konzervanty',
        feeding: 'Doporučené dávkování',
        ingredient_name: 'Ingredience',
      },
    },
  },
});

interface ProductDetailsTooltipBoxProps {
  data: ReviewFieldsFragmentFragment['product'];
}

interface ToolTipBodyProps {
  itemName: string;
  item: string;
}

const ToolTipBody = ({ itemName, item }: ToolTipBodyProps) => {
  const { t } = useTranslation();
  return (
    <div className="w-full px-4 py-3 flex flex-col text-xs">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xs">{itemName}</h3>
          <p
            className="text-gray pt-1 text-xs"
            dangerouslySetInnerHTML={{
              __html: item || '--',
            }}
          ></p>
        </div>
        {itemName === t(cs['avg_review_zoohit']) ? (
          <Image src={getQualityImage(item)} height={30} width={30} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

const getQualityImage = (
  rating: number
): ReviewFieldsFragmentFragment['product']['rating'] => {
  // var numberPattern = /\d+/g;
  // let number = Number(rating.match(numberPattern)[0]);

  return rating >= 4
    ? '/icons/smile-cat.svg'
    : rating >= 2.5
    ? '/icons/neutral-cat.svg'
    : '/icons/sad-cat.svg';
};

const allovedValues = [
  'Tuk',
  'Jód',
  'Měď',
  'Železo',
  'Vlhkost',
  'Draslík',
  'Vápník',
  'Bílkovina',
  'Hořčík',
  'Hrubá vláknina',
  'Popel/popelovina',
  'Cukr',
];

const ProductDetailsTooltipBox = ({ data }: ProductDetailsTooltipBoxProps) => {
  const { t } = useTranslation();
  return (
    <div className="grid divide-y divide-gray_lightest" key={data.id}>
      {data.rating && (
        <ToolTipBody itemName={t(cs['avg_review_zoohit'])} item={data.rating} />
      )}
      {data.analysis_variant
        ? Object.entries(data.analysis_variant).map((item) => {
            return allovedValues.indexOf(String(setUppercaseTitle(item[0]))) >
              -1 ? (
              <ToolTipBody
                itemName={String(setUppercaseTitle(item[0]))}
                item={`${item[1]} %`}
                key={item[0]}
              />
            ) : null;
          })
        : data.analysis_main
        ? Object.entries(data.analysis_main).map((item) => {
            return allovedValues.indexOf(String(setUppercaseTitle(item[0]))) >
              -1 ? (
              <ToolTipBody
                itemName={String(setUppercaseTitle(item[0]))}
                item={`${item[1]} %`}
                key={item[0]}
              />
            ) : null;
          })
        : null}

      {data.feeding && (
        <ToolTipBody
          itemName={t(cs['reccommended_feeding'])}
          item={data.feeding.replace('Doporučené dávkování', '')}
        />
      )}
    </div>
  );
};

export default ProductDetailsTooltipBox;
