import i18next from 'i18next';
import { ReviewFieldsFragmentFragment } from '../graphql/generated/graphql';
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
        {itemName === '% mäsa:' ? (
          <Image src={getQualityImage(item)} height={30} width={30} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

const getCombinedItems = (data: ReviewFieldsFragmentFragment['product']) => {
  const plant_type = (data.plant_type && data.plant_type + ',') || '';
  const other_type = (data.other_type && data.other_type + ',') || '';
  const note = (data.note && data.note + ',') || '';
  const ingredient_name =
    data.ingredient_name &&
    data.amount + data.unit + ' ' + data.ingredient_name;
  return (plant_type + ' ' + other_type + ' ' + note + ' ' + ingredient_name)
    .replace('ne', '')
    .replace(' ', '');
};

const getQualityImage = (
  meal: string
): ReviewFieldsFragmentFragment['product']['meal'] => {
  var numberPattern = /\d+/g;
  let number = Number(meal.match(numberPattern)[0]);

  return number >= 70
    ? '/icons/smile-cat.svg'
    : number >= 50
    ? '/icons/neutral-cat.svg'
    : '/icons/sad-cat.svg';
};

const ProductDetailsTooltipBox = ({ data }: ProductDetailsTooltipBoxProps) => {
  return (
    <div className="grid divide-y divide-gray_lightest">
      {data.meal && <ToolTipBody itemName="% mesa" item={data.meal} />}
      {data.meal_type && (
        <ToolTipBody itemName="% mäsa:" item={data.meal_type} />
      )}

      <ToolTipBody itemName="Zloženie:" item={getCombinedItems(data)} />

      {data.daily_food && (
        <ToolTipBody
          itemName="Doporučená denná dávka/3-5kg mačka:"
          item={data.daily_food}
        />
      )}
      {data.conservants && (
        <ToolTipBody itemName="Konzervanty:" item={data.conservants} />
      )}
      {data.feeding && (
        <ToolTipBody
          itemName="Doporučené dávkovanie:"
          item={data.feeding.replace(
            'Doporučené dávkování',
            'Odporúča odborník'
          )}
        />
      )}
    </div>
  );
};

export default ProductDetailsTooltipBox;
