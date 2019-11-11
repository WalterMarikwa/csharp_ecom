import * as React from 'react';    
import { Link } from 'react-router-dom';  


export class FetchProduct extends React.Component {  
    constructor() {  
        super();  
        this.state = { prodList: [], loading: true };  
        this.loadProducts();
    }  

loadProducts = () => {
    fetch('api/Products/')  
            .then(response => response.json())  
            .then(data => {  
                this.setState({ prodList: data, loading: false });  
            });  
}

  render() {  
        let contents = this.state.loading  
            ? <p><em>Loading...</em></p>  
            : this.renderProductTable(this.state.prodList);  
        return <div>  
            <h1>Products Data</h1>  
            <p>This component demonstrates fetching Product data from the server.</p>  
            <p>  
                <Link to="/addproducts">Create New</Link>  
            </p>  
            {contents}  
        </div>;  
    }  
    // Handle Delete request for an product  
   handleDelete = (id) => {  
        fetch('api/Products/' + id, {  
            method: 'delete'  
        }).then(data => {  
            this.setState(  
                {  
                    prodList: this.state.prodList.filter((rec) => {  
                        return (rec.id !== id);  
                    })  
                });  
        });  
    }  
    
    handleEdit = (id) => {  
        this.props.history.push("/products/edit/" + id);  
    }  
    // Returns the HTML table to the render() method.  
     renderProductTable(prodList) {  
        return <table className='table'>  
            <thead>  
                <tr>   
                    <th>id</th>  
                    <th>productName</th>  
                    <th>category</th>  
                    <th>description_type</th>  
                    <th>stockQuantity</th> 
                    <th>image</th>  
                </tr>  
            </thead>  
            <tbody>  
                {prodList.map(prod =>  
                    <tr key={prod.id}>   
                        <td>{prod.id}</td>  
                        <td>{prod.productName}</td>  
                        <td>{prod.category}</td>  
                        <td>{prod.description_type}</td>  
                        <td>{prod.stockQuantity}</td>  
                        <td>{prod.image}</td> 
                        <td>  
                            <span  className="action" onClick={(id) => this.handleEdit(prod.id)}>Edit</span>  |  
                            <span  className="action" onClick={(id) => this.handleDelete(prod.id)}>Delete</span>  
                        </td>  
                    </tr>  
                )}  
            </tbody>  
        </table>;  
    }  
}  
export class ProductData {  
    id  = 0;  
    productName = "";  
    category = "";  
    description_type = "";  
    stockQuantity = "";
    image = "";  
}