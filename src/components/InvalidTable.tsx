import { NonIdealState } from "@blueprintjs/core"
import React from "react"
import { Link } from "react-router-dom"

interface Props {
  tableName: string
}

// Placeholder for an invalid requested table.
const InvalidTable: React.FC<Props> = (props) => {
  return (
    <NonIdealState
      icon="search"
      title={`Invalid table ${props.tableName}`}
      action={<Link to="/">Go Back</Link>}
    />
  )
}

export default InvalidTable
