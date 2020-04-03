/* globals React PropTypes */
export default class ProductAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const form = document.forms.productAdd;
      const pricewithdollar = form.price.value;
      const removeddollarprice = pricewithdollar.substring(1);
      const product = {
        name: form.name.value,
        price: removeddollarprice,
        category: form.category.value,
        image: form.image.value,
      };
      const { createProduct } = this.props;
      createProduct(product);
      form.name.value = ''; form.category.value = ''; form.price.value = '$'; form.image.value = '';
    }
  
    render() {
      return (
        <form name="productAdd" onSubmit={this.handleSubmit} className="addprodstyle">
          <div>
            {/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
            <label htmlFor="category">Category</label>
            <select name="category" id="category">
              <option value="Shirts" defaultValue>Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Jackets">Jackets</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Accessories">Accessories</option>
            </select>
            <label htmlFor="price" id="" nesting="">Price Per Unit</label>
            <input type="text" name="price" defaultValue="$" id="price" nesting=" " />
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