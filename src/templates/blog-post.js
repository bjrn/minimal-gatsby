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

// Below works
// markdownRemark(fields: { slug: { eq: "en-nyhet" } }) {
export const query = graphql`
  {
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
