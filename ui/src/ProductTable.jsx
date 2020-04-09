import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const ProductRow = withRouter(({ product, index, deleteProduct }) => (
  <tr>
    <td>{ product.name }</td>
    <td>
      { product.price }
    </td>
    <td>{ product.category }</td>

    <td><Link to={`/viewimage/${product.id}`} target="_blank">View</Link></td>
    <td>
      <Link to={`/edit/${product.id}`}>Edit</Link>
      {' | '}
      <button type="button" onClick={() => { deleteProduct(index); }}>Delete</button>
    </td>
  </tr>
));
export default function ProductTable({ products, deleteProduct }) {
  const productRows = products.map((product, index) => (
    <ProductRow key={product.id} product={product} index={index} deleteProduct={deleteProduct} />
  ));
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price($)</th>
          <th>Category</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </table>
  );
}
