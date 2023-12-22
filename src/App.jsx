import { useState, useCallback, useEffect, useRef} from 'react'


function App() {
  
const [length, setLength] = useState(8)
const [numberAllowed, setnumberAllowed] = useState(false)
const [charAllowed, setLengthcharallowed] = useState(false)
const [Password, setPassword] = useState("")

//useRef hook
const PasswordRef = useRef(null)

const PasswordGenerator = useCallback(() => {
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWLXYZabcdefghijklmnopqrstuvwxyz"

if(numberAllowed) str += "0123456789"
if(charAllowed) str += "!@#$%^&*(){}[]+_-=,"


for (let i = 1; i <= length; i++){
  let char = Math.floor(Math.random() * str.length + 1)
  pass += str.charAt(char)
 }
 
 setPassword(pass)
 
}, [length, numberAllowed, charAllowed, setPassword])

const copyPasswordToClipboard = useCallback(() => {
  PasswordRef.current?.select();
  PasswordRef.current?.setSelectionRange(0, 3)
  window.navigator.clipboard.writeText(Password)
}, [Password])

useEffect(() => {
  PasswordGenerator()
}, [length, numberAllowed, charAllowed, PasswordGenerator])

  return (
 <>
<div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3   my-8 bg-gray-800 text-orange-500'>
  <h1 className='text-white text-center'>Password generator</h1>
  <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input 
    type="text"
    value={Password}
    className='outline-none w-full py-1 px-3'
    placeholder='Password'
    readOnly
    ref={PasswordRef}
    />
    <button
    onClick={copyPasswordToClipboard}
    className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
  </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input
       type="range"
       min={6}
       max={100} 
       value={length}
       className='cursor-pointer'
       onChange={(e) => {setLength(e.target.value)}}
       />
       <label>Length: {length}</label>
    </div>
    <div className='"flex items-center gap-x-1'>
      <input
       type="checkbox"
       defaultChecked={numberAllowed}
       id="numberInput"
       onChange={() => {
        setnumberAllowed((prev) => !prev)
       }}
       />
       <label htmlFor="numberInput">Numbers</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input
       type="checkbox"
       defaultChecked={charAllowed}
       id="characterInput"
       onChange={() => {
        setLengthcharallowed((prev) => !prev)
       }}
        />
        <label htmlFor="characterInput">Characters</label>
    </div>
  </div>
  <div>
   
  </div>
</div>
 
 </>
  )
}

export default App

