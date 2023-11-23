import axios from "axios";
import React from "react";
axios.defaults.baseURL = 'http://localhost:3001';
  

 function SalesTable(){
   const [nameSale,setNameSale] = React.useState("");
   const [idSale,setIdSale] = React.useState("");
   const [payment,setPayment] = React.useState("");
   const [sellValue,setSellValue] = React.useState("");
   const [Seller,setSellerSale] = React.useState("");

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
       <th scope="col">Id</th>
       <th scope="col">Descrição</th>
       <th scope="col">Valor</th>
       <th scope="col">Forma de pagamento</th>
       <th scope="col">Vendedor</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <th scope="row">{sellList[0].idsell}</th>
       <td>{sellList[0].descr}</td>
       <td>{sellList[0].sellvalue}</td>
       <td>{sellList[0].mtdpayment}</td>
       <td>{sellList[0].sellercpf}</td>
     </tr> 
     </tbody>
  </table>
  </div>
     } 
         
      
      </>
        
     
    
      );
  }



  


export default SalesTable