import { useMemo } from 'react';
import StarIcon from './StarIcon';
import StarIconTest from './StarIconTest';

interface RatingIconProps {
  index: number;
  rating: number;
  hoverRating: number;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  onSaveRating: (index: number) => void;
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
      className="cursor-pointer"
      onMouseEnter={() => props.onMouseEnter(props.index)}
      onMouseLeave={() => props.onMouseLeave()}
      onClick={() => props.onSaveRating(props.index)}
    >
      <StarIcon isChecked={fill} />
    </div>
  );
};

export default RatingIcon;
