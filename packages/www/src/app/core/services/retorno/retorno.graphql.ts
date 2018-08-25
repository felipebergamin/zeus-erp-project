import gql from 'graphql-tag';

export const UPLOAD_RETORNO_MUTATION = gql`
  mutation uploadRetorno($file: Upload!) {
    uploadRetorno(file: $file)
  }
`;
