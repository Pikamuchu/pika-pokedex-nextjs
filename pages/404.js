import { Link, withTranslation } from '../i18n';

const Custom404 = ({ t }) => {
  <div className="error-page-container">
    <h3>{t('error-404-title')}</h3>
    <div className="homepage-btn">
      <Link as="/" href="/">
        <button type="button">{t('back-to-homepage')}</button>
      </Link>
    </div>
  </div>;
};

export default withTranslation('common')(Custom404);
