import { useState } from 'react'
import { playlistService } from '../services/playlist.service'
import { SearchSvg } from './form'

export function PlaylistFilter({ onSetFilter, title }) {
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

    return <section className='playlist-filter'>
        <form onSubmit={onSubmitFilter}>
            <input className={title ? 'search-detail' : ''} type='text'
                name='txt'
                placeholder={title || 'What do you want to listen to?'}
                value={filterByToEdit.txt}
                onChange={handleChange}
            />
        </form>
        <div className={title ? 'svg-container svg-detail' : 'svg-container'}>
            <SearchSvg />
        </div>
    </section>
}