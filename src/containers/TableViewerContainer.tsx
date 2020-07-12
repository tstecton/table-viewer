import React from "react"
import { TableContents } from "../models/TableData"
import TablesApi from "../api/TablesApi"
import Page from "../components/Page"
import { useParams, useHistory } from "react-router"
import InvalidTable from "../components/InvalidTable"
import TableViewer from "../components/TableViewer"
import { Spinner } from "@blueprintjs/core"

// Fetch the table's data, as provided in the URL.
// If the table in the URL is invalid alert the user.
const TableViewerContainer = () => {
  const { tableName } = useParams()
  const history = useHistory()
  const [
    tableContents,
    setTableContents,
  ] = React.useState<TableContents | null>(null)
  const [invalidTable, setInvalidTable] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    setInvalidTable(false)
    setLoading(true)
    TablesApi.fetchTableContents(tableName)
      .then((contents) => {
        // If contents are null the table was invalid.
        if (contents) {
          setTableContents(contents)
        } else {
          setInvalidTable(true)
        }
        setLoading(false)
      })
      .catch(() => history.push("/error"))
  }, [tableName, history])

  return (
    <Page title={tableName}>
      {loading ? (
        <Spinner />
      ) : invalidTable || !tableContents ? (
        <InvalidTable tableName={tableName} />
      ) : (
        <TableViewer table={tableContents} />
      )}
    </Page>
  )
}

export default TableViewerContainer
