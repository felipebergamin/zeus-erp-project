import gql from 'graphql-tag';

export const AUTH_USER_MUTATION = gql`
  mutation authUser($login: String!, $passwd: String!) {
    createToken(login: $login, passwd: $passwd) {
      _id
      token
    }
  }
`;

export const SIGN_URI_MUTATION = gql`
  mutation signuri($uri: String!) {
    signUri(uri: $uri)
  }
`;

export const IS_AUTH_QUERY = gql`
  {
    isAuth
  }
`;
