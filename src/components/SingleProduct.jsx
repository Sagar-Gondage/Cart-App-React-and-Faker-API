// import { Button } from "bootstrap";
import { Card, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating"

const SingleProduct = ({ name, image, price, fastDelivery, ratings, inStock, prod, id }) => {
  const { state: { cart }, dispatch } = CartState()
  // console.log(cart)
  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={image} alt={name} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}><span>{price.split(".")[0]}</span>
            {fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 Days Delivery</div>
            )}
            <Rating rating={ratings[0]} />
          </Card.Subtitle>
          {
            cart.some(p => p.id === id) ? (
              <Button variant='danger'
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART", payload: prod
                })
              }}
              >Remove from Cart</Button>) : (
              <Button
                disabled={!inStock[0]}
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART", payload: prod
                  })
                }}
              >{!inStock[0] ? "Out of Stock" : "Add to Cart"}</Button>
            )
          }



        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
