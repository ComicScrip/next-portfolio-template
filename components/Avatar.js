import { forwardRef } from 'react';

export default forwardRef(function Avatar(
  {
    size = 32,
    src = 'https://d29fhpw069ctt2.cloudfront.net/icon/image/84587/preview.svg',
    alt,
  },
  ref
) {
  return (
    <img ref={ref} width={size} src={src} alt={alt} className='rounded-full' />
  );
});
