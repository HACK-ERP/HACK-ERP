import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProductList } from "../../services/ProductsService";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductList()
      .then((response) => {
        console.log(response);
        setProducts(response);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!products.length) {
    return <h1>No hay productos</h1>;
  }

  return (
    <div className="Products">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Product;
