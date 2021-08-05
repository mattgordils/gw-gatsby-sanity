import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO ({
		lang,
		pagePath,
		title,
		description,
		keywords,
		ogTitle,
		ogImage,
		ogDescription,
		twitterDescription,
		twitterImage,
		twitterTitle
	}) {
	const { site, favicon, appleTouchIcon, socialShareImage, allSanitySiteGlobal, allSanitySiteSettings } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
					}
				}
				allSanitySiteSettings {
			    edges {
			      node {
			        favicon {
			          asset {
			            url
			          }
			        }
			        description
			        title
			        keywords
			      }
			    }
			  }
				allSanitySiteGlobal {
			    edges {
			      node {
			        content {
			          meta {
			            openImage {
			              asset {
			                url
			              }
			            }
			            metaTitle
			            metaDescription
			            metaKeywords
			            openGraphDescription
			            openTitle
			            twitterDescription
			            twitterTitle
			            twitterImage {
			              asset {
			                url
			              }
			            }
			          }
			        }
			      }
			    }
			  }
				favicon: file(relativePath:{eq: "images/favicon.png"}) {
					publicURL
				}
				appleTouchIcon: file(relativePath: { eq: "images/touch-icon.png" }) {
					publicURL
				}
				socialShareImage: file(relativePath: { eq: "images/share-image.png" }) {
					publicURL
					absolutePath
				}
			}
		`
	)

	// const sanitySiteGlobals = allSanitySiteGlobal?.edges[0]?.node
	const sanitySiteSettings = allSanitySiteSettings?.edges[0]?.node

	console.log(sanitySiteSettings)

	const metaDescription = description || sanitySiteSettings?.description
	const host = process.env.GATSBY_SITE_URL

	const metaFavicon = host + favicon.publicURL
	const metaTouchIcon = host + appleTouchIcon.publicURL

	let metaShareImage = host + socialShareImage.publicURL
	if (ogImage || twitterImage) {
		metaShareImage = ogImage || twitterImage
	}

	let metaKeywords = []
	if (keywords && keywords.length > 0) {
		console.log(keywords)
		metaKeywords = keywords.join(', ')
	} else if (sanitySiteSettings?.keywords) {
		metaKeywords = sanitySiteSettings?.keywords.join(', ')
	}

	const sanityFavicon = sanitySiteSettings?.favicon?.asset?.url
	const sanitytouchIcon = sanitySiteSettings?.touchIcon?.asset?.url
	const siteTitle = sanitySiteSettings?.title

	const titleTemplate = pagePath !== 'home' && title ? `%s | ${ siteTitle || site.siteMetadata.title }` : `${ siteTitle || site.siteMetadata.title }`

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title || site.siteMetadata.title}
			titleTemplate={titleTemplate}
			meta={[
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
				},
				{
					name: 'description',
					content: metaDescription,
				},
				{
					property: 'og:title',
					content: `${ ogTitle || titleTemplate }`,
				},
				{
					property: 'og:type',
					content: 'website',
				},
				{
					property: 'og:image',
					content: `${ ogImage || metaShareImage }`
				},
				{
					property: 'og:description',
					content: ogDescription || metaDescription,
				},
				{
					name: 'twitter:image',
					content: `${ twitterImage || metaShareImage }`
				},
				{
					name: 'twitter:card',
					content: 'summary',
				},
				{
					name: 'twitter:creator',
					content: site.siteMetadata.author,
				},
				{
					name: 'twitter:title',
					content: `${ twitterTitle || titleTemplate }`,
				},
				{
					name: 'twitter:description',
					content: twitterDescription || metaDescription,
				},
				{
					name: 'keywords',
					content: metaKeywords
				}
			]}
			link={[
				{ rel: 'icon', type: 'image/png', sizes: '32x32', href: sanityFavicon },
				{ rel: 'apple-touch-icon', type: 'image/png', sizes: '120x120', href: sanitytouchIcon || metaTouchIcon }
			]}
		/>
	)
}

SEO.defaultProps = {
	lang: 'en',
	meta: [],
	keywords: [],
	description: '',
	shareImage: ''
}

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	keywords: PropTypes.arrayOf(PropTypes.string),
	title: PropTypes.string
}

export default SEO
