import React, {useState} from 'react'

const AddNewItem = () => {
    const [price, setPrice] = useState('');

    const handlePriceChange = e => {
        e.preventDefault();
        /^\d*\.?\d*$/.test(e.currentTarget.value) ? setPrice(e.currentTarget.value) : null;
    }

    return (
        <form>
           <input value={price} onChange={handlePriceChange} aria-label="price-input"></input> 
        </form>
    )
}

export default AddNewItem
