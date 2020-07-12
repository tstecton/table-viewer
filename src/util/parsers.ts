import { TableContents, Value } from "../models/TableData"
import { calculateStats } from "./stats"

/**
 * Contains utils for parsing raw data into our models.
 */

// A util to split and pop the last value.
// Useful for when the last character is the thing you're splitting on.
// Ex: splitPop("1;2;", ";") => [1,2]
const splitPop = (str: string, split: string) => {
  const ar = str.split(split)
  ar.pop()
  return ar
}

// Parse anything that looks like a number into a number.
const parseValue = (v: any): Value => {
  return isNaN(v) ? v : +v
}

// Parse a csv string into a table.
export const parseTable = (csv: string): TableContents => {
  const [columns, ...values] = splitPop(csv, "\n").map((row) =>
    splitPop(row, ",").map(parseValue)
  )
  return {
    // Make sure cols are strings.
    columns: columns.map(String),
    // Drop the last elem to deal with CSV ennding w
    values: values.slice(0, values.length - 1),
    stats: calculateStats(values),
  }
}
