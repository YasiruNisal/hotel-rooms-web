import React from 'react'
import Room from './Room'

function RoomList({rooms}) {
    if(rooms.length === 0)
    {
        return (
            <div className='empty-search'>
                <h3>No rooms matched your parameters</h3>
            </div>
        )
    }
    return (
        <section className='roomslist'>
            <div className="roomslist-center">
                {
                    rooms.map(item => {
                        return <Room key={item.id} room={item}/>
                    })
                } 
            </div>
        </section>
    )
}

export default RoomList
