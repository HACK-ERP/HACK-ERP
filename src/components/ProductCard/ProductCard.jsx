import { NavLink } from "react-router-dom";

/* eslint-disable react/prop-types */
const ProductCard = ({ product }) => {
  const { _id, name, description, price, image } = product;

  return (
    <div className="ProductCard card" style={{width: '100%', maxWidth: '400px'}}>
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text fw-light text-truncate" style={{height: '24px'}}>{description}</p>
        <p className="card-text fw-light"><span className="fw-bold">Price:</span> {price} €</p>
        <NavLink to={`/products/${_id}`} className="btn btn-primary">Details</NavLink>
      </div>
    </div>
  );
}

export default ProductCard;