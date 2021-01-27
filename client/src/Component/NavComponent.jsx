import React from 'react'
import {Link} from 'react-router-dom'

export default function NavComponent() {
    return (
        <div className="nav">
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="/admin">Admin panel</Link>
        </div>
    )
}
