import { Link, withTranslation } from '../i18n';

const Error = ({ statusCode, t }) => (
  <div className="error-page-container">
    <h3> 
      {' '}
      {statusCode ? t('error-with-status', { statusCode }) : t('error-without-status')}
    </h3>
    <div className="homepage-btn">
      <Link as="/" href="/">
        <button type="button">{t('back-to-homepage')}</button>
      </Link>
    </div>
  </div>
);

export async function getServerSideProps({ res, err }) {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    props: {
      namespacesRequired: ['common'],
      statusCode,
    },
  };
}

export default withTranslation('common')(Error);
