import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'
import { IoCopy } from "react-icons/io5";


function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  //useRef HOOK
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "!@#$%^&*?~`+_-="

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]'>
      <h2 className='start text-[6vw] leading-none tracking-tighter font-semibold text-zinc-900 pb-10'>Password Generator</h2>
      <div className='w-full max-w-md mx-auto rounded-full bg-white px-4 py-4 text-black'>
        <div className='flex rounded-full overflow-hidden'>
          <input ref={passwordRef} type='text' value={password} placeholder='Password' className='outline-none w-full py-1 px-3 text-xl' readOnly></input>
          <button onClick={copyPasswordToClipboard} className='mr-2'><IoCopy size="1.5em"/></button>
        </div>
      </div>

      <div className='flex w-full justify-center max-w-prose mx-auto rounded-full text-black text-xl mt-5 gap-4'>
        <div className='flex item-center'>
          <input type="range" min={6} max={100} value={length} onChange={(e) => {setLength(e.target.value)}} className='mr-2 cursor-pointer'/>
          <label className='start '>Length : {length}</label>
        </div>

        <div className='flex item-center'>
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={() => {setNumberAllowed((prev) => !prev)}} className='mr-1 cursor-pointer'/>
          <label className='start '>Numbers</label>
        </div>

        <div className='flex item-center'>
          <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={() => {setCharAllowed((prev) => !prev)}} className='mr-1 cursor-pointer'/>
          <label className='start '>Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
