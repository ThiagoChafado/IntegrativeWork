import logo from '../../assets/logoNovatecNoBackground.png';
import './style.css'

function Navbar(){
    return(
      <nav class="navbar navbar-expand-lg bg-dark">
          <div class="container-fluid">
          <a class="navbar-brand" href="#">
              <img src={logo} alt="Logo" width="120" height="70"class="d-inline-block align-text-top"/>
          </a>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="#">Adicionar Venda</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Adicionar Saída</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Dashboard</a>
                </li>
                
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Tabelas
                  </a>
                      <ul class="dropdown-menu ms-auto ">
                          <li><a class="dropdown-item " href="#">Tabela de vendas</a></li>
                          <li><a class="dropdown-item" href="#">Tabela de saídas</a></li>
                          <li><a class="dropdown-item" href="#">Tabela geral?   </a></li>
                      </ul>
                </li>
              </ul>
              <span class="navbar-text">
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle text-light bg-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">User logged</a>
                      <ul class="dropdown-menu ms-auto ">
                      <li><a class="dropdown-item " href="#">Action</a></li>
                      <li><a class="dropdown-item" href="#">Another action</a></li>
                      <li><hr class="dropdown-divider"/></li>
                      <li><a class="dropdown-item" href="#">Something else here</a></li>
                      </ul>
                </li> 
              </span>
            </div>
          </div>
      </nav>

   
    );
}

export default Navbar;