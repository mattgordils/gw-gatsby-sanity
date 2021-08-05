import React, { Fragment, useState, useContext } from 'react'
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
export const headerHeight = (attr = 'height', additionalHeight = 0) => util.responsiveStyles(attr, (140 + additionalHeight), (130 + additionalHeight), (110 + additionalHeight), (75 + additionalHeight))
const headerHeightCollapsed = () => util.responsiveStyles('height', 80, 70, 66, 60)

const Dropdown = styled.ul`
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: ${ colors.mainColor };
  color: ${ colors.bgColor };
  ${ typography.bodySmall };
  font-weight: 600;
  letter-spacing: 0;
  padding: 10px 16px;
  visibility: hidden;
  opacity: 0;
  transition: visibility ${ animations.mediumSpeed } ease-in-out, opacity ${ animations.mediumSpeed } ease-in-out;
  a {
    display: inline-block;
    padding: 3px 0;
    opacity: .6;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      left: 100%;
      width: 5px;
      height: 5px;
      transform: rotate(-45deg);
      border-bottom: 2px solid;
      border-right: 2px solid;
      border-color: ${ colors.mainColor };
      top: 50%;
      margin-top: -3px;
      opacity: 0;
      transition: transform ${ animations.mediumSpeed } ease-in-out, opacity ${ animations.mediumSpeed } ease-in-out;
    }
    &:hover {
      opacity: 1;
      &:after {
        opacity: 1;
        transform: rotate(-45deg) translate3d(5px, 5px, 0);
      }
    }
  }
`

const NavLinkStyle = (scrolled, active, hasAtf, dropdown) => `
  display: block;
  ${ typography.h6 }
  line-height: 1em;
  transition:   padding ${ animations.mediumSpeed } ease-in-out,
                margin ${ animations.mediumSpeed } ease-in-out,
                background ${ animations.mediumSpeed } ease-in-out,
                opacity ${ animations.mediumSpeed } ease-in-out,
                color ${ animations.mediumSpeed } ease-in-out;
  ${ hasAtf
    ? `
      color: inherit;
      ${ !active && '&:hover { opacity: .6; }' }
    `
    : `
      color: inherit;
      ${ !active && `&:hover { color: ${ colors.mainColor }; }` }
  ` }
`

const NavLink = styled(Link)`
  ${ props => NavLinkStyle(props.scrolled, props.active, props.hasAtf, props.hasDropdown) }
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
    ${ mq.mediumAndBelow } {
      ${ mobileMenuOpen ? `
        background: transparent;
        box-shadow: none;
        ${ headerHeight() }
      ` : '' }
    }
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
`

const HeaderContent = styled(Grid)``

const HeaderLogo = styled(Logo)`
  ${ util.responsiveStyles('width', 80, 50, 50, 40) }
  height: auto;
  transition: color ${ animations.mediumSpeed } ease-in-out, width ${ animations.mediumSpeed } ease-in-out;
  ${ ({ scrolled, hasAtf, mobileMenuOpen }) => scrolled ? `
    color: ${ colors.mainColor };
    ${ util.responsiveStyles('width', 50, 40, 40, 30) }
    ${ mq.mediumAndBelow } {
      ${ mobileMenuOpen ? `
        ${ util.responsiveStyles('width', 80, 50, 50, 40) }
      ` : '' }
    }
  ` : `
    ${ !hasAtf ? `
      color: ${ colors.mainColor };
    ` : `
      color: ${ colors.bgColor };
    ` }
  ` }
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
  navigation,
  title
}) => {
  const [bannerVisible, toggleBanner] = useState(true)

  const { mobileMenu, toggleMobileMenu } = useContext(AppContext)

  const pathname = location
  const pageHasAtf = hasAtf && !mobileMenu

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
                        medium={navigation && navigation.map((item, index) => {
                          // let link = item?.link?.content?.main?.slug?.current
                          let link = getSlugLink(item?.link)
                          const externalLink = item.externalLink
                          if (!item.title) {
                            return false
                          }
                          return (
                            <li key={'header-link-' + item._key}>
                              <NavLink
                                target={item.newTab && '_blank'}
                                external={externalLink}
                                scrolled={scrolled}
                                hasAtf={pageHasAtf}
                                to={externalLink ? externalLink : link}
                                active={'/' + pathname === link}
                                key={link}
                                // hasDropdown={link.dropdownLinks}
                              >
                                {item.title}
                              </NavLink>
                              {/*link.dropdownLinks && (
                                <Dropdown>
                                  {link.dropdownLinks.map((dropdownLink, index) => (
                                    <li key={dropdownLink.id}>
                                      <Link to={'/' + dropdownLink.to.slug}>{dropdownLink.label}</Link>
                                    </li>
                                  ))}
                                </Dropdown>
                              )*/}
                            </li>
                          )
                        })}
                      />
                    </NavLinks>
                  </div>
                  <LogoCol>
                    <Link to="/" title={title}>
                      <HeaderLogo
                        scrolled={scrolled}
                        hasAtf={pageHasAtf}
                        mobileMenuOpen={mobileMenu}
                      />
                    </Link>
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
        medium={<span />}
      />

    </Fragment>
  )
}

export default Header
