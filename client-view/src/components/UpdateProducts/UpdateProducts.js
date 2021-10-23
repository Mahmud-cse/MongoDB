import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router';

const UpdateProducts = () => {
    const [product,setProduct]=useState({});
    const {id}=useParams();

    useEffect(()=>{
        const url=`http://localhost:5000/products/${id}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>setProduct(data));
    },[]);

    const handleNameChange=e=>{
        const updatedName=e.target.value;
        const updatedProduct={...product};
        updatedProduct.name=updatedName;
        setProduct(updatedProduct);
    }

    const handlePriceChange=e=>{
        const updatedPrice=e.target.value;
        const updatedProduct={...product};
        updatedProduct.price=updatedPrice;
        setProduct(updatedProduct);
    }

    const handleUpdateProduct=(e)=>{
        e.preventDefault();

        const url=`http://localhost:5000/products/${id}`;
        fetch(url,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount>0){
                alert('Updated successfully');
                setProduct({});
            }
        })
    }

    return (
        <div className="mt-5">
            <h2>Update {product.name}</h2>
            <p>Products Id: {id}</p>

            <Container>
            <Form onSubmit={handleUpdateProduct} className="mt-5">
                  <div style={{marginLeft:"470px"}}>
                  <Form.Group className="mb-3">
                        <Form.Control onChange={handleNameChange} type="text" placeholder="Enter Product name" style={{width:"40%"}} value={product.name || ''}/>
                  </Form.Group>

                  <Form.Group className="mb-3">
                        <Form.Control onChange={handlePriceChange} type="number" placeholder="Price" style={{width:"40%"}} value={product.price || ''}/>
                  </Form.Group>

                  <Form.Group className="mb-3">
                            <Form.Control type="number" placeholder="Quantity" style={{width:"40%"}} value={product.quantity || ''}/>
                  </Form.Group>
                  </div>
                  <Button variant="primary" type="submit">
                    Update
                  </Button>
            </Form>
            </Container>
        </div>
    );
};

export default UpdateProducts;