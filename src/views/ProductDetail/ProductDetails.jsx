import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProduct } from "../../services/ProductsService";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id)
      .then((product) => {
        setProduct(product);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found 🥺</p>;
  }

  const { name, description, image, price } = product;

  return (
    <div className="product-details">
      <h1>{name}</h1>
      <img src={image} alt={name} />
      <p>{description}</p>
      <p>${price}</p>
    </div>
  );
};

export default ProductDetails;
