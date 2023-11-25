import './style.css'
import logo from '../../assets/logoNovatecNoBackground.png';

function Login(){
    return(
        <>
          <div className='mainLogin'>
              <img src={logo} alt="Logo" />
              <div className='center'>
                <div className='card'>
                  <h1>LOGIN</h1>
                  <div className='text'>
                      <label htmlFor="user">Usuário</label>
                      <input type='text' placeholder='Usuário'></input>
                  </div>

                  <div className='text'>
                      <label htmlFor="pass">Senha</label>
                      <input type='password' placeholder='Senha'></input>
                  </div>

                  <button className='loginB'>Login</button>
                </div>
              </div>
          </div>
        </>
    );
}
export default Login;