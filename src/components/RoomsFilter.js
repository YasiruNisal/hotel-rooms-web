import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../Context'
import Title  from '../components/Title'

const getUnique = (items, value)=>{
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}) 
{
    const context = useContext(RoomContext);
    const {handleChange,type,capacity,price,minPrice,maxPrice,minSize,maxSize,breakfast,pets} = context

    let types = getUnique(rooms, 'type')
    types = ['all', ...types]
    
    
    types = types.map((item,index)=>{
        return <option value={item} key={index}>{item}</option>
    })

    let people = getUnique(rooms, 'capacity')

    people = people.map((item, index) =>
    {
        return <option key={index} value={item}>{item}</option>
    })

    console.log(types);
    return (
        <section className="filter-container">
            <Title title="search rooms"/>
                <form className='filter-form'>
                    {/* select type */}
                        <div className="form-group">
                            <label htmlFor='type'>room type</label>
                            <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                                {types}
                            </select>
                        </div>
                    {/* end of select type */}
                    {/* capacity */}
                    <div className="form-group">
                        <label htmlFor='capacity'>Guests</label>
                        <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                            {people}
                        </select>
                    </div>
                    {/* end of capacity */}
                    {/* rooms price  */}
                    <form className="form-group">
                        <label htmlFor="price">room price ${price}</label>
                        <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control"/>
                    </form>
                    {/* end of room price  */}
                    {/* size  */}
                    <form className="form-group">
                        <label htmlFor="size">room size</label>
                        <div className="size-input">
                            <input type="number" name="min size" id="minsize" value={minSize} onInput={handleChange} className="size-input"/>
                        <input type="number" name="max size" id="maxsize" value={maxSize} onInput={handleChange} className="size-input" />
                        </div>
                    </form>
                    {/* end of size  */}
                    {/* extras  */}
                    <form className="form-group">
                        <div className="single-extra">
                            <input type="checkbox" name="breakfirst" id="breakfirst" checked={breakfast} onChange={handleChange}/>
                            <label htmlFor="breakfirst">breakfirst</label>
                        </div>
                        <div className="single-extra">
                            <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange} />
                            <label htmlFor="pets">pets allowed</label>
                        </div>
                    </form>
                    {/* end of extras  */}
                </form>
        </section>
    )
    
}


