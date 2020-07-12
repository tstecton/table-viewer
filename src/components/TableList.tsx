import { Card, H5 } from "@blueprintjs/core"
import styled from "@emotion/styled"
import React from "react"
import { Link } from "react-router-dom"
import { TableData } from "../models/TableData"

interface Props {
  tables: TableData[]
  viewTable(table: TableData): void
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const PaddedCard = styled(Card)`
  margin: 16px;
  max-width: 800px;
  min-width: 400px;
`

// Renders a clickable list of tables for navigation.
const TableList: React.FC<Props> = (props) => {
  return (
    <Container>
      {props.tables.map((table) => (
        <PaddedCard
          key={table.url}
          interactive
          elevation={0}
          onClick={() => props.viewTable(table)}
        >
          <H5>
            <Link to={`/${table.name}`}>{table.name}</Link>
          </H5>
          <p>Row count: {table.row_count}</p>
        </PaddedCard>
      ))}
    </Container>
  )
}

export default TableList
