import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
            <div className="mt-5 d-flex justify-content-center">
                <nav>
                    <Stack direction="horizontal" gap={4}>
                    <Link to="/"><Button variant="outline-primary">Home</Button></Link>
                        <Link to="/products"><Button variant="outline-success">Products</Button></Link>
                        <Link to="/products/add"><Button variant="outline-dark">Add Products</Button></Link>
                    </Stack>
                </nav>
            </div>
    );
};

export default Header;