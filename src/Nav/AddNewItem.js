import React, {useState, useEffect} from 'react'

const AddNewItem = () => {
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
            /^\d*\.?\d*$/.test(e.target.value) ? setFormStateValues(e.target) : null;
            return;
        }
        setFormStateValues(e.target)
    }

    return (
        <form onSubmit={handleSubmit}>
           <input name="title" value={values.title} onChange={handleInputChange} aria-label="title-input"></input>
           <input name="itemName" value={values.itemName} onChange={handleInputChange} aria-label="name-input"></input> 
           <input name="description" value={values.description} onChange={handleInputChange} aria-label="description-input"></input> 
           <input name="price" value={values.price} onChange={handleInputChange} aria-label="price-input"></input> 
           <button name="save" disabled={isSaveDisabled} type='submit' aria-label='save-item'>Save</button>
           <button name="image" aria-label='image-browse'>Add Image</button>
        </form>
    )
}

export default AddNewItem
