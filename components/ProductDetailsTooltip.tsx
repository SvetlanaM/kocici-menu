import i18next from 'i18next';
import { ReviewFieldsFragmentFragment } from '../graphql/generated/graphql';
import setUppercaseTitle from '../utils/setUppercaseTitle';
import Image from './Image';

i18next.init({
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
        {itemName === 'Avg. hodnotenie:' ? (
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
  return (
    <div className="grid divide-y divide-gray_lightest">
      {data.rating && (
        <ToolTipBody itemName="Avg. hodnotenie:" item={data.rating} />
      )}
      {data.analysis_variant
        ? Object.entries(data.analysis_variant).map((item) => {
            return allovedValues.indexOf(String(setUppercaseTitle(item[0]))) >
              -1 ? (
              <ToolTipBody
                itemName={String(setUppercaseTitle(item[0]))}
                item={`${item[1]} %`}
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
              />
            ) : null;
          })
        : null}

      {data.feeding && (
        <ToolTipBody
          itemName="Doporučené dávkovanie:"
          item={data.feeding.replace('Doporučené dávkování', '')}
        />
      )}
    </div>
  );
};

export default ProductDetailsTooltipBox;
