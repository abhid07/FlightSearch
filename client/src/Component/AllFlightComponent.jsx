import React from 'react'
import flightimg from '../assets/flight.png'


export default function AllFlightComponent(props) {

    let filterFlight = props.flight

    

    //rendering flights data
   let renderAllFlights = ()=>{
    //    checking after filter array is empty or not
       if(filterFlight.length===0)
       {
        return(
            <div className="noresult">
                <h1>No flights found with given filter</h1>
            </div>
        )
       }
       let mapRows= filterFlight.map(flight=>{
           
            return(
                <div className="flight-card">
                    <div className="flight-card-left">
                        <h1>Price : {flight.price} Rs</h1>
                            <div className="card-body">
                                <div className="card-body-left">
                                    <h4>Al-202</h4>
                                    <h2>{flight.source.slice(0,3)} &gt; {flight.destination.slice(0,3)}</h2>
                                    <h2>Depart: {flight.departureTime} 
                                    {parseInt(flight.departureTime) > 12 && parseInt(flight.departureTime) < 24? "PM" : "AM"}</h2>
                                    <h2>Arrive: {flight.arrivalTime} 
                                    {parseInt(flight.arrivalTime) > 12 && parseInt(flight.departureTime) < 24 ? "PM" : "AM"}
                                    </h2>
                                </div>
                                {/* if return is selected then show it */}
                                {
                                    props.userInput.return || props.flag==="return"?
                                    <div className="card-body-right">
                                        <h4>Al-203</h4>
                                        <h2>{flight.destination.slice(0, 3)}&gt;{flight.source.slice(0, 3)} </h2>
                                        <h2>Depart: {flight.returnDepartureTime}
                                            {parseInt(flight.returnDepartureTime) > 12 && parseInt(flight.departureTime) < 24 ? "PM" : "AM"}
                                        </h2>
                                        <h2>Arrive: {flight.returnArrivalTime}
                                            {parseInt(flight.returnArrivalTime) > 12 && parseInt(flight.departureTime) < 24 ? "PM" : "AM"}
                                        </h2>
                                    </div>
                                    :<></>
                                }
                            </div>
                        </div>
                    <div className="flight-card-right">
                        <img src={flightimg} alt="logo"/>
                        <button onClick={
                            ()=>alert(`Flight is booked
                            Your Booking id is ${flight._id}`)}>
                            Book this flight</button>
                    </div>
                </div>
            )
       })
       return mapRows 
   }
    //filtering conditions    
   if(props.userInput.origin || props.userInput.destination || props.price)
   {
       if(props.userInput.origin && props.userInput.destination)
       {
        filterFlight = filterFlight.filter(flight=>{
            return (flight.source.toLowerCase().indexOf(props.userInput.origin.toLowerCase()) !== -1)
        }).filter(flight1=>{
            return (flight1.destination.toLowerCase().indexOf(props.userInput.destination.toLowerCase()) !== -1)
        })
           filterFlight = filterFlight.sort((a, b) => a.price - b.price)
       }
   }
   //filter as per price
   if(props.price)
   {
       filterFlight= filterFlight.filter(flight=>{
           return (parseInt(flight.price)>props.price)
       })
  
   }

   //popup for bookflight
  
    return (
        <div>
            <div className="flight-header">
                <div>
                {
                    props.userInput.return?
                        //if return is prsent then display source > dest > source
                        <h1>{props.userInput.origin} &gt; {props.userInput.destination} &gt; {props.userInput.origin}</h1>
                        :
                        //if only origin is prsent then display source > dest 
                        props.userInput.origin?
                            <h1>{props.userInput.origin} &gt; {props.userInput.destination} </h1>
                            :
                             //else
                            <h1>All flights</h1>
                }
                </div>
                <div>
                    {
                        //conditions for displaying date for user ticket
                        props.userInput.return?
                            <>
                            <h2>Depart:{props.userInput.departure}</h2>
                            <h2>Return:{ props.userInput.return}</h2>
                            </>
                            :
                            props.userInput.departure ? 
                            <h2>Depart:{props.userInput.departure}</h2>
                            :
                            <></>
                            
                    }
                    
                </div>
            </div>
            <div style={{height:"700px",overflow:"scroll"}}>
                {renderAllFlights()}
            </div>
            <div id="popup">
                
            </div>
        </div>
    )
}
