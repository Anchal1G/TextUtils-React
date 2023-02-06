import React,{useState} from "react";

export default function TextForm(props) {

    function toTitle(value) {
        let myVal = value.toLowerCase();
        let newVal = myVal.split(" "); //words

        let newArr =[];

        for(let i=0;i<newVal.length;i++){
            let arrVal = newVal[i][0].toUpperCase()+ newVal[i].slice(1);
            newArr.push(arrVal);
        }
        return newArr.join(" ");
    }

    const handleTitleClick=()=>{
        let newText = toTitle(text);
        setText(newText);
    }

    const handleUpClick=()=>{
        // console.log("UpperCase Invoked");
        let newText = text.toUpperCase();
        setText(newText);
    }

    const handleLowClick=()=>{
        // console.log("LowerCase Invoked");
        let newText = text.toLowerCase();
        setText(newText);
    }

    const handleClearClick=()=>{
        setText('');
    }

    const handleCopyClick=()=>{
        var text = document.getElementById("mybox");
        text.select();
        text.setSelectionRange(0,9999);
        navigator.clipboard.writeText(text.value);    
    }

    const handleExtraSpace=()=>{
        let newText = text.split(/[ ]+/); //remove 1 or more space
        setText(newText.join(" "));
    }

    const handleOnChange=(event)=>{
        
        setText(event.target.value);  //use to type in text area
    }

    const handleSpeak=()=>{
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;

        window.speechSynthesis.speak(msg);
    }

    const handleDownload=()=>{
        const ele = document.createElement("a");
        const file = new Blob([text],{
            type : "text/plain"
        });
        ele.href = URL.createObjectURL(file);
        ele.download = "myFile.txt";
        ele.click();
    }

    const[text,setText] = useState('');
    //text = "new text"; --wrong way to set text or update text
    //setText("new Text"); //correct way
  return (
    <  >
      <div style={{ color:props.mode ==='dark'?'white':'black'}} >
        <h4>{props.heading}</h4>
        <div className="mb-3">
          <textarea
            className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor : props.mode ==='dark'?'rgb(23 38 49)':'white' , color:props.mode ==='dark'?'white':'black' }}  id="mybox"
            rows={8}
            // defaultValue={""}
          />
          <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to UpperCase</button>
          <button className="btn btn-primary mx-1" onClick={handleLowClick}>Convert to LowerCase</button>
          <button className="btn btn-primary mx-1" onClick={handleClearClick}>ClearText</button>
          <button className="btn btn-primary mx-1" onClick={handleCopyClick}>CopyText</button>
          <button className="btn btn-primary mx-1" onClick={handleExtraSpace}>Remove XSpaces</button>
          <button className="btn btn-primary mx-1" onClick={handleTitleClick}>Convert to TitleCase</button>          
          <button className="btn btn-primary mx-1" type="submit" onClick={handleSpeak}>Speak</button>
          <button className="btn btn-primary mx-1" onClick={handleDownload}>Download Text</button>

        </div>

        <div className="container my-3" style={{ color:props.mode ==='dark'?'white':'black'}} >
            <h4>Your Text Summary</h4>
            <p>{text.split(" ").length} words and {text.length} characters </p>
            <p>{0.008 * text.split(" ").length} Minutes read</p>

            <h4>Preview</h4>
            <p>{text.length>0? text :'Please Enter in textbox above Something to Preview'}</p>
        </div>
      </div>
    </>
  );
}
