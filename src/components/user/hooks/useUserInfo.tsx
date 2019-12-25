import { User } from '../../../lib/graphql/user';
import { useQuery, gql } from '@apollo/client';

const GET_USER = gql`
  query User($email: String!) {
    user(email: $email) {
      id
      name
      email
      userProfile {
        id
        about
        imageUrl
        thumbnail
        mobile
      }
      posts {
        id
        title
        body
        meta
        viewsCount
        urlPath
      }
    }
  }
`;

export default function useUserInfo(pathname: string | undefined) {
  const { data, loading, error } = useQuery<{ user: User }>(GET_USER, {
    variables: {
      email: pathname
    },
    fetchPolicy: 'cache-first'
  });

  return {
    user: data && data.user,
    userProfile: data && data.user.userProfile,
    posts: data && data.user.posts,
    loading,
    error
  };
}
