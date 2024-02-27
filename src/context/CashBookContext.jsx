import { createContext, useState, useContext, useReducer} from 'react';

const initialState = {
  transactions: []
}

function cashBookReducer(state, action){
  switch(action.type){
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      }
    default:
      return state
  }
}

export const CashBookContext = createContext();

export function CashBookProvider({children}){
  const [state, dispatch] = useReducer(cashBookReducer, initialState)
  // const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    dispatch({type: 'ADD_TRANSACTION', payload: transaction})
    // setTransactions([...transactions, transaction])
    // setTransactions(prevTransactions => [...prevTransactions, transaction])
  }

  const deleteTransaction = (id) => {
    dispatch({type: 'DELETE_TRANSACTION', payload: id})
    // setTransactions(prevTransactions =>{ 
    //   console.log(prevTransactions.filter(transaction => transaction.id !== id));
      
    //   // prevTransactions.filter(transaction => transaction.id !== id}))
    //   return prevTransactions.filter(transaction => transaction.id !== id)
  // })
  }

  return (
    <CashBookContext.Provider value={{transactions: state.transactions, addTransaction, deleteTransaction}}>
      {children}
    </CashBookContext.Provider>
  )
}

export function useCashBook(){
  const context = useContext(CashBookContext);

  if(context === undefined){
    throw new Error('useCashBook must be used within a CashBookProvider')
  }

  return context
}