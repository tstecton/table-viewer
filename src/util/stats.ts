import { Value, Stats, Histogram } from "../models/TableData"
import { isNumber, isNil } from "lodash"

/**
 * All logic for stats and histogram calculation go here.
 */

const getHistogram = (
  count: number,
  max: number,
  min: number,
  values: Value[][],
  col: number
): Histogram => {
  // Minimum of 5 buckets. Bucket params need tuning.
  const numBuckets = Math.max(7, Math.ceil(Math.sqrt(count)))
  const step = (max - min) / numBuckets
  const buckets: number[] = new Array(numBuckets + 1).fill(0)

  // Go through each value and find what bucket it belongs in.
  for (let i = 0; i < count; i++) {
    const v = values[i][col]
    if (isNumber(v)) {
      const bucket = Math.ceil(Math.abs((v - min) / step))
      buckets[bucket] = buckets[bucket] + 1
    }
  }

  return { step, buckets, min, max }
}

const calculateStatsForCol = (values: Value[][], col: number): Stats => {
  // Initialize the stats values.
  let nullCount = 0
  let min = 0
  let max = 0
  let sum = 0
  let sumOfSquares = 0 // Needed for stdDev.
  let count = values.length
  // Flag if we've found at least a single number.
  let numeric = false

  // Go through each value and iteratively update the values.
  for (let i = 0; i < count; i++) {
    const v: Value = values[i][col]
    if (isNil(v)) {
      console.log(values, i, col, values[i])
      nullCount++
    }
    if (isNumber(v)) {
      numeric = true
      min = Math.min(min, v)
      max = Math.max(max, v)
      sum += v
      sumOfSquares += v * v
    }
  }

  const mean = sum / count
  // This formula allows us to calculate stdDev without iterating through the array again.
  // TODO: Check that this is correct? :)
  const stdDev = round(Math.sqrt(sumOfSquares / count - mean * mean), 4)

  return {
    nullCount,
    min,
    max,
    mean: round(mean, 4),
    stdDev,
    histogram: getHistogram(count, max, min, values, col),
    numeric,
  }
}

// Smooth rounding for displaying optional decimals.
// e.g. round(1) === 1, round(.123) = .12
export const round = (v: number, decimals = 2) => {
  return +v.toFixed(decimals)
}

export const calculateStats = (values: Value[][]): Stats[] => {
  return values[0].map((row, i) => calculateStatsForCol(values, i))
}
