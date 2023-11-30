import logo from '../../assets/logoNovatecNoBackground.png';
import './styleNav.css'
import { Link } from 'react-router-dom';
function Navbar(){
    return(
     <>
        <nav class="navbar navbar-expand-lg navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        
            <div class="container-fluid">
              <img src={logo} alt="Logo" />
                
                <Link className="navbar-brand" to={"/"}>NOVATEC</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <Link className="nav-link active" to={"addsale"}> Adicionar Venda</Link>
                    </li>
                    <li class="nav-item">
                    <Link className="nav-link active" to={"addexit"}> Adicionar Saída</Link>
                    </li>
                    <li class="nav-item">
                    <Link className="nav-link active" to={"dashboard"}> Dashboard </Link>
                    </li>
                  </ul>
                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" id="table" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Tabelas
                      </a>
                      <ul class="dropdown-menu">
                      
                        <li> <Link className='dropdown-item' to={"salestable"}> Vendas</Link></li>
                        <li> <Link className='dropdown-item' to={"exitstable"}> Saídas</Link></li>
                        <li> <Link className='dropdown-item' to={"alltable"}> Geral </Link></li>
                      </ul>
                  </li>

                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" id="user" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Usuário
                      </a>
                      <ul class="dropdown-menu">
                      <li> <Link className='dropdown-item' to={"login/preferences"}> Preferencias </Link></li>
                      <li> <Link className='dropdown-item' to={"login"}> Sair </Link></li>
                      </ul>
                  </li>


                </div>
            </div>
</nav>

     </>

   
    );
}

export default Navbar;