import { Menu, MenuItem } from "@blueprintjs/core"
import { Cell, Column, ColumnHeaderCell, Table } from "@blueprintjs/table"
import styled from "@emotion/styled"
import { orderBy } from "lodash"
import React from "react"
import { TableContents, Value } from "../models/TableData"
import HistogramChart from "./HistogramChart"
import StatTooltip from "./StatTooltip"

interface Props {
  table: TableContents
}

const TableContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const ResponsiveTable = styled(Table)`
  flex-grow: 1;
`

interface Sort {
  colIdx: number
  dir: "asc" | "desc"
}

// Renders sortable a table to view and interact with CSVs.
const TableViewer: React.FC<Props> = (props) => {
  const {
    table,
    table: { columns, stats },
  } = props

  const [sort, setSort] = React.useState<Sort | null>(null)
  const [sortedValues, setSortedValues] = React.useState<Value[][]>([[]])

  // Reactively sort the table when either the values or sort changes.
  React.useEffect(() => {
    if (sort) {
      const sorted = orderBy(
        table.values,
        [(row) => row[sort.colIdx]],
        [sort.dir]
      )
      console.log(sorted)
      setSortedValues(sorted)
    } else {
      setSortedValues(table.values)
    }
  }, [table.values, sort])

  // Memoize this, it gets called a lot.
  const cellRenderer = React.useCallback(
    (row: number, col: number) => {
      return <Cell>{sortedValues[row][col]}</Cell>
    },
    [sortedValues]
  )

  const sortMenuRenderer = (colIdx?: number) => {
    const setSortDir = (dir: "asc" | "desc") => {
      if (colIdx) {
        setSort({
          colIdx,
          dir,
        })
      }
    }
    return (
      <Menu>
        <MenuItem
          icon="sort-asc"
          onClick={() => setSortDir("asc")}
          text="Sort Asc"
        />
        <MenuItem
          icon="sort-desc"
          onClick={() => setSortDir("desc")}
          text="Sort Desc"
        />
      </Menu>
    )
  }

  const headerRenderer = (row: number) => {
    const rowStats = stats[row]
    const histogram = rowStats.histogram
    return (
      <ColumnHeaderCell name={columns[row]} menuRenderer={sortMenuRenderer}>
        {rowStats.numeric ? (
          <>
            <HistogramChart histogram={histogram} />
            <StatTooltip stats={rowStats} />
          </>
        ) : null}
      </ColumnHeaderCell>
    )
  }

  return (
    <TableContainer>
      <ResponsiveTable numRows={sortedValues.length}>
        {columns.map((col, i) => {
          return (
            <Column
              key={i}
              cellRenderer={cellRenderer}
              columnHeaderCellRenderer={headerRenderer}
            />
          )
        })}
      </ResponsiveTable>
    </TableContainer>
  )
}

export default TableViewer
