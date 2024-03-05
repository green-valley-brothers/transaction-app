import { useCashBook } from "../../state/context/CashBookContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
});

export function AddTransactionForm() {
  const {addTransaction} = useCashBook()
  // const [description, setDescription] = useState('')
  // const [amount, setAmount] = useState(0)

  const handleSubmit = (values, {resetForm}) => {
    // e.preventDefault();
    addTransaction({...values, id: Date.now()})
    resetForm()
    // setDescription('')
    // setAmount(0)
  }

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input type='text' value={description} onChange={e => setDescription(e.target.value)}/>
  //     <input type='number' value={amount} onChange={e => setAmount(e.target.value)}/>
  //     <button type='submit'>Add Transaction</button>
  //   </form>
  // )

  return (
    <Formik
      initialValues={{description: '', amount: 0}}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({errors, touched}) => (
        <Form>
          <Field name="description" />
          {errors.description && touched.description ? (
            <div>{errors.description}</div>
          ): null}
          <Field name="amount" type="number" />
          {errors.amount && touched.amount ? (
            <div>{errors.amount}</div>
          ): null}
          <button type="submit">Add Transaction</button>
        </Form>
      )}
    </Formik>
  )
}

export default AddTransactionForm
