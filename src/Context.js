import React, { Component } from 'react'
import items from './data'

const RoomContext = React.createContext();


class RoomProvider extends Component {
    state={
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading:true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfirst: false,
        pets: false
    }

    componentDidMount()
    {
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item=> item.price))
        let maxSize = Math.max(...rooms.map(item=> item.size))
        this.setState({
            rooms:rooms,
            featuredRooms:featuredRooms,
            sortedRooms:rooms,
            loading:false,
            price:maxPrice,
            maxPrice,
            maxSize
        })
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms]
        const room = tempRooms.find((room) => room.slug === slug)
        return room
    }

    formatData(items)
    {
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url)

            let room = {...item.fields, id, images}
            return room;
        })
        return tempItems
    }

    handleChange = event => {
        const target = event.target
        const name = target.name
        const value = target.type === 'checkbox' ? target.checked:target.value
        this.setState({
            [name]:value
        },this.filterRoom)
    }

    filterRoom = () => {
        let {
            rooms, type, capacity, price, minSize, maxSize,breakfirst,pets
        } = this.state
        let tempRooms  = [...rooms]
        capacity = parseInt(capacity)
        price = parseInt(price)

        if(type !== 'all')
        {
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        if(capacity !== 1)
        {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        tempRooms = tempRooms.filter(room => room.price < price)

        tempRooms = tempRooms.filter(room => ((room.minSize >= minSize) && (room.maxSize <= maxSize)))

        if(breakfirst){
            tempRooms = tempRooms.filter(room => room.breakfirst === true)
        }
        
        if(pets){
            tempRooms = tempRooms.filter(room => room.pets === true)
        }
    

        this.setState({
            sortedRooms : tempRooms
        })

        

    }
    
    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom:this.getRoom, handleChange:this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
            {
                value => <Component {...props} context={value}/>
            }
        </RoomConsumer>
    }
}

export {RoomProvider, RoomConsumer, RoomContext }