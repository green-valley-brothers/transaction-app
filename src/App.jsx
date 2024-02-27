import './App.css'
import { CashBookProvider } from './context/CashBookContext'
import AddTransactionForm from './context/components/AddTransactionForm'
import TransactionList from './context/components/TransactionList'

function App() {
  return (
    <CashBookProvider>
      <AddTransactionForm/>
      <TransactionList />
    </CashBookProvider>
  )
}

export default App
