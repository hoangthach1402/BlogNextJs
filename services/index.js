import { request, gql } from 'graphql-request'
// import dotenv from 'dotenv'
// dotenv.config({ path: '../.env' })
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
  return result.postsConnection.edges
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)

  return result.posts
}

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query, { slug, categories })

  return result.posts
}
