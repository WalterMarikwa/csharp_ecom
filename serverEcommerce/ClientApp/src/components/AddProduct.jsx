import * as React from "react";
import { ProductData } from "./FetchProducts";

export class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      loading: true,
      productList: [],
      prodData: new ProductData()
    };
    fetch("api/Products/")
      .then(response => response.json())
      .then(data => {
        this.setState({ productList: data });
      });
    var prodid = this.props.match.params["id"];
    // This will set state for Edit product
    if (prodid > 0) {
      fetch("api/Products/" + prodid)
        .then(response => response.json())
        .then(data => {
          this.setState({ title: "Edit", loading: false, prodData: data });
        });
    }
    // This will set state for Add product
    else {
      this.state = {
        title: "Create",
        loading: false,
        productList: [],
        prodData: new ProductData()
      };
    }
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderCreateForm(this.state.productList)
    );
    return (
      <div>
        <h1>{this.state.title}</h1>
        <h3>Product</h3>
        <hr />
        {contents}
      </div>
    );
  }
  // This will handle the submit form event.
  handleSave = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    var objData = {};
    data.forEach(function(value, key) {
        if (key === "id" || key === "stockQuantity") {
            objData[key] = parseInt(value)
        } else {
            objData[key] = value;
        }
    });
    if (typeof objData.available === "undefined") {
        objData.available = false;
    } else {
        objData.available = true;
    }

    var jsonData = JSON.stringify(objData);
    // PUT request for Edit product.
    if (this.state.prodData.id) {
      fetch("api/Products/" + this.state.prodData.id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: jsonData
      })
        .then(response => response.json())
        .then(responseJson => {
          this.props.history.push("/fetchproducts");
        });
    }
    // POST request for Add product.
    else {
      fetch("api/Products", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: jsonData
      })
        .then(response => response.json())
        .then(responseJson => {
          this.props.history.push("/fetchproducts");
        });
    }
  };
  // This will handle Cancel button click event.
  handleCancel(e) {
    e.preventDefault();
    this.props.history.push("/fetchproducts");
  }
  // Returns the HTML Form to the render() method.
  renderCreateForm(productList) {
    return (
      <form onSubmit={this.handleSave}>
        <div className="form-group row">
          <input type="hidden" name="id" value={this.state.prodData.id} />
        </div>
        <div className="form-group row">
          <label className=" control-label col-md-12" htmlFor="Name">
            Name
          </label>
          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              name="productName"
              defaultValue={this.state.prodData.productName}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="control-label col-md-12" htmlFor="Category">
            Category
          </label>
          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              name="category"
              defaultValue={this.state.prodData.category}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="control-label col-md-12" htmlFor="Description">
            Description
          </label>
          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              name="description_type"
              defaultValue={this.state.prodData.description_type}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="control-label col-md-12" htmlFor="Stock">
            Stock
          </label>
          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              name="stockQuantity"
              defaultValue={this.state.prodData.stockQuantity}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="control-label col-md-12" htmlFor="image">
            Image
          </label>
          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              name="image"
              defaultValue={this.state.prodData.image}
              required
            />
          </div>
          <label className="control-label col-md-12" htmlFor="available">
            Available
          </label>
          <div className="col-md-4">
            <input
              className="form-control"
              type="checkbox"
              name="available"
              checked={this.state.prodData.available}
              value="1"
            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-default">
            Save
          </button>
          <button className="btn" onClick={this.handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}
