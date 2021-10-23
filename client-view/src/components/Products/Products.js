import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res=>res.json())
        .then(data=>setProducts(data));
    },[]);

    const handleDelete=(id)=>{
        const proceed=window.confirm("Are you sure you want to delete?");
        if(proceed){
            fetch(`http://localhost:5000/products/${id}`,{
                method:"DELETE"
            })
            .then(res=>res.json())
            .then(result=>{
                if(result.deletedCount>0){
                    alert("Deleted successfully");
                    const remainingUsers=products.filter(product=>product._id!==id);
                    setProducts(remainingUsers);
                }
            });
        }
    }

    return (
        <div className="mt-5">
            <h2 className="mb-4">Products Available: {products.length}</h2>
            
            <div className="allProducts">
                <div className="row">
                    {
                    products?.map((data)=>(
                    <div className="col-md-4">
                        <div className="product border border p-2 m-2">
                            <h1>{data.name}</h1>
                            <h4><span>Price: </span>{data.price}</h4>
                            <h5><span>Quantity: </span>{data.quantity}</h5>
                            <Button onClick={()=>handleDelete(data._id)} variant="danger" className="p-1 m-2">Delete</Button>
                            <Link to={`/products/update/${data._id}`}>
                                <Button variant="info" className="p-1 m-2">Update</Button>
                            </Link>
                        </div>
                    </div>    
                    )         
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;