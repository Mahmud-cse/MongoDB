import React, { useRef } from 'react';
import { Form,Button, Container } from 'react-bootstrap';

const AddProducts = () => {
    const nameRef=useRef();
    const priceRef=useRef();
    const quantityRef=useRef();

    const handleAddUser=e=>{
        e.preventDefault();
        const name=nameRef.current.value;
        const price=priceRef.current.value;
        const quantity=quantityRef.current.value;

        const newProduct={name,price,quantity};

        fetch('http://localhost:5000/products',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                alert('Successfully added the user.');
                e.target.reset();
            }
        })
    }

    return (
        <div>
            <Container>
            <Form onSubmit={handleAddUser} className="mt-5">
                  <div style={{marginLeft:"470px"}}>
                  <Form.Group className="mb-3">
                        <Form.Control ref={nameRef} type="text" placeholder="Enter Product name" style={{width:"40%"}}/>
                  </Form.Group>

                  <Form.Group className="mb-3">
                        <Form.Control ref={priceRef} type="number" placeholder="Price" style={{width:"40%"}}/>
                  </Form.Group>

                  <Form.Group className="mb-3">
                            <Form.Control ref={quantityRef} type="number" placeholder="Quantity" style={{width:"40%"}}/>
                  </Form.Group>
                  </div>
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
            </Form>
            </Container>
        </div>
    );
};

export default AddProducts;