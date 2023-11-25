import axios from "axios";
import React from "react";

axios.defaults.baseURL = 'http://localhost:3001';

 function SalesTable(){
   const [sellList,setSellList] = React.useState([]);
   const [date,setDate] = React.useState();
  
   React.useEffect(()=>{
    getData();
  },[date]);




  React.useEffect(()=>{
    getDefaultDate();
  },[]);

  



   function getDefaultDate(){
    const pcDate = new Date();
    const year = pcDate.getFullYear();
    const month = pcDate.getMonth()+1;   //Month 0-11
    const day = pcDate.getDate();
    const currentDate = `${year}-${month}-${day}`

    setDate(currentDate);

    const dateControl = document.querySelector('input[type="date"]');
    dateControl.value = date;
    
  }

  
  

   async function getData(){
    try{
      const res = await axios.get("/salesdate/" + date);
      setSellList(res.data);
      //objeto dos dados do back //fazer botao data - separar
    }catch(error){
      setSellList([]);
    }
  }
    return(
    <>

<div>
        <input
          type="date"
          id="dateInput"
          value={date || ''}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
  </div>

      
      
  


    {sellList.length > 0 && //deixar
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
  {sellList.map(i =>{//itens
    return(
    <tr>
     <th scope="row">{i.idsell}</th> {/* Acessando elementos*/}
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