import React from "react"
import { useHistory } from "react-router"
import TablesApi from "../api/TablesApi"
import Page from "../components/Page"
import TableList from "../components/TableList"
import { TableData } from "../models/TableData"

// Fetch the list of tables and render them.
const TableListContainer = () => {
  const history = useHistory()

  const [tables, setTables] = React.useState<TableData[]>([])

  React.useEffect(() => {
    TablesApi.fetchTables()
      .then(setTables)
      .catch(() => history.push("/error"))
  }, [history])

  const viewTable = (table: TableData) => {
    history.push(`/table/${table.name}`)
  }

  return (
    <Page>
      <TableList tables={tables} viewTable={viewTable} />
    </Page>
  )
}

export default TableListContainer
