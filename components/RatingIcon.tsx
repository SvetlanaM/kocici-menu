import { useMemo } from 'react';
import {
  DeepMap,
  FieldError,
  FieldValues,
} from '../node_modules/react-hook-form/dist';
import StarIcon from './StarIcon';
interface RatingIconProps<T extends FieldValues> {
  index: number;
  rating: number;
  handleOnSaveRating?: (index: number) => void;
  isDisabled?: boolean;
  errors?: DeepMap<T, FieldError>;
}

const RatingIcon = <T extends FieldValues>({
  index,
  rating,
  handleOnSaveRating,
  isDisabled,
}: RatingIconProps<T>): JSX.Element => {
  const fill = useMemo(() => {
    if (rating >= index) {
      return true;
    }
    return null;
  }, [rating, index]);

  return (
    <div
      className={`${!isDisabled ? 'cursor-pointer' : 'cursor-none'}`}
      onClick={() => (!isDisabled ? handleOnSaveRating(index) : null)}
    >
      <StarIcon isChecked={fill} />
    </div>
  );
};

export default RatingIcon;
