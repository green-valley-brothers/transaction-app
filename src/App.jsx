import './App.css'

import { CashBookProvider } from './state/context/CashBookContext'
import { AddTransactionForm } from './components/AddTransactionForm/AddTransactionForm'
import { TransactionList } from './components/TransactionList/TransactionList'

function App() {
  return (
    <CashBookProvider>
      <AddTransactionForm/>
      <TransactionList />
    </CashBookProvider>
  )
}

export default App
