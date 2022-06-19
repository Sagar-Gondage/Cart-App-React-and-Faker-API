import {
  Badge,
  Container,
  Dropdown,
  Form,
  FormControl,
  Nav,
  Navbar,
  Button
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";

const Header = () => {
  const { state: { cart }, dispatch, productDispatch } = CartState()
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Home</Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link to="/about">About</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            placeholder="Search Product"
            style={{ width: 500 }}
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value
              })
            }}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown align={{ lg: "end" }}>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge style={{ marginLeft: 10, marginRight: 10 }}>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 300 }}>
              {cart.length ? (
                <>
                  {
                    cart.map((prod) => (
                      <span className='cartitem' key={prod.id}>
                        <img
                          src={prod.image}
                          className='cartItemImg'
                          alt={prod.name} />
                        <div className="cartItemDetails">
                          <span>{prod.name}</span>
                          <span>{prod.price.split(".")[0]}</span>
                        </div>
                        <AiFillDelete
                          fontSize="20px"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: prod
                            })
                          }
                        />
                      </span>
                    ))
                  }
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}> Cart Is Empty</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
