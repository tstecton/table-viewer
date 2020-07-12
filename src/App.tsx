import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import TableListContainer from "./containers/TableListContainer"
import TableViewerContainer from "./containers/TableViewerContainer"
import { Callout } from "@blueprintjs/core"

// Mostly just sets up our routes.
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <TableListContainer />
        </Route>
        <Route path="/error" exact>
          <Callout intent="danger">Server error, try again later.</Callout>
        </Route>
        <Route path="/table/:tableName" exact>
          <TableViewerContainer />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
