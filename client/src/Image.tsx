import { baseURL } from './assets/types';

export default function Image({ src, ...rest }: any) {
  src = src && src.includes('https://') ? src : `${baseURL}/uploads/` + src;
  return <img {...rest} src={src} alt={''} />;
}
