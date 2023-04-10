import { useState } from 'react'
import { DiviceBtn, MikeBtn, QueueBtn, VolumeBtn } from './form'

export function OptionsBar() {
    const [volume, setVolume] = useState(0.6)

    function handleChange({ target }) {
        setVolume(target.value)
    }

    return <section className='options-bar'>
        <MikeBtn />
        <QueueBtn />
        <DiviceBtn />
        <div className='volume-bar'>
            <VolumeBtn />
            <div className='slider-container'>
                <input type='range'
                    min='0'
                    max='1'
                    step='0.1'
                    className='slider'
                    value={volume}
                    onChange={handleChange} />
                <div className='progress' style={{ width: `${volume * 100}%` }}></div>
            </div>
        </div>
    </section >
}