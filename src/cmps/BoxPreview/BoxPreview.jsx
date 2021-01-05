import React from 'react'
import { Link }from 'react-router-dom'
import './BoxPreview.scss'
function BoxPreview({box}) {
    return (
        <div className="boxPreview">
            <Link to={`/boxDetails/${box._id}`}>
                {box.name}
            </Link>
        </div>
    )
}

export default BoxPreview
