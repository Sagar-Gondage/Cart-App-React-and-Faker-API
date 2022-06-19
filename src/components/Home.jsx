import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";
import "./styles.css";

const Home = () => {
  const {
    state: { products },
    productState: {byStock, byFastDelivery, sort, byRating, searchQuery}
  } = CartState();
  console.log(products)
  console.log(byStock, byFastDelivery, sort, byRating, searchQuery)
  const transformProducts = () => {
    let sortedProducts = products;
    if(sort) {
      sortedProducts = sortedProducts.sort((a, b) => (
        sort ==="lowToHigh" ? a.price - b.price: b.price - a.price
      ))
    }
    if(!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock[0])
    }

    if(byFastDelivery) {
      sortedProducts = sortedProducts.filter(prod => prod.fastDelivery)
    }

    if(byRating) {
      sortedProducts = sortedProducts.filter(
        prod => prod.ratings[0] >= byRating
      )
    }

    if(searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => 
      prod.name.toLowerCase().includes(searchQuery))
    }
    return sortedProducts
  }
  console.log("sorted",transformProducts())
  return (
    <div className="home">
      {/* left side filter section */}
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => {
          // console.log(prod.inStock[0])
          return <SingleProduct key={prod.id} {...prod} prod={prod}/>;
        })}
      </div>
    </div>
  );
};

export default Home;
