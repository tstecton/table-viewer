import { Classes, Tooltip } from "@blueprintjs/core"
import styled from "@emotion/styled"
import React from "react"
import { Stats } from "../models/TableData"

const StatText = styled.div`
  font-size: 11px;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
`

const Container = styled.div`
  padding: 1px 6px;
`

interface Props {
  stats: Stats
}

// Tooltip for displaying a stats object.
const StatTooltip: React.FC<Props> = (props) => {
  const { stats } = props
  const statElements = (
    <div>
      <StatText>Null Count: {stats.nullCount}</StatText>
      <StatText>Min: {stats.min}</StatText>
      <StatText>Max: {stats.max}</StatText>
      <StatText>Mean: {stats.mean}</StatText>
      <StatText>StdDev: {stats.stdDev}</StatText>
    </div>
  )
  return (
    <Container>
      <Tooltip className={Classes.TOOLTIP_INDICATOR} content={statElements}>
        Statistics
      </Tooltip>
    </Container>
  )
}

export default StatTooltip
