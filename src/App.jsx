import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Items from './components/Items'
import ItemsId from './components/ItemsId'

const App = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/items' component={Items}/>
    <Route path='/items/:id' component={ItemsId}/>
  </Switch>
)

export default App
