import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

async function About() {
  const t = await getTranslations('About');
  return (
    <div className="flex flex-col p-2 text-2xl bg-mist-800 light:bg-mist-100 light:text-black">
      <h1 className="text-4xl my-2">
        <a
          href="https://github.com/rolling-scopes-school/tasks/tree/master/react"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex gap-2"
        >
          <Image
            src="/gh-icon.svg"
            alt={t('githubImgAlt')}
            width={24}
            height={24}
          />
          {t('title')}
        </a>
      </h1>
      <p>{t('discordProfile')}</p>
      <a
        href="https://app.rs.school/profile?githubId=tamermain"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex gap-2"
      >
        <Image
          src="/rs-icon.svg"
          alt={t('courseImgAlt')}
          width={24}
          height={24}
        />{' '}
        {t('courseProfile')}
      </a>
      <a
        href="https://github.com/TamerMain"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex gap-2"
      >
        <Image
          src="/gh-icon.svg"
          alt={t('githubImgAlt')}
          width={24}
          height={24}
        />{' '}
        {t('githubProfile')}
      </a>
    </div>
  );
}

export default About;
