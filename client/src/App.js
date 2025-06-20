import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
// import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const URL = "http://localhost:3000";

  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  const getItemS = () => {
    axios({
      method: "GET",
      url: `${URL}/items`
    })
      .then(items => {
        setItems(items.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getItemS()
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    axios({
      method: "POST",
      url: `${URL}/items`,
      data: {
        name, type,
        price: +price,
        stock: +stock
      }
    })
      .then(result => {
        console.log(result);
        getItemS()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deleteHandler = (e, id) => {
    e.preventDefault()

    axios({
      method: "DELETE",
      url: `${URL}/items/${id}`
    })
    .then(reuslt =>{
      console.log(reuslt)
      getItemS()
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="container">
      <div className="row text-center">
        <div className="col-12 bg-primary text-white">
          <h1>Inventory Applications</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="row">
            <div className="col-12">
              <h3>Input Item</h3>
              <hr />
            </div>
            <div className="col-12">
              <form>
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input type="text" class="form-control" onChange={(e) =>
                    setName(e.target.value)} />
                  <div id="emailHelp" class="form-text">Input item's name</div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Type</label>
                  <input type="text" class="form-control" onChange={(e) =>
                    setType(e.target.value)} />
                </div>
                <div class="mb-3">
                  <label class="form-label">Price</label>
                  <input type="text" class="form-control" onChange={(e) =>
                    setPrice(e.target.value)} />
                </div>
                <div class="mb-3">
                  <label class="form-label">Stock</label>
                  <input type="text" class="form-control" onChange={(e) =>
                    setStock(e.target.value)} />
                </div>
                <button onClick={(e) => submitHandler(e)} type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-12">
              <h3>List Items</h3>
              <hr />
            </div>
            <div className="row-12">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    items.length !== 0 ?
                      items.map(item => {
                        return (
                          <tr>
                            <td>{item.id}</td>
                            <td>{item.name} - <i>{item.type}</i></td>
                            <td>Rp. {item.price}</td>
                            <td>{item.stock} pcs</td>
                            <td><button className="btn btn-sm btn-danger bg-red" onClick={(e) => deleteHandler(e, item.id)}>Delete</button></td>
                          </tr>
                        )
                      }) :
                      <p>There is no items</p>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
