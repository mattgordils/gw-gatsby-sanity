import React from "react";
import { graphql } from "gatsby";
// import { RenderModules } from 'src/utils/renderModules'
// import { SEO } from 'src/components/SEO'
// import Footer from 'src/components/Footer'
import ComponentRenderer from "src/components/ComponentRenderer";

const Page = ({ data }) => {
  const content = data?.sanityPage?.content?.main;
  const meta = data?.sanityPage?.content?.meta
  const path = content?.slug?.current;
  // const url = path === 'home' ? '' : path
  const modules = content?.modules;

  console.log(meta)

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
          const prevSection = modules[index - 1]
          const nextSection = modules[index + 1]
          let prevTheme = false
          let nextTheme = false
          if (prevSection && prevSection.width !== 'fullWidth') {
            prevTheme = prevSection.theme || 'default'
          }
          if (nextSection && nextSection.width !== 'fullWidth') {
            nextTheme = nextSection.theme || 'default'
          }
          if (!item.theme && item.width !== 'fullWidth') {
            item.theme = 'default'
          }
          return (
            <ComponentRenderer
              item={item} key={item?._key || 'section-' + index}
              nextTheme={nextTheme}
              prevTheme={prevTheme}
            />
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
            ...FiftyFifty
            ...Columns
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
