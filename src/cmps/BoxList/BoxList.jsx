import React, { useEffect } from 'react'
import './BoxList.scss'
import BoxPreview from '../BoxPreview/BoxPreview'
function BoxList({ genre }) {
    return (
        <section className="boxList flex">
            <BoxPreview />
            <BoxPreview />
            <BoxPreview />
        </section>
    )
}

export default BoxList
