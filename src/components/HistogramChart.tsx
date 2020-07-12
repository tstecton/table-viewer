import React from "react"
import { Histogram } from "../models/TableData"
import { BarChart, Bar, Tooltip } from "recharts"
import styled from "@emotion/styled"
import { round } from "lodash"

interface Props {
  histogram: Histogram
}

const TooltipContent = styled.div`
  background-color: white;
  padding: 2px 4px;
  border: 1px solid blue;
  border-radius: 4px;
  max-width: 120px;
  line-height: initial;
`

// Renders a mini bar chart representing a histogram.
const HistogramChart: React.FC<Props> = (props) => {
  const { histogram } = props

  // Format the data for a bar chart, storing the bar's value and the
  // histogram range it represents.
  const data = histogram.buckets.map((value, i) => {
    let min = round(histogram.min + histogram.step * i)
    let max = round(histogram.min + histogram.step * (i + 1))
    return {
      value,
      min,
      max,
    }
  })

  // A custom tooltip to allow Recharts to display the range of values.
  const HistogramTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (!active) {
      return <div />
    }
    const { min, max, value } = payload[0].payload
    return (
      <TooltipContent>
        {min} to {max} Count: {value}
      </TooltipContent>
    )
  }

  return (
    <BarChart width={150} height={80} data={data}>
      <Bar dataKey="value" fill="#8884d8" />
      <Tooltip content={<HistogramTooltip />} />
    </BarChart>
  )
}

export default HistogramChart
