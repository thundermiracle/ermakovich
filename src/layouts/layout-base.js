import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'

import { ThemeContext } from 'components/theme'

import './layout.css'

function LayoutBase({ children }) {
  const { isDark } = useContext(ThemeContext)

  const { site, favicon } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
      favicon: file(relativePath: { eq: "images/avatar.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 96, height: 96, layout: FIXED)
        }
      }
    }
  `)

  return (
    <>
      <Helmet
        title={site.siteMetadata.title}
        meta={[
          {
            name: 'description',
            content: site.siteMetadata.description,
          },
        ]}
        link={[
          {
            rel: 'shortcut icon',
            type: 'image/png',
            href: getSrc(favicon),
          },
        ]}
        htmlAttributes={{ lang: 'en', theme: isDark && 'dark' }}
      />
      {children}
    </>
  )
}

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutBase
