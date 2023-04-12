import { loadUser } from '@/redux/actions/auth/auth';

const withAuthState = (getServerSidePropsFunc) => {
  return async (context) => {
    const { store } = context;

    // Fetch the user data if it's not in the state
    if (!store.getState().auth.user) {
      await store.dispatch(loadUser(store.getState().auth));
    }

    // Call the original getServerSideProps function if it exists
    const result = getServerSidePropsFunc ? await getServerSidePropsFunc(context) : { props: {} };

    return result;
  };
};

export default withAuthState;
