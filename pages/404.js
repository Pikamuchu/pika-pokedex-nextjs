import { withTranslation } from '../i18n';

const Custom404 = ({t}) => {
  return <h1>404 - Page Not Found</h1>
}

export async function getStaticProps() {
  return {
    props: {
      namespacesRequired: ['common'],
    },
  };
}

export default withTranslation('common')(Custom404);
