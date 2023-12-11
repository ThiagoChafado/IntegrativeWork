import './styleSelect.css'
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3001";





function SelectShopPage() {
  const [shopList, setShoplist] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    getShops();
  }, []);

  async function getShops() {   
    try {
      const res = await axios.get("/shops/shops");
      setShoplist(res.data);
      //return backend shops
    } catch (error) {
      setShoplist([]);
    }
  }

  
  return (
    
    <div className='shop'>
      <h1>Selecione a Loja</h1>

      <div className="shopChoice">
      {shopList.length > 0 &&
        shopList.map((i) => {

          return <Link to={`/addsale/${i.shopname}`}> 
          <button>
            {`${i.shopname}`}
          </button></Link>

        })}

      </div>
    </div>
  );
}

export default SelectShopPage;
