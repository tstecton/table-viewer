import Cache from "lru-cache"
import { TableConstants } from "../constants/TableConstants"
import { TableContents, TableData } from "../models/TableData"
import { parseTable } from "../util/parsers"

/**
 * This file contains a caching API for fetching all of our table-related data.
 * Also handles parsing the raw values into a more manageable format.
 */

// Caches for avoiding extra fetches.
const tableCache = new Cache<string, TableData>(50)
const contentsCache = new Cache<string, TableContents>(50)

// Fetch the list of tables.
// Not cached.
const fetchTables = (): Promise<TableData[]> => {
  return fetch(TableConstants.TABLES_URL)
    .then((resp) => resp.json())
    .then((data: TableData[]) => {
      data.forEach((d) => tableCache.set(d.name, d))
      return data
    })
}

// Fetch and parse the CSV from the provided url.
// May return a cached value.
const fetchTableCSV = (url: string): Promise<TableContents> => {
  const cached = contentsCache.get(url)
  if (cached) {
    return Promise.resolve(cached)
  }
  return fetch(url)
    .then((resp) => resp.text())
    .then((csv) => parseTable(csv))
    .then((values) => {
      contentsCache.set(url, values)
      return values
    })
}

// Fetch table contents for the provided table name.
// Assumes tableName is a unique key for the data set.
// Returns null if an invalid table name is provided
// May return a cached value.
const fetchTableContents = (
  tableName: string
): Promise<TableContents | null> => {
  const cachedTable = tableCache.get(tableName)
  if (cachedTable) {
    return fetchTableCSV(cachedTable.url)
  } else {
    return fetchTables().then((tables) => {
      const table = tables.find((t) => t.name === tableName)
      // If the table name wasn't found return null so the caller can handle that case.
      if (table) {
        return fetchTableCSV(table.url)
      } else {
        return null
      }
    })
  }
}

const TablesApi = {
  fetchTables,
  fetchTableContents,
}

export default TablesApi
