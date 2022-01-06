import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { rgba } from 'polished'
import Link from 'src/components/Link'
import Logo from 'src/components/Logo'
import Grid from 'src/components/Grid'
import ScrollListener from 'src/components/ScrollListener'
import NotificationBanner from 'src/components/NotificationBanner'
import ResponsiveComponent from 'src/components/ResponsiveComponent'
import AnimatedIcon from 'src/components/AnimatedIcon'
import MobileMenu from 'src/components/MobileMenu'
import { AppContext } from 'src/state/AppState'
import { getSlugLink } from 'src/utils/format'
import { colors, typography, animations, mq, util } from 'src/styles'

const showHide = false // show and hide header on scroll
export const headerHeight = (attr = 'height', multiplier = 1) => util.responsiveStyles(attr, (140 * multiplier), (130 * multiplier), (110 * multiplier), (75 * multiplier))
const headerHeightCollapsed = () => util.responsiveStyles('height', 80, 70, 66, 60)
const mobileBreak = mq.largeBreakpoint

const Dropdown = styled.nav`
  list-style: none;
  position: absolute;
  top: 100%;
  // min-width: 200px;
  border-radius: 5px;
  background: ${ colors.bgColor };
  visibility: hidden;
  opacity: 0;
  transition: visibility ${ animations.mediumSpeed } ease-in-out,
    opacity ${ animations.mediumSpeed } ease-in-out,
    transform ${ animations.mediumSpeed } cubic-bezier(0.44, 0.24, 0.16, 1);
  background: ${ colors.bgColor };
  padding: 10px 16px 11px;
  text-align: left;
  left: -16px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  a {
    padding: 3px 0;
    color: ${ colors.lightTextColor };
    &:hover {
      color: ${ colors.textColor };
    }
  }
  li {
    width: 100%;
    white-space: nowrap;
  }
  a {
    display: block;
    ${ typography.bodySmall };
    font-weight: 600;
    line-height: 1em;
    padding: .5em 0;
  }
`

const NavLink = styled(Link)`
  display: block;
  ${ typography.h6 }
  line-height: 1em;
  padding: 1em 0;
  transition:   padding ${ animations.mediumSpeed } ease-in-out,
                margin ${ animations.mediumSpeed } ease-in-out,
                background ${ animations.mediumSpeed } ease-in-out,
                opacity ${ animations.mediumSpeed } ease-in-out,
                color ${ animations.mediumSpeed } ease-in-out;
  ${ ({ hasAtf, active }) => hasAtf ? `
      color: inherit;
      ${ !active && '&:hover { opacity: .6; }' }
    ` : `
      color: inherit;
      ${ !active && `&:hover { color: ${ colors.mainColor }; }` }
  ` }
`

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  transition: height ${ animations.mediumSpeed } ease-in-out,
              background ${ animations.mediumSpeed } ease-in-out,
              transform ${ animations.mediumSpeed } ease-in-out,
              box-shadow ${ animations.mediumSpeed } ease-in-out;
  ${ ({ scrolled, hasAtf, mobileMenuOpen }) => scrolled ? `
    ${ headerHeightCollapsed() }
    background: ${ colors.white };
    color: ${ colors.textColor };
    box-shadow: 0 1px 0 ${ rgba(colors.textColor, 0.1) };
  ` : `
    ${ headerHeight() }
    background: transparent;
    ${ hasAtf ? `
      color: ${ colors.bgColor };
    ` : `
      color: ${ colors.textColor };
    ` }
  ` }
  ${ ({ navVisible }) => navVisible && `
    transform: translate3d(0, -101%, 0);
  ` }

  ${ mq.maxWidth(mobileBreak) } {
    ${ ({ mobileMenuOpen }) => mobileMenuOpen ? `
      background: transparent;
      box-shadow: none;
      color: ${ colors.textColor };
      ${ headerHeight() }
    ` : '' }
  }
`

const HeaderContent = styled(Grid)``

const HeaderLogo = styled(Logo)`
  ${ util.responsiveStyles('width', 80, 50, 50, 40) }
  height: auto;
  transition: color ${ animations.mediumSpeed } ease-in-out, width ${ animations.mediumSpeed } ease-in-out;
  ${ ({ scrolled, hasAtf, mobileMenuOpen }) => scrolled ? `
    color: ${ colors.mainColor };
    ${ util.responsiveStyles('width', 50, 40, 40, 30) }
  ` : `
    ${ !hasAtf ? `
      color: ${ colors.mainColor };
    ` : `
      color: ${ colors.bgColor };
    ` }
  ` }

  ${ mq.maxWidth(mobileBreak) } {
    ${ ({ mobileMenuOpen }) => mobileMenuOpen ? `
      color: ${ colors.mainColor };
      ${ util.responsiveStyles('width', 80, 50, 50, 40) }
    ` : '' }
  }
`

const LogoCol = styled.div`
  text-align: center;
  a {
    display: inline-block;
    vertical-align: top;
    transition: none;
    max-width: 100%;
  }
`

const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: baseline;
  display: flex;
  width: 100%;
  justify-content: ${ ({ alignment }) => alignment === 'right' ? 'flex-end' : 'flex-start' };
  li {
    position: relative;
    flex-shrink: 0; 
    &:hover {
      ${ Dropdown } {
        visibility: visible;
        opacity: 1;
      }
    }
    &:not(:last-of-type) {
      ${ util.responsiveStyles('margin-right', 60, 40, 20, 20) }
    }
  }
`

const MenuIcon = styled.li`
  display: none;
  margin-left: -10px;
  margin-right: -10px;
  cursor: pointer;
  display: block;
  vertical-align: top;
  transition: color ${ animations.mediumSpeed } ease-in-out;
  button {
    padding: 5px 10px;
    display: block;
    outline: none;
    border: none;
    background: transparent;
    appearance: none;
    color: inherit;
    cursor: pointer;
  }
  span {
    display: block;
  }
`

const HeaderNotificationBanner = styled(NotificationBanner)`
  position: relative;
  z-index: 5;
  ${ ({ hidden }) => hidden && `
    opacity: 0;
  ` }
`

const Header = ({
  location,
  hasAtf = false,
  bannerText,
  collapsed,
  bannerColor,
  // navigation
}) => {
  const { allSanitySiteSettings, allSanityMenus } = useStaticQuery(
    graphql`
      query {
        allSanitySiteSettings {
          edges {
            node {
              title
            }
          }
        }
        allSanityMenus {
          edges {
            node {
              _id
              _key
              slug {
                current
              }
              items {
                _key
                itemLink {
                  ...Link
                }
                sublinks {
                  ...Link
                }
              }
            }
          }
        }
      }
    `
  )

  const menus = allSanityMenus?.edges
  const navigation = menus.filter(menu => menu?.node?.slug?.current === 'main-navigation')[0]?.node?.items

  const siteTitle = allSanitySiteSettings?.edges[0]?.node?.title
  const [bannerVisible, toggleBanner] = useState(true)

  const { mobileMenu, toggleMobileMenu } = useContext(AppContext)

  const pathname = location
  const pageHasAtf = hasAtf

  return (
    <Fragment>
      {bannerText && (<div>
        <HeaderNotificationBanner
          closeBanner={() => toggleBanner(false)}
          collapsed={!bannerVisible}
          text={bannerText}
        />
      </div>)}
      <ScrollListener.Consumer>
        {({
          scrolledToTop,
          scrolledToBottom,
          scrollY,
          scrolledUp,
          hasScrolled,
          pageHeight
        }) => {
          let scrolled = false
          if (collapsed) {
            scrolled = true
          } else {
            scrolled = !scrolledToTop && hasScrolled
          }
          return (
            <Wrapper hasAtf={pageHasAtf} navVisible={!scrolledUp && !scrolledToTop && showHide}>
              {bannerText && (<div>
                <HeaderNotificationBanner
                  closeBanner={() => toggleBanner(false)}
                  collapsed={!bannerVisible}
                  text={bannerText}
                  setTheme={bannerColor}
                />
              </div>)}
              <HeaderWrapper
                navVisible={!scrolledUp && !scrolledToTop && showHide}
                hasAtf={pageHasAtf}
                scrolled={scrolled}
                mobileMenuOpen={mobileMenu}
              >
                <HeaderContent
                  small="1 [3] [6] [3] 1"
                  medium="1 [5] [2] [5] 1"
                  large="1 [8] [8] [8] 1"
                  vAlign="center"
                  hasAtf={pageHasAtf}
                  navVisible={!scrolledUp && !scrolledToTop && showHide}
                >
                  <div>
                    <NavLinks alignment="left">
                      <ResponsiveComponent
                        small={
                          <MenuIcon id="mobile-menu-icon">
                            <button onClick={() => toggleMobileMenu(!mobileMenu)} aria-label='Toggle Navigation'>
                              <AnimatedIcon
                                icon={mobileMenu ? 'close' : 'menu'}
                              />
                            </button>
                          </MenuIcon>
                        }
                        custom={{
                          breakpoint: mobileBreak,
                          content: navigation && navigation.map((item, index) => {
                            const { itemLink } = item
                            const link = getSlugLink(itemLink)
                            const externalLink = itemLink.externalLink
                            if (!itemLink.title) {
                              return false
                            }
                            return (
                              <li key={'header-link-' + item._key}>
                                <NavLink
                                  target={itemLink.newTab && '_blank'}
                                  external={itemLink.type === 'externalLink'}
                                  scrolled={scrolled}
                                  hasAtf={pageHasAtf}
                                  to={itemLink.type === 'pageLink' ? link : externalLink}
                                  active={'/' + pathname === link}
                                  key={link}
                                  hasDropdown={item?.sublinks?.length > 0}
                                >
                                  {itemLink.title}
                                </NavLink>
                                {item.sublinks && item?.sublinks?.length > 0 && (
                                  <Dropdown>
                                    <ul>
                                      {item.sublinks.map((dropdownLink, index) => (
                                        <li key={dropdownLink._key}>
                                          <Link
                                            target={dropdownLink.newTab ? '_blank' : ''}
                                            external={dropdownLink.type === 'externalLink'}
                                            to={itemLink.type === 'pageLink' ? getSlugLink(dropdownLink) : dropdownLink.externalLink}
                                          >
                                            {dropdownLink.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </Dropdown>
                                )}
                              </li>
                            )
                          })
                        }}
                      />
                    </NavLinks>
                  </div>
                  <LogoCol>
                    <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                      <Link to="/" title={siteTitle}>
                        <HeaderLogo
                          scrolled={scrolled}
                          hasAtf={pageHasAtf}
                          mobileMenuOpen={mobileMenu}
                        />
                      </Link>
                    </div>
                  </LogoCol>
                  <div>
                  </div>
                </HeaderContent>
              </HeaderWrapper>
            </Wrapper>
          )
        }}
      </ScrollListener.Consumer>

      <ResponsiveComponent
        small={
          <MobileMenu
            open={mobileMenu}
            toggleMobileMenu={toggleMobileMenu}
            navLinks={navigation}
            pathname={pathname}
          // footerColumn1={footerColumn1}
          // footerColumn2={footerColumn2}
          />
        }
        custom={{
          breakpoint: mobileBreak,
          content: <span />
        }}
      />

    </Fragment>
  )
}

export default Header
