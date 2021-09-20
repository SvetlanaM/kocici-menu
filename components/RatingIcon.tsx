import { useMemo } from 'react';
import StarIcon from './StarIcon';
interface RatingIconProps {
  index: number;
  rating: number;
  handleOnSaveRating?: (index: number) => void;
  isDisabled?: boolean;
}

const RatingIcon = ({
  index,
  rating,
  handleOnSaveRating,
  isDisabled,
}: RatingIconProps): JSX.Element => {
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
