import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import InternalLink from 'components/internal-link'
import UnstyledList from 'components/unstyled-list'

import DarkThemeToggle from './dark-theme-toggle/dark-theme-toggle'

const Layout = styled.div`
  margin-bottom: 1.45em;
`

const Content = styled.div`
  margin: 0 auto;
  padding: 1em 1em;
  display: flex;
  align-items: center;
  min-height: 100px;
`

const Avatar = styled(BackgroundImage)`
  border-radius: 0.3em;
  overflow: hidden;
`

const Menu = styled.menu`
  margin: 0;
  margin-left: 2em;
  padding-left: 0;
  display: flex;
`

const MenuItems = styled(UnstyledList)`
  flex: none;
  display: flex;
  flex-flow: wrap;
`

const MenuItem = styled.li`
  margin-bottom: 0;

  & + & {
    margin-left: 1em;
  }

  ${MenuItems} {
    margin-left: 1em;

    &::before {
      content: '↳';
      margin-right: 0.5em;
    }
  }
`

const MenuLink = styled(InternalLink)`
  &.active {
    font-weight: bold;
  }
`

const Main = styled.div`
  flex: 1;
`

const Right = styled.div`
  flex: none;
`

export default function Header({ isIntro }) {
  const { avatar } = useStaticQuery(graphql`
    {
      avatar: file(relativePath: { eq: "images/avatar.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 36, height: 36, layout: FIXED)
        }
      }
    }
  `)

  return (
    <Layout>
      <Content>
        {!isIntro && (
          <>
            <GatsbyLink to="/">
              <Avatar
                loading="eager"
                fixed={avatar.childImageSharp.gatsbyImageData}
              />
            </GatsbyLink>
            <Menu>
              <MenuItems>
                <MenuItem>
                  <MenuLink to="/about/" activeClassName="active">
                    About
                  </MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuLink to="/posts/" activeClassName="active">
                    Posts
                  </MenuLink>
                </MenuItem>
                {/* <MenuItem>
                <MenuLink to="/photos/" activeClassName="active">
                  Photos
                </MenuLink>
              </MenuItem> */}
              </MenuItems>
            </Menu>
          </>
        )}
        <Main />
        <Right>
          <DarkThemeToggle />
        </Right>
      </Content>
    </Layout>
  )
}
