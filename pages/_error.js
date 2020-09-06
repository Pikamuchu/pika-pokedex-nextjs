import { Link, withTranslation } from '../i18n';

const Error = ({ statusCode, t }) => (
  <div className="error-page-container">
    <h3> {statusCode ? t('error-with-status', { statusCode }) : t('error-without-status')}</h3>
    <div className="homepage-btn">
      <Link as="/" href="/">
        <button type="button">Back to homepage</button>
      </Link>
    </div>
  </div>
);

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    namespacesRequired: ['common'],
    statusCode,
  };
};

export default withTranslation('common')(Error);
