import {useState} from 'react'


export function GeneralComponent(){
  const [otherName, setOtherName] = useState('');

  let name = 'Charles'

  return <div>
    <h1>
      {otherName}
    </h1>
    <button onClick={() => {
      setOtherName('simon')
    }}>
      Simon
    </button>
  </div>
}