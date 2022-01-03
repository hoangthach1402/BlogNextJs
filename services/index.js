import { request, gql } from 'graphql-request'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              createdAt
              slug
              title
              excerpt
              
              categories {
                name
                slug
              }
              author {
                bio
                id
                name
                photo {
                  url
                }
              }
              featureImage {
                url
              }
            }
          }
        }
      }
 `
  const result = await request(graphqlAPI, query)
  return result.postsConnection.edges;
}