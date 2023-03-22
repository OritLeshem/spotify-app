import { useState } from 'react'

import { playlistService } from '../services/playlist.service.local'
import { SearchSvg } from './form'

export function PlaylistFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(playlistService.getDefaultFilter())

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="playlist-filter">
        <form onSubmit={onSubmitFilter}>
            <input type="text"
                name="txt"
                placeholder="What do you want to listen to?"
                value={filterByToEdit.txt}
                onChange={handleChange}
            />
            {/* <button>Search</button> */}
        </form>
        <div className="svg-container">
            <SearchSvg />
        </div>
    </section>
}