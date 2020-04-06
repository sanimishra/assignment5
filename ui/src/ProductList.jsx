import React from 'react';

import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { products } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = products[index];
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query ,variables: { id }}),
    });
    const result = await response.json();
    const productdeleteinfo = result.data.productDelete;
    if (productdeleteinfo && productdeleteinfo.productDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.products];
        if (pathname === `/products/${id}`) {
          history.push({ pathname: '/products', search });
        }
        newList.splice(index, 1);
        return { products: newList };
      });
    } else {
      this.loadData();
    }
  }
  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query{
      productList
      { 
        id category name price image
        }
      }`;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    this.setState({ products: result.data.productList });
  }

  async createProduct(product) {
    const query = `mutation productAdd($product: productinputs!) {
      productAdd(product: $product) {
        id
      }
    }`;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { product } }),
    });
    if (response) {
      this.loadData();
    }
  }
  render() {
    return (
      <React.Fragment>
        <h3>My Company Inventory</h3>
        <h4>Showing all available products</h4>
        <hr />
        <ProductTable products={this.state.products} deleteProduct={this.deleteProduct}></ProductTable>
        <h4>Add a new product to inventory</h4>
        <hr />
        <ProductAdd createProduct={this.createProduct} />
      </React.Fragment>
    );
  }
}