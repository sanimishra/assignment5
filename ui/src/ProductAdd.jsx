/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { price: '$' };
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const price = form.price.value.replace('$', '');
    const product = {
      name: form.name.value,
      price: price > null ? price : null,
      category: form.category.value,
      image: form.image.value,
    };
    const { createProduct } = this.props;
    createProduct(product);
    form.name.value = '';
    form.category.value = '';
    form.price.value = '$';
    form.image.value = '';
  }

  render() {
    const { price } = this.state;
    return (
      <form name="productAdd" onSubmit={this.handleSubmit} className="addprodstyle">
        <div>
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            <option value="">Select Catergory</option>
            <option value="Shirts">Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Jackets">Jackets</option>
            <option value="Sweaters">Sweaters</option>
            <option value="Accessories">Accessories</option>
          </select>
          <label htmlFor="price" id="price">Price Per Unit</label>
          <input type="text" name="price" id="price" defaultValue={price} />
        </div>
        <div>
          <label htmlFor="name">Product Name</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="image">Image URL</label>
          <input type="url" name="image" id="image" />
        </div>
        <button type="submit">Add Product</button>
      </form>
    );
  }
}
