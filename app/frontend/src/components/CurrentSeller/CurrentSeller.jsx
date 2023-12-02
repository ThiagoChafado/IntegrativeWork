import axios from "axios";
import React from "react";
import edit from "../../assets/editimg.png";
import "./styleEdit.css";
import { useNavigate,useParams } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3001";


function CurrentSellers() {
  const [sellerList, setSellerList] = React.useState([]);
  const navigate = useNavigate();
  const shopname = useParams();
  React.useEffect(()=>{
    if (!localStorage.getItem("tokensuper")){
      navigate("/loginsuper")
    }
  },[])

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await axios.get(`/sellers/sellers/${shopname.shopname}`);
      setSellerList(res.data);
      //return backend Object
    } catch (error) {
      setSellerList([]);
    }
  }
  return (
    <>
      {sellerList.length > 0 && (
        <div class="container-fluid p-0">
          <table class="table">
            <thead class="table-dark">
              <tr>
                <th scope="col">Cpf</th>
                <th scope="col">Nome</th>
                <th scope="col">Data de nascimento</th>
                <th scope="col">Comissão</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {/* Populate table */}
              {sellerList.map((i) => {
                //itens
                return (
                  <tr>
                    <th scope="row">{i.sellercpf}</th> {/* Getting elements*/}
                    <td>{i.sellername}</td>
                    <td>{i.dtbirth}</td>
                    <td>{i.pccommision}%</td>
                    <td>
                      <button className="editButton">
                        <img src={edit} className="edit"></img>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
export default CurrentSellers;
