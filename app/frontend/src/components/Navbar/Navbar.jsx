import logo from '../../assets/logoNovatecNoBackground.png';

function Navbar(){
    return(

        
    <div class="container-lm">
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
        <img src={logo} alt="Logo" width="120" height="70"class="d-inline-block align-text-top"/>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#">Adicionar venda</a>
        </li>
        <li class="nav-itme">
          <a class="nav-link " href="#">Adicionar saída</a>
        </li>
        
        <li class="nav-itme">
          <a class="nav-link " href="#">Dashboard</a>
        </li>
        
        <div class="d-flex justify-content-end"> 
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User logged
          </a>
          <ul class="dropdown-menu ms-auto ">
            <li><a class="dropdown-item " href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
          </li>
        
          </div>
      </ul>
      
      
      
    </div>
  </div>
</nav>
</div>
    );
}

export default Navbar;