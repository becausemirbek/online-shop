import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CustomCard = ({ product, isUserProducts }) => {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          Category: {product.category}
        </Card.Text>
        <Card.Text>
          Price: ${product.price}
        </Card.Text>
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button variant="primary">Details</Button>
          {isUserProducts && (
            <>
              <Button variant="danger">Delete</Button>
              <Button variant="info"
                onClick={() => navigate(`/edit-product/${product.id}`)}
              >
                  Edit
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;