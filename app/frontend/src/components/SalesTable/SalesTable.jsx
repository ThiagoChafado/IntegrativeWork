import axios from "axios";
import React from "react";
axios.defaults.baseURL = 'http://localhost:3001';

 function SalesTable(){
   const [sellList,setSellList] = React.useState([]);

  React.useEffect(()=>{
    getData();
  },[]);

  async function getData(){
    try{
      const res = await axios.get("/sales");
      setSellList(res.data);
      console.log(sellList);
    }catch(error){
      setSellList([]);
    }
  }
    return(
    <>
    {sellList.length > 0 &&
     <div class="container-fluid p-0">
     <table class="table">
<thead class="table-dark">
 <tr>
   <th scope="col">ID</th>
   <th scope="col">Descrição</th>
   <th scope="col">Valor</th>
   <th scope="col">Forma de pagamento</th>
   <th scope="col">Vendedor</th>
 </tr>
</thead>
<tbody>
{/* Populate table */}
  {sellList.map(i =>{
    console.log(i);
    return(
    <tr>
     <th scope="row">{i.idsell}</th>
     <td>{i.descr}</td>
     <td>{i.sellvalue}</td>
     <td>{i.mtdpayment}</td>
     <td>{i.sellercpf}</td>
     </tr> 
    )
  })}
 </tbody>
</table>
</div>
 } 

  </>
    )
      ;}
 
export default SalesTable