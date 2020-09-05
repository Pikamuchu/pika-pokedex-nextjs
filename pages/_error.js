import { i18n, Link, withTranslation } from '../i18n';

const Error = ({ statusCode, t }) => {
  let errMsg = `An error occurred`;
  if (statusCode) {
    errMsg = `An error occurred. Error code: ${statusCode}`;
  }

  return (
    <div className="error-page-container">
      <h3>{errMsg}</h3>
      <div className="homepage-btn">
        <Link as="/" href="/">
          <button>Back to homepage</button>
        </Link>
      </div>
    </div>
  );
};

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return {
    namespacesRequired: ['common'],
    statusCode,
  };
};

export default withTranslation('common')(Error);
