import '../AddSale/styleSale.css'


function AddSale() {
  return (
    <div className='container'>
      <div className="title">
        <h1>Adicionar Venda</h1>
      </div>

      <div className='description'>
        <label htmlFor="description">Descrição</label>
        <input type="text" placeholder='Digite aqui...'/>
      </div>

      <div className='values'>

        <input type="date" placeholder='Data'/>
        <input type="text" placeholder='Valor'/>

        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Método de Pagamento
            </button>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Dinheiro</a></li>
              <li><a class="dropdown-item" href="#">Cartão de Crédito</a></li>
              <li><a class="dropdown-item" href="#">Cartão de Débito</a></li>
              <li><a class="dropdown-item" href="#">Pix</a></li>
            </ul>
        </div>

        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Vendedor

            </button>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Dinheiro</a></li>
              <li><a class="dropdown-item" href="#">Cartão de Crédito</a></li>
              <li><a class="dropdown-item" href="#">Cartão de Débito</a></li>
              <li><a class="dropdown-item" href="#">Pix</a></li>
              
            </ul>
        </div>
          
      </div>

      <div className='buttonC'>
        <button>Adicionar</button>
      </div>

    </div>

  );
}
export default AddSale;
