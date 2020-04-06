import React from 'react';

import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';
export default class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      producteditinfo: {},//Empty product
      invalidFields: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
  }
  onValidityChange(event, valid) {
    const { name } = event.target;
    this.setState((prevState) => {
      const invalidFields = { ...prevState.invalidFields, [name]: !valid };
      if (valid) delete invalidFields[name];
      return { invalidFields };
    });
  }
  componentDidMount() {
    this.loadData();
  }
  
  onChange(event,naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      producteditinfo: { ...prevState.producteditinfo, [name]: value },
    }));
  }
  async handleSubmit(e) {
    e.preventDefault();
    const { producteditinfo, invalidFields } = this.state;
    //console.log(producteditinfo); // eslint-disable-line no-console
    if (Object.keys(invalidFields).length !== 0) return;
    const query = `mutation productUpdate(
      $id: Int!
      $changes: ProductUpdateInputs!
    ) {
      productUpdate(
        id: $id
        changes: $changes
      ) {
        id category price name image
      }
    }`;
    const { id, ...changes } = producteditinfo;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query,variables: { changes, id } }),
    });
    const result = await response.json();
    this.setState({ producteditinfo: result.data.productUpdate });
    alert('Updated issue successfully'); // eslint-disable-line no-alert
  }
  
  async loadData() {
    const query = `query products($id: Int!) {
      products(id: $id) {
        id category name price image
      }
    }`;
    const { match: { params: { id } } } = this.props;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query,variables: { id } }),
    });
    const result = await response.json();
    const producteditinfo = result.data.products;
   if(response!=null)
    {
    //producteditinfo.category = producteditinfo.category != null ? producteditinfo.category.toString() :``;
    //producteditinfo.name = producteditinfo.name != null ? producteditinfo.name :``;
    //producteditinfo.price = producteditinfo.price != null ? producteditinfo.price.toString() :``;
    //producteditinfo.image = producteditinfo.image != null ? producteditinfo.image :``;
    this.setState({ producteditinfo,invalidFields: {} });
    } 
    else {
    this.setState({ producteditinfo: {},invalidFields: {} });
   }
  }
  render() {
    const { producteditinfo: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`Product with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }
    const { invalidFields } = this.state;
    let validationMessage;
    if (Object.keys(invalidFields).length !== 0) {
      validationMessage = (
        <div className="error">
          Please correct invalid fields before submitting.
        </div>
      );
    }
    const { producteditinfo:{ category, name, price, image }} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
      <h3>{`Editing product: ${id}`}</h3>
      <table>
        <tbody>
          <tr>
            <td>Catgory:</td>
            <td>
              <select name="category" value={category} onChange={this.onChange}>
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Jackets">Jackets</option>
                <option value="Sweaters">Sweaters</option>
                <option value="Accessories">Accessories</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>
              <TextInput
                size={50}
                name="name"
                value={name}
                onChange={this.onChange}
                key={id}
              />
            </td>
          </tr>
          <tr>
            <td>Price:</td>
            <td>
              <NumInput
                name="price"
                value={price}
                onChange={this.onChange}
                key={id}
              />
            </td>
          </tr>
          <tr>
            <td>ImageUrl:</td>
            <td>
              <TextInput
              tag="textarea"
                name="image"
                value={image}
                onChange={this.onChange}
                key={id}
              />
            </td>
          </tr>
          <tr>
            <td />
            <td><button type="submit">Submit</button></td>
          </tr>
        </tbody>
      </table>
      {validationMessage}
    </form>
    );
  }
}
    /*
    const { product: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`product with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }
    const { product: { name, category } } = this.state;
    const { product: { price, image } } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{`Editing product: ${id}`}</h3>
        <table>
          <tbody>
            <tr>
              <td>Catgory:</td>
              <td>
                <select name="category" value={category} onChange={this.onChange}>
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  size={50}
                  name="name"
                  value={name}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>
                <input
                  name="price"
                  value={price}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td>ImageUrl:</td>
              <td>
                <input
                  name="image"
                  value={image}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td />
              <td><button type="submit">Submit</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}
*/
