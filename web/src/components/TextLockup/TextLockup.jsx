import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Button from 'src/components/Button'
import TextLink from 'src/components/TextLink'
import ScrollEntrance from 'src/components/ScrollEntrance'
import SanityRichText from 'src/components/SanityRichText'
import { typography, mq } from 'src/styles'
import { themes } from 'src/styles/themes'

const Wrapper = styled.div`
	display: inline-block;
	display: block;
	vertical-align: top;
	${ ({ alignment }) => alignment === 'center' && `
		margin-left: auto;
		margin-right: auto;
		> div {
			margin-left: auto;
			margin-right: auto;
		}
	` }
	${ mq.mediumAndBelow } {
		display: block;
	}
`
const TextContainer = styled(ScrollEntrance)`
	text-align: ${ ({ alignment }) => alignment };
	width: 100%;
	${ ({ alignment }) => alignment === 'center' && `
		margin-left: auto;
		margin-right: auto;
		h1, h2, h3, h4, h5, h6, p, blockquote, ul {
			margin-left: auto;
			margin-right: auto;
		}
	` }
	${ ({ alignment }) => alignment === 'right' && `
		margin-left: auto;
		h1, h2, h3, h4, h5, h6, p, blockquote, ul {
			margin-left: auto;
		}
	` }
`

const Eyebrow = styled.p`
	${ typography.eyebrow }
	${ ({ hasText }) => hasText ? `
		margin: 0 0 0.5em;
	` : `
		margin: 0;
	` }
`

const Headline = styled.h3`
	${ ({ headlineSize }) => typography[headlineSize] }
	${ ({ hasText }) => !hasText && `
		margin-bottom: 0;
	` }
	${ ({ hasEyebrow }) => !hasEyebrow && `
		margin-top: 0;
	` }
`

const Text = styled.div`
	p {
		${ ({ textSize }) => typography[textSize] }
	}
`

const ActionWrapper = styled.div`
	padding: 16px 10px 0;
	display: inline-block;
	vertical-align: middle;
`

const ButtonActions = styled.div`
	margin-top: 8px;
	text-align: ${ ({ alignment }) => alignment };
	margin-left: -10px;
	margin-right: -10px;
`

const TextLockup = ({
		theme = 'default',
		eyebrow,
		headline,
		headlineSize,
		headlineElement,
		text,
		textSize,
		actions,
		className,
		icon,
		alignment,
		additions,
		entranceDelay,
		transitionIn,
		listType
	}) => {
	return (
		<Wrapper className={className} alignment={alignment}>
			<div>
				<TextContainer alignment={alignment} delay={entranceDelay} transitionIn={transitionIn}>

					{eyebrow && (
						<div>
							<Eyebrow hasText={headline || text} alignment={alignment}>{eyebrow}</Eyebrow>
						</div>
					)}

					{headline && (
						<Headline as={headlineElement || headlineSize} headlineSize={headlineSize} hasText={text} hasEyebrow={eyebrow}>{headline}</Headline>
					)}

					{text && text.raw &&
						<Text textSize={textSize} alignment={alignment}><SanityRichText richText={text} listType={listType}/></Text>
					}

					{typeof text === 'string' &&
						<Text textSize={textSize} alignment={alignment}><p>{text}</p></Text>
					}

					{text && typeof text !== 'string' && !text.raw &&
						<Text textSize={textSize} alignment={alignment}>{text}</Text>
					}

					{actions && (
						<ButtonActions buttons={actions} alignment={alignment}>
							{actions.map((action, index) => {
								if (action.__typename === 'ContentfulButton') {
									let actionTheme = 'default'
									if (action.theme === 'primary') {
										actionTheme = themes[theme].buttonTheme || 'default'
									} else if (action.theme === 'secondary') {
										actionTheme = themes[theme].buttonThemeSecondary || 'default'
									}
									return (
										<ActionWrapper key={'button-' + index}>
											<Button
												setTheme={actionTheme}
												to={action.to || '/' + action.linkToPage.slug}
												external={action.to}
												target={action.openInNewTab ? '_blank' : ''}
												title={action.label}
												name={action.label}
											>
												{action.label}
											</Button>
										</ActionWrapper>
									)
								} else {
									return (
										<ActionWrapper key={'button-' + index}>
											<TextLink
												to={action.to || '/' + action.linkToPage.slug}
												external={action.to}
												target={action.openInNewTab ? '_blank' : ''}
												title={action.label}
												name={action.label}
											>
												{action.label}
											</TextLink>
										</ActionWrapper>
									)
								}
							})}
						</ButtonActions>
					)}
				</TextContainer>
			</div>
		</Wrapper>
	)
}

TextLockup.defaultProps = {
	alignment: 'inherit',
	textSize: 'body',
	entranceDelay: 0,
	transitionIn: true,
	headlineSize: 'h3'
}

TextLockup.propTypes = {
	/** Text alignment */
	alignment: PropTypes.oneOf(['center', 'left', 'right']),
	/** Optional. Should be used if  */
	headline: PropTypes.string,
	/** Style of headline if 'headline' prop is used */
	headlineSize: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5']),
	/** If you want to change the headline element but not it's size, use this */
	headlineElement: 'h3',
	/** `string` or `{ raw: string }` if using Contentful rich text */
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ raw: PropTypes.string })]),
	/** What size should paragraph text be? */
	textSize: PropTypes.oneOf(['body', 'bodyMedium', 'bodyLarge', 'bodySmall']),
	/** Buttons or links to go under text */
	actions: PropTypes.shape([
		{
			__typename: PropTypes.oneOf(['ContentfulButton', 'ContentfulLink']),
			to: PropTypes.string,
			linkToPage: PropTypes.shape({ slug: PropTypes.string }),
			openInNewTab: PropTypes.bool,
			label: PropTypes.string
		}
	]),
	/** Should text animate in? */
	transitionIn: PropTypes.bool,
	/** Delay the stagger animation */
	entranceDelay: PropTypes.number,
	/** When used in component with a theme, this will dictate the "primary" and "secondary" button themes */
	theme: PropTypes.string
}

export default TextLockup
