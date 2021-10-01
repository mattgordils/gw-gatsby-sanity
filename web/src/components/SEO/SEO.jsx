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
		shareImage,
		ogTitle,
		ogImage,
		ogDescription,
		twitterDescription,
		twitterImage,
		twitterTitle
	}) {
	const { site, appleTouchIcon, favicon, socialShareImage, allSanitySiteSettings } = useStaticQuery(
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

	const sanitySiteSettings = allSanitySiteSettings?.edges[0]?.node

	///
	const metaTitle = title
	const metaDescription = description || sanitySiteSettings?.description
	let metaKeywords = keywords
	shareImage = shareImage?.asset?.url
	///

	const host = process.env.GATSBY_SITE_URL

	// let metaShareImage = host + socialShareImage.publicURL
	// if (ogImage || twitterImage) {
	// 	metaShareImage = ogImage || twitterImage
	// }

	// if (keywords && keywords.length > 0) {
	// 	metaKeywords = keywords.join(', ')
	// } else if (sanitySiteSettings?.keywords) {
	// 	metaKeywords = sanitySiteSettings?.keywords.join(', ')
	// }

	// Default SEO content from file structure
	const localTouchIcon = host + appleTouchIcon.publicURL
	const localFavicon = host + favicon.publicURL
	const localShareImage = host + socialShareImage.publicURL
	// Sanity SEO content
	const sanityFavicon = sanitySiteSettings?.favicon?.asset?.url
	const sanityTouchIcon = sanitySiteSettings?.touchIcon?.asset?.url
	const siteTitle = sanitySiteSettings?.title

	const metaFavicon = sanityFavicon || localFavicon
	const metaTouchIcon = sanityTouchIcon || localTouchIcon
	const metaShareImage = shareImage || localShareImage

	const titleTemplate = pagePath !== 'home' && metaTitle ? `%s | ${ siteTitle || site.siteMetadata.title }` : `${ siteTitle || site.siteMetadata.title }`

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
					content: titleTemplate,
				},
				{
					property: 'og:type',
					content: 'website',
				},
				{
					property: 'og:image',
					content: metaShareImage
				},
				{
					property: 'og:description',
					content: metaDescription,
				},
				{
					name: 'twitter:image',
					content: metaShareImage
				},
				{
					name: 'twitter:card',
					content: 'summary_large_image',
				},
				{
					name: 'twitter:creator',
					content: site.siteMetadata.author,
				},
				{
					name: 'twitter:title',
					content: titleTemplate,
				},
				{
					name: 'twitter:description',
					content: metaDescription,
				},
				{
					name: 'keywords',
					content: metaKeywords
				}
			]}
			link={[
				{ rel: 'icon', type: 'image/png', sizes: '32x32', href: metaFavicon },
				{ rel: 'apple-touch-icon', type: 'image/png', sizes: '120x120', href: metaTouchIcon }
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
