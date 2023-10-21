function Login(){
    return(
        <div className="container min-vh-100 d-flex justify-content-center align-items-center border">
        <form>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Digite o usuário</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Digite a senha</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3 form-check">
  

  </div>
  <button type="submit" class="btn btn-primary">Logar</button>
</form>
</div>
    );
}
export default Login;