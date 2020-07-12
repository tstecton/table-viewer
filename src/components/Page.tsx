import React from "react"

import {
  Navbar,
  NavbarHeading,
  NavbarDivider,
  NavbarGroup,
  Breadcrumbs,
  IBreadcrumbProps,
} from "@blueprintjs/core"
import styled from "@emotion/styled"
import { useHistory } from "react-router"

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  position: absolute;
`

interface Props {
  title?: string
}

// For rendering a single page anywhere in our app.
const Page: React.FC<Props> = (props) => {
  const history = useHistory()
  const goHome = () => history.push("/")
  const breadcrumbs: IBreadcrumbProps[] = [
    {
      onClick: props.title ? goHome : undefined,
      text: "Index",
    },
  ]
  if (props.title) {
    breadcrumbs.push({
      text: props.title,
    })
  }
  return (
    <PageContainer>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Table Viewer</NavbarHeading>
          <NavbarDivider />
          <Breadcrumbs items={breadcrumbs} />
        </NavbarGroup>
      </Navbar>
      {props.children}
    </PageContainer>
  )
}

export default Page
