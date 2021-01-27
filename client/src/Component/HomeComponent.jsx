import React,{useEffect,useState} from 'react'
import axios from 'axios'
import AllFlightComponent from './AllFlightComponent'

export default function HomeComponent() {

    const [flightDetails, setFlightDetails] = useState([])
    const [sliderval,setSlider] = useState("")
    const [flag, setFlag] = useState("oneway")
    const [userInput,setUserInput] = useState({
        origin:"",destination:"",departure:"",return:"",pass:""
    })
    const [filterInput, setFilterInput] = useState()
    useEffect(() => {
        axios.get('/getFlightDetails')
            .then(res => {
                setFlightDetails(res.data)
            })
    }, [])

    let onewaySubmit = (e) =>{
        e.preventDefault()
        if(userInput.origin && userInput.destination && 
            userInput.departure && userInput.pass)
            {
            setFilterInput(userInput)
            setUserInput({
                origin: "", destination: "", departure: "", return: "", pass: ""
            })
            }
        else{
            alert("Please fill all the details")
        }
        
    }
    let returnSubmit = (e) =>{
        e.preventDefault()
        if (userInput.origin && userInput.destination &&
            userInput.departure && userInput.pass && userInput.return) {
            setFilterInput(userInput)
            setUserInput({
                origin: "", destination: "", departure: "", return: "", pass: ""
            })
        }
        else {
            alert("Please fill all the details")
        }
        
    }
    return (
        <div className="container">
            <h1 style={{textAlign:"center",marginBottom:"10px",fontSize:"3.3rem"} }>Flight Search Engine</h1>

            <div className="main-container">
                <div className="left-container">
                    <div>
                        <button id="oneway" style={{backgroundColor:"lightblue"}} className="userBtn" onClick={()=>{
                            setFlag("oneway")
                            document.getElementById("oneway").style.backgroundColor="lightblue"
                            document.getElementById("return").style.backgroundColor = "white"
                            }
                        }>One Way</button>
                        <button id="return" className="userBtn" onClick={() =>{ 
                            setFlag("return")
                          
                            document.getElementById("oneway").style.backgroundColor = "white"
                            document.getElementById("return").style.backgroundColor = "lightblue"
                        }}>Return</button>
                        <div>
                            {
                                flag==="oneway"?
                                <form className="oneway">
                                    <div className="userinput">
                                        <label htmlFor="origincity">Origin City : </label>
                                        <input type="text" id="origincity" value={userInput.origin} onChange={(e)=>setUserInput({...userInput,origin:e.target.value})} required/>
                                    </div>
                                        <div className="userinput">
                                            <label htmlFor="destcity">Destination City : </label>
                                            <input type="text" id="destcity" value={userInput.destination}  onChange={(e) => setUserInput({ ...userInput, destination: e.target.value })} required/>
                                        </div>
                                        <div className="userinput">
                                            <label htmlFor="departuredate">Departure Date : </label>
                                            <input type="date" id="departuredate" value={userInput.departure} onChange={(e) => setUserInput({ ...userInput, departure : e.target.value })}  required/>
                                        </div>
                                        <div className="userinput">
                                            <label htmlFor="pass">Passangers : </label>
                                            <input type="number" min="1" value={userInput.pass} onChange={(e) => setUserInput({ ...userInput, pass: e.target.value })} required />
                                        </div>
                                        <button type="submit" onClick={onewaySubmit}>Search</button>
                                </form>
                                :
                                    <form className="oneway">
                                        <div className="userinput">
                                            <label htmlFor="origincity">Origin City : </label>
                                            <input type="text" id="origincity" value={userInput.origin} onChange={(e) => setUserInput({ ...userInput, origin: e.target.value })} required />
                                        </div>
                                        <div className="userinput">
                                            <label htmlFor="destcity">Destination City : </label>
                                            <input type="text" id="destcity" value={userInput.destination} onChange={(e) => setUserInput({ ...userInput, destination: e.target.value })} required/>
                                        </div>
                                        <div className="userinput">
                                            <label htmlFor="departuredate">Departure Date : </label>
                                            <input type="date" id="departuredate" value={userInput.departure} onChange={(e) => setUserInput({ ...userInput, departure: e.target.value })} required/>
                                        </div>
                                        <div className="userinput">
                                            <label htmlFor="returndate">Return Date : </label>
                                            <input type="date" id="returndate" value={userInput.return} onChange={(e) => setUserInput({ ...userInput, return: e.target.value })} required/>
                                        </div>
                                        <div className="userinput">
                                            <label htmlFor="pass">Passangers : </label>
                                            <input type="number"  min="1" value={userInput.pass} onChange={(e) => setUserInput({ ...userInput, pass: e.target.value })} required/>
                                        </div>
                                        <button type="submit" onClick={returnSubmit}>Search</button> 
                                    </form>
                            }
                        </div>
                    </div>
                    <div className="price-range">
                        <h3>Refine Flight Search</h3>
                         Min <input type="range"  min="0" max="30000" step="2000" id="slider" onChange={(e)=>setSlider(e.target.value)}/>Max
                    </div>
                </div>
                <div className="right-container">
                    <AllFlightComponent price={sliderval} flight={flightDetails} userInput={{...filterInput}} flag={flag} />
                </div>
            </div>
            
        </div>
    )
}
//  <input type="range"  min="1000" max="20000" step="5000" id="silder" onChange={(e)=>setSlider(e.target.value)}/>
