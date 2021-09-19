import { useMemo } from 'react';
import StarIcon from './StarIcon';
import StarIconTest from './StarIconTest';

interface RatingIconProps {
  index: number;
  rating: number;
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: () => void;
  onSaveRating?: (index: number) => void;
  isDisabled?: boolean;
}

const RatingIcon = (props: RatingIconProps) => {
  const fill = useMemo(() => {
    if (props.hoverRating >= props.index) {
      return true;
    } else if (props.hoverRating && props.rating >= props.index) {
      return true;
    }
    return null;
  }, [props.rating, props.hoverRating, props.index]);

  return (
    <div
      className={`${!props.isDisabled ? 'cursor-pointer' : 'cursor-none'}`}
      onClick={() =>
        !props.isDisabled ? props.onSaveRating(props.index) : null
      }
    >
      <StarIcon isChecked={fill} />
    </div>
  );
};

export default RatingIcon;
