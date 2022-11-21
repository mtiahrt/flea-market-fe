import React, {useState, useEffect} from 'react';
import { gql, useMutation } from '@apollo/client';
import { ADD_SALE_ITEM } from '../queries/graphQL';

const AddNewItem = () => {
    //hooks
    const [addinventory, {loading, error, data}] = useMutation(ADD_SALE_ITEM);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [values, setValues] = useState({title: '',
        itemName: '',
        description: '',
        price: ''});

    //check if all the required fields are filled in
    useEffect(() => {
        enableSave();
    }, [values]);

    const enableSave = () => {
        if(Object.values(values).every(val => val !=='')){
            setIsSaveDisabled(false);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        addinventory({variables: 
                        {name: values.itemName,
                        description: values.description,
                        manufacturerName: values.title,
                        price: values.price}
                    });

    }
    
    const setFormStateValues = target => {
        const values = {[target.name]: target.value};
        setValues(prevState => ({
            ...prevState, ...values
        }));
    }

    const handleInputChange = e => {
        e.preventDefault();
        if(e.target.name === 'price'){
            if(/^\d*\.?\d*$/.test(e.target.value)){
                setFormStateValues(e.target);
                return;
            }
            return;
        }
        setFormStateValues(e.target)
    }
    if (loading) return <p>Loading....</p>;
    if (error){
        console.log(error)
        return <p>Error!</p>;
    }
        
    if (data){
        return <h4>{data.createInventory.inventory.manufacturerName} was added successfully</h4>
    }
  
    return (
        <form onSubmit={handleSubmit}>
           <input name="title" value={values.title} onChange={handleInputChange} aria-label="title-input"/>
           <input name="itemName" value={values.itemName} onChange={handleInputChange} aria-label="name-input"/>
           <input name="description" value={values.description} onChange={handleInputChange} aria-label="description-input"/>
           <input name="price" value={values.price} onChange={handleInputChange} aria-label="price-input"/>
           <button name="save" disabled={isSaveDisabled} type='submit' aria-label='save-item'>Save</button>
           <button name="image" aria-label='image-browse'>Add Image</button>
        </form>
    )
}

export default AddNewItem
