import Image from '../Image';

const PlaceImage = ({ place, index = 0, className = '' }: any) => {
  if (place.photos?.length) {
    return <div></div>;
  }
  if (!className) {
    className = 'object-cover';
  }
  return <Image className={className} src={place.photos[index]} alt='' />;
};

export default PlaceImage;
