import { useState } from 'react'
import './index.css'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [num, setNum] = useState(false)
  const [char, setChar] = useState(false)
  let [password,setPassword] = useState()

  const arr = [0,1,2,3,4,5,6,7,8,9]
  const specialChar = ['#', '$', '%', '&', '*', '[', ']', '>', '<', '?']
  const container = []

  for (let c = 97; c <= 122; c++) {
      container.push(String.fromCharCode(c));
  }

  const gen_password = useCallback(() => {
    let finalStore = [...container]
    if(num){
      finalStore = [...finalStore, ...arr]
    }
    if(char){
      finalStore = [...finalStore, ...specialChar]
    }

    let ans="" 
    const max = finalStore.length
    const min = 0
    for(let i=0; i<length; i++){
      let idx = Math.floor(Math.random() * finalStore.length);
      ans+=finalStore[idx]
    }
    return ans;
  }, [length,num,char])

  useEffect(() => {
    setPassword('')
    setPassword(gen_password())
  }, [length, char, num,gen_password])



 const copyMethod = useCallback(() => {
    passwordRef.current?.select();
    //yeh bas selection range ko highlight kr deta h 
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  const changeLen = (e) => (
    setLength(Number(e.target.value))
  )

  const passwordRef = useRef(null)

  return (
    <>
      <div className='min-h-screen w-full  bg-amber-100'>
        <h1 className='text-4xl text-center font-bold text-amber-950 mb-8 pt-7'>
          Password Generator
        </h1>
        <div className='flex items-center justify-center'>
          <div className='bg-amber-700 mt-20 w-175 rounded-xl shadow-xl p-2'>
            <div className='p-3'>
              <div className='flex'>
                <input type='text' className='font-bold bg-amber-50 text-2xl w-[90%]' value={password} 
                ref={passwordRef}
                readOnly placeholder='Generated Password'></input>
                <button className='text-white bg-blue-400 cursor-pointer h-10 w-20 text-xl font-semibold' onClick={copyMethod}>Copy</button>
              </div>
              <div className='mt-7 flex justify-between text-2xl text-amber-50'>
                <input type="range" min="0" max="100" value={length} onChange={changeLen}></input>
                <p className=''>Length ({length}) </p>
                <div> <input type='checkbox' className='mr-2' onChange={(e) => setNum(e.target.checked)}/>Numbers </div>
                <div><input type='checkbox' className='mr-2' onChange={(e) => setChar(e.target.checked)}/>Characters </div>
              </div>
            </div>

          </div>
        </div>
      </div>


            
    </>
  )
}

export default App
