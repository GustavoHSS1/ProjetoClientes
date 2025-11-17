import React from 'react'
import CustomerList from './components/CustomerList'

export default function App(){
  return (
    <div className="app">
      <header className="app-header">
        <h1>Projeto Clientes</h1>
      </header>
      <main>
        <CustomerList />
      </main>
    </div>
  )
}
