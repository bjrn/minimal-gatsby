import React from "react"
import { graphql } from "gatsby"

class BlogPost extends React.Component {
  render() {
    const { data } = this.props
    console.log("data ", data)
    console.log("this.props.pageContext.slug ", this.props.pageContext.slug)

    return (
      <div>
        <div>FML</div>
      </div>
    )
  }
}

export default BlogPost

// you need a `query` inside the graphql thingy to declare the param(s)
// ie. query BlogPostQuery($slug: String!) { 
export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        date
        slug
        path
        layout
      }
    }
  }
`
