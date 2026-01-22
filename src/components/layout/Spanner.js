import { useTranslation } from 'next-i18next';

const Spanner = () => {
  const { t } = useTranslation('common');
  return (
    <div className="spanner d-flex flex-row-reverse">
      <div className="spinner-box">
        <svg className="spinner" width="30px" height="30px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle className="spinner-path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30" />
        </svg>
        <p className="spinner-text">{t('spinner-loading')}</p>
      </div>
    </div>
  );
};

export default Spanner;
