import React from 'react'
import RoomsFilter from './RoomsFilter'
import RoomList from './RoomList'
import { withRoomConsumer, RoomProvider } from '../Context'
import Loading from './Loading'

function RoomsContainer({context})
{
    const { loading, sortedRooms, rooms } = context
    
    if (loading)
    {
        return <Loading />
    }
    return (
    <>
        
        <RoomsFilter rooms={rooms}/>
        <RoomList rooms={sortedRooms}/>
    </>
    )
    
}

export default withRoomConsumer(RoomsContainer)



// import React from 'react'
// import RoomsFilter from './RoomsFilter'
// import RoomList from './RoomList'
// import {RoomConsumer, RoomProvider} from '../Context'
// import Loading from './Loading'

// function RoomsContainer() {
//     return (
//         <RoomConsumer>
//             {
//                 (value) => {
//                     const {loading,sortedRooms, rooms} = value
//                     if(loading) 
//                     {
//                         return <Loading />
//                     }
//                     return (
//                     <div>
//                         Hello from rooms conainer
//                         <RoomsFilter rooms={rooms}/>
//                         <RoomList rooms={sortedRooms}/>
//                     </div>)
//                 }
//             }
//         </RoomConsumer>
        
//     )
// }

// export default RoomsContainer
