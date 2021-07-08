import React from "react";
import { graphql } from "gatsby";
// import { RenderModules } from 'src/utils/renderModules'
// import { SEO } from 'src/components/SEO'
import ComponentRenderer from "src/components/ComponentRenderer";

const Page = ({ data }) => {
  const content = data?.sanityPage?.content?.main;
  // const meta = data?.sanityPage?.content?.meta
  const path = content?.slug?.current;
  // const url = path === 'home' ? '' : path
  const modules = content?.modules;

  return (
    <div>
      {/*<SEO
        defaultMeta={site.defaultMeta}
        defaultTitle={slug === 'home' ? 'SITE TITLE' : title}
        // metaInfo={meta}
        pagePath={url}
      />*/}
      <div>
        {modules.map((item, index) => {
          console.log(item)
          return (
            <ComponentRenderer item={item} key={item?._key || 'section-' + index} />
          )
        })}
        {/*RenderModules(modules)*/}
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    sanityPage(id: { eq: $id }) {
      content {
        main {
          slug {
            current
          }
          modules {
            ...TextSection
            ...WideMedia
          }
        }
        meta {
          openImage {
            asset {
              url
            }
          }
        }
      }
    }
  }
`;

export default Page;
