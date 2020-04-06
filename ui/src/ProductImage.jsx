import React from 'react';

export default class ProductImage extends React.Component {
  constructor() {
    super();
    this.state = {
      productinfo: {},
    };
  }
  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    const { match: { params: { id } } } = this.props;
    const query = `query products($id: Int!) {
      products(id: $id) {
        id category name price image
      }
    }`;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query,variables: { id } }),
    });
    const result = await response.json();
    this.setState({ productinfo: result.data.products });
  }
  render() {
    const { productinfo:{ image,name } } = this.state;
    return (
      <div>
        <h3>Image Of the Product</h3>
        <h1>{name}</h1> 
        <img src={image} alt={name} style={{ width: 500 }}/> 
      </div>
    );
  }
}