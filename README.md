## Differences between the Contentful setup and the Sanity setup

### Pros
- 😃 No placeholder data needed
- 😃 In-CMS preview

### Cons
- 🙁 No UI for building content models
- 🙁 Need to redeploy `graphql` when the schema changes

Run `sanity graphql deploy`. This is important to get the Sanity API to work with Gatsby.
NOTE: You will also need to run this when making schema changes or they will not be reflected in graphql