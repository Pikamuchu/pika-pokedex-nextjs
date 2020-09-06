import { withTranslation } from '../i18n';

const Custom404 = ({ t }) => {
  return <h1>{t('error-404-title')}</h1>;
};

Custom404.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Custom404);
