import Image from 'next/image';
import Link from 'next/link';

export default function ProjectCard({
  project: { title, mainPictureUrl, id },
}) {
  return (
    <Link href={`/projects/${id}`} data-cy='projectCard'>
      <a>
        <div className='z-[0] relative m-8 rounded-lg overflow-hidden hover:scale-[1.05] transition-all shadow-black/20 hover:shadow-black/30 shadow-lg hover:shadow-xl'>
          <Image
            src={mainPictureUrl}
            width={(250 * 16) / 9}
            height={250}
            alt={title}
          />
          <div className='z-10 absolute top-0 w-full bottom-0'>
            <h2
              style={{ textShadow: '1px 1px 2px black' }}
              className='bg-black/60 hover:bg-black/50 text-3xl font-bold text-center p-2'
            >
              {title}
            </h2>
          </div>
        </div>
      </a>
    </Link>
  );
}
