export default function Avatar({ size = 32, src, alt }) {
  return (
    <>
      {/* eslint-disable-next-line */}
      <img
        data-cy='currentUserAvatar'
        width={size}
        height={size}
        src={
          src ||
          'https://d29fhpw069ctt2.cloudfront.net/icon/image/84587/preview.svg'
        }
        alt={alt}
        className='rounded-full'
      />
    </>
  );
}
