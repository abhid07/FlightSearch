import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function AdminComponent() {
    const [fid, setfId] = useState()
    const [flightData, setFlightData] = useState([])
    const [addFlightData, setaddFlightData] = useState({
        source: "", destination: "", price: "", departureTime: "", arrivalTime:"",
        returnDepartureTime:"",returnArrivalTime:""
    })

    //getting flights
    useEffect(() => {
        axios.get('/getFlightDetails')
            .then(res => {
                setFlightData(res.data)
                console.log(res.data)
            })
    }, [addFlightData])

    //Adding new flight data into database
    let postData = (e) => {
        e.preventDefault()
        if (fid) {
            axios.put(`editFlight/${fid}`, addFlightData)
                .then(res => {
                    setaddFlightData({
                        source: "", destination: "", price: "", departureTime: "", arrivalTime: "",
                        returnDepartureTime: "", returnArrivalTime: ""
                    })
                })
                .catch(err => console.log(err))
        }
        else {
            axios.post('/addFlight', addFlightData)
                .then(res => {
                    setaddFlightData({
                        source: "", destination: "", price: "", departureTime: "", arrivalTime: "",
                        returnDepartureTime: "", returnArrivalTime: ""
                    })
                    console.log(res.data)
                })
                .catch(err => console.log(err))
        }
        let title = document.getElementById("adminTitle")
        title.innerHTML="Add New flight"
    }
    let editFlight = (id) => {
        setfId(id)
        let title = document.getElementById("adminTitle")
        title.innerHTML="Update Details"
        axios.get(`/getOne/${id}`)

            .then(res => setaddFlightData({
                destination:res.data.destination,
                arrivalTime: res.data.arrivalTime,
                departureTime: res.data.departureTime,
                returnArrivalTime:res.data.returnArrivalTime,
                returnDepartureTime:res.data.returnDepartureTime,
                source:res.data.source,
                price:res.data.price
            }))
            .catch(err => console.log(err))
    }
    let renderFlight = ()=>{
        let mapRows = flightData.map(flight=>{
            return(
            <div className="flight-card">
                <div className="flight-card-left">
                    <h1>Price : {flight.price} Rs</h1>
                    <div className="card-body">
                        <div className="card-body-left">
                            <h4>Al-202</h4>
                            <h2>{flight.source.slice(0, 3)} &gt; {flight.destination.slice(0, 3)}</h2>
                            <h2>Depart: {flight.departureTime}
                                {parseInt(flight.departureTime) > 12 && parseInt(flight.departureTime) < 24 ? "PM" : "AM"}</h2>
                            <h2>Arrive: {flight.arrivalTime}
                                {parseInt(flight.arrivalTime) > 12 && parseInt(flight.departureTime) < 24 ? "PM" : "AM"}
                            </h2>
                        </div>
                        
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
                    </div>
                </div>
                <div className="flight-card-right">
                    <button onClick={()=>{editFlight(flight._id)}}>Edit flight</button>
                    <button onClick={()=>{deleteFlight(flight._id)}}>Delete flight</button>
                </div>
            </div>
            )
        })
        return mapRows
    }
    let deleteFlight = (id) => {
        axios.delete(`deleteFlight/${id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    return (
        <div className="admin-container">
            <div className="adminform">
                <form onSubmit={postData} >
                    <h1 id="adminTitle">Add New Airline</h1>
                    <div className="admininput">
                        <label htmlFor="dtime">Departure Time : </label>
                        <input type="time" id="dtime" value={addFlightData.departureTime} onChange={(e) => setaddFlightData({ ...addFlightData, departureTime: e.target.value })} />
                    </div>
                    <div className="admininput">
                        <label htmlFor="atime">Arrival Time : </label>
                        <input type="time" id="atime" value={addFlightData.arrivalTime} onChange={(e) => setaddFlightData({ ...addFlightData, arrivalTime: e.target.value })} />
                    </div>

                    <div className="admininput">
                        <label htmlFor="price">Price : </label>
                        <input type="text" placeholder="Enter Price" value={addFlightData.price} id="price" value={addFlightData.price} onChange={(e) => setaddFlightData({ ...addFlightData, price: e.target.value })} required />
                    </div>

                    <div className="admininput">
                        <label htmlFor="source">Source : </label>
                        <input type="text" id="source" placeholder="Enter Source City" value={addFlightData.source} onChange={(e) => setaddFlightData({ ...addFlightData, source: e.target.value })} required />
                    </div>

                    <div className="admininput">
                        <label htmlFor="destination">Destination : </label>
                        <input type="text" placeholder="Enter Destintion City" value={addFlightData.destination} onChange={(e) => setaddFlightData({ ...addFlightData, destination: e.target.value })} required />

                    </div>

                    <div className="admininput">
                        <label htmlFor="rdtime">Return Departure Time : </label>
                        <input type="time" id="rdtime" value={addFlightData.returnDepartureTime} onChange={(e) => setaddFlightData({ ...addFlightData, returnDepartureTime: e.target.value })} />
                    </div>

                    <div className="admininput">
                        <label htmlFor="rdtime">Return Arrival Time : </label>
                        <input type="time" value={addFlightData.returnArrivalTime} onChange={(e) => setaddFlightData({ ...addFlightData, returnArrivalTime: e.target.value })} />
                    </div>
                    <div className="adminbutton">
                        <button type="submit">Submit</button>
                        <button type="reset">Reset</button>
                    </div>
                </form>
            </div>

            <div className="adminFlight">
                {renderFlight()}
                {console.log(addFlightData)}
            </div>
        </div>
    )
}
