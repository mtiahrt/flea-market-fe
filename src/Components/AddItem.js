import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

function AddItem() {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    const onSubmit = (d) => {
        alert(JSON.stringify(d));
    }

    return (
        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
            <input {...register("name")} placeholder="Name" />
            <input {...register("manufacturerName")} placeholder="Manufacturer Name" />
            <textarea {...register("description")} placeholder="Description" />
            <input {...register("price")} placeholder="Price" />
            <p>{data}</p>
            <input type="submit" />
            <Link to={`/`}><button>Cancel</button></Link>
        </form>
    );
}


export default AddItem;