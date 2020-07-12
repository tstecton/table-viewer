/**
 * Our core domain models for rendering CSV tables.
 */

// Basic data about a table.
export interface TableData {
  name: string
  url: string
  row_count: number
}

// Data for rendering a histogram bar chart.
export interface Histogram {
  step: number
  min: number
  max: number
  buckets: number[]
}

// Basic summary stas.
export interface Stats {
  nullCount: number
  min: number
  max: number
  mean: number
  stdDev: number
  histogram: Histogram

  // Flag for identifying if these stars are useful.
  // i.e. the data looks like numbers.
  numeric: boolean
}

// Whenever we can treat data as a number we should do so.
// Otherwise, it's a string.
export type Value = number | string

// The contents of our table, including summarized data and histogram.
export interface TableContents {
  columns: string[]
  values: Value[][]
  stats: Stats[]
}
