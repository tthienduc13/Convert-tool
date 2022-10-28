import { useEffect,useRef,useState } from "react";

function App() {
  const inputRef= useRef();
  const[output,setOutput]= useState("")
  const[inputValue,setInputValue] = useState("")
  const[inputMetValue,setInputMetValue] = useState("km")
  const[outputMetValue,setOutputMetValue] = useState("km")
  const[message,setMessage] = useState("")
  let check = 0;
  let checkInput
  useEffect(()=>{
    setOutput(0)
  },[inputValue]) 
  
  const met=()=>{
    switch (inputMetValue){
      case 'km':
        return  +inputValue * 1000;
      case 'ha':
        return  +inputValue *100;
      case 'dam':
        return  +inputValue *10;
      case 'm':
        return  +inputValue;
      case 'dm':        
        return  +inputValue *0.1;
      case 'cm':        
        return  +inputValue *0.01;
      case 'mm':        
        return  +inputValue *0.001;
    }

  }
  const out=()=>{
    switch (outputMetValue){
      case 'km':
        return  checkInput *0.001;
      case 'ha':
        return  checkInput *0.0100;
      case 'dam':
        return  checkInput *0.1;
      case 'm':
        return  checkInput;
      case 'dm':        
        return  checkInput *10;
      case 'cm':        
        return  checkInput *100;
      case 'mm':        
        return  checkInput *1000;
    }
  }
  const isNumber= (inputValue)=>{
    if (Number.isNaN(+inputValue)  === false){
      return "true"
    }else {
      setInputValue('')
      setMessage("Input value is not a number, please enter again!")
      return "false"
    }
  }
  const handleConvert = (e) =>{
    if(inputValue !== "" ){
      if (isNumber(inputValue) === "false"){
        return;
      }
      if (inputMetValue === ""){
        setMessage("Please choose the value of input")
      }else if(outputMetValue ===''){
        setMessage("Please choose the value of output")
      }
      checkInput = met()
      setOutput(String(out()))
      inputRef.current.focus();
      if(output!=0){
        inputRef.current.focus();
        setInputValue('')
      }
      setMessage("Successful!")
    }else{
      setMessage("Please enter something!")
    }
  }
  const handleMetValue = (e)=>{
    setInputMetValue(e.target.value)

  }
  const handleMetValueOutput = (e)=>{
    setOutputMetValue(e.target.value)
  }
  const handleOnChange = (e)=>{
    setInputValue(e.target.value)
  }
  const handleOnKeyDown = (e) =>{
    if (e.code === "Enter"){
      handleConvert();
    }
  }
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-slate-500">
        <div className="flex flex-col h-[400px] w-[960px] bg-slate-300 shadow-2xl drop-shadow-2xl rounded-3xl p-5">
          <div className="w-full text-3xl h-fit font-semibold text-center uppercase border-b-indigo-400 border-b-4 p-4 ">
            Convert tool
          </div>
          <div className="mt-20 flex flex-row justify-around">
            <div className="flex flex-col w-1/4">
              <input type="text" className="text-3xl rounded-lg p-2"
              onChange={(e)=>handleOnChange(e)}
              onKeyDown={(e)=>handleOnKeyDown(e)}
              ref={inputRef}
              value={inputValue}
              ></input>
              <select className="mt-4 h-[36px] rounded-lg"
               onChange={(e)=>handleMetValue(e)}>
                <option value="km">Km</option>
                <option value="ha">Ha</option>
                <option value="dam">Dam</option>
                <option value="m">M</option>
                <option value="dm">Dm</option>
                <option value="cm">Cm</option>
                <option value="mm">Mm</option>
              </select>
            </div>
            <div className="flex flex-col w-[300px]">
              <button type="" className=" mt-[24px] h-14 bg-[#eb6868] rounded-lg font-semibold uppercase text-3xl text-white hover:animate-bounce hover:opacity-80" onClick={handleConvert}>Convert</button>
              <div className={message === "Successful!" ? "mt-4 italic text-center text-2xl text-green-700" : "mt-4 italic text-center text-2xl text-red-900 animate-pulse "}>{message}</div>
            </div>
            <div className="flex flex-col w-1/4">
              <input type="text" value={output} className="text-3xl rounded-lg p-2"></input>
              <select onChange={(e)=>handleMetValueOutput(e)} className="mt-4 h-[36px] text-lg rounded-lg">
                <option value="km">Km</option>
                <option value="ha">Ha</option>
                <option value="dam">Dam</option>
                <option value="m">M</option>
                <option value="dm">Dm</option>
                <option value="cm">Cm</option>
                <option value="mm">Mm</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
