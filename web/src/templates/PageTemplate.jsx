import React from 'react'
import { graphql } from 'gatsby'
// import { RenderModules } from 'src/utils/renderModules'
import SEO from 'src/components/SEO'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import ComponentRenderer from 'src/components/ComponentRenderer'
import { getBackupShareImage } from 'src/utils/getBackupShareImage'

const Page = ({ data }) => {
  const page = data?.sanityPage?.content?.main
  const menus = data?.allSanityMenus?.edges
  const pageMeta = data?.sanityPage?.content?.meta
  const path = page?.slug?.current
  let modules = page?.modules
    // Filter out hidden modules
    modules = modules.filter(module => !module.hidden)
  const hasAtf = modules[0]?._type === 'wideMedia' && modules[0]?.width === 'fullWidth'
  const mainNavigation = menus.filter(menu => menu?.node?.slug?.current === 'main-navigation')[0]?.node?.items

  return (
    <>
      <SEO
        pagePath={path}
        title={page.title}
        description={pageMeta?.metaDescription}
        keywords={pageMeta?.keywords}
        ogTitle={page.title}
        ogImage={pageMeta?.shareImage?.asset?.url || getBackupShareImage(modules)}
        ogDescription={pageMeta?.metaDescription}
        twitterDescription={pageMeta?.metaDescription}
        twitterImage={pageMeta?.shareImage?.asset?.url || getBackupShareImage(modules)}
        twitterTitle={page.title}
      />
      <Header
        hasAtf={hasAtf}
        // bannerText={site.bannerText}
        // bannerColor={site.bannerColor}
        navigation={mainNavigation}
        location={path}
      />
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
            isFirstSection={index === 0}
            isLastSection={index === modules.length - 1}
          />
        )
      })}
      {/* RenderModules(modules) */}
      <Footer />
    </>
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
    allSanityMenus {
      edges {
        node {
          _id
          _key
          slug {
            current
          }
          items {
            title
            newTab
            link {
              content {
                main {
                  slug {
                    current
                  }
                }
              }
              _key
              _id
            }
            externalLink
            _key
          }
        }
      }
    }
    sanityPage(id: { eq: $id }) {
      content {
        main {
          title
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
          metaDescription
          keywords
          shareImage {
            asset {
              url
            }
          }
        }
      }
    }
  }
`

export default Page
