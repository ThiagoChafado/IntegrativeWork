import logo from '../../assets/logoNovatecNoBackground.png';
import './styleNav.css'

function Navbar(){
    return(
     <>
        <nav class="navbar navbar-expand-lg navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        
            <div class="container-fluid">
              <img src={logo} alt="Logo" />
                <a class="navbar-brand" href="#">NOVATEC</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">Adicionar Venda</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active" href="#">Adicionar Saída</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active" href="#">Dashboard</a>
                    </li>
                  </ul>
                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" id="table" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Tabelas
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Saídas</a></li>
                        <li><a class="dropdown-item" href="#">Vendas</a></li>
                        <li><a class="dropdown-item" href="#">Geral</a></li>
                      </ul>
                  </li>

                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" id="user" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Usuário
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Sair</a></li>
                      </ul>
                  </li>


                </div>
            </div>
</nav>

     </>

   
    );
}

export default Navbar;