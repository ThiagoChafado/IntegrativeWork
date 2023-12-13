import './styleFooter.css'
function Footer(){
    return(
        <>
            <footer>
                <div className='titleCopy'>
                    <h1>NovaTec &copy;</h1>
                    <hr></hr>
                </div>
                <div className='mainFooter'>
                    {/* whatsapp icon  */}
                    <h2>Informações para Contato</h2>
                    <div className='icons'>
                        <div class="whatsapp">
                            <a href="https://api.whatsapp.com/send?phone= 55 49 98411-1957&text=Gostaria%20de%20receber%20mais%20informações?" class="icon" target="_blank">
                                <i class="fab fa-whatsapp"></i>
                                <h4>Clique para conversar no Whatsapp</h4>
                            </a>
                        </div>  
                        <hr></hr>

                        <div className='adress'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                            </svg>
                            <h4>Rua Travessa Brasil</h4>
                        </div>
                       
                        <hr></hr>

                        <div className='email'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                            </svg>
                            <h4>tecnii@hotmail.com</h4>

                        </div>
                    </div>
                    <hr></hr>

                    <div className='copy'>
                        <p>Desenvolvido por <a href="https://github.com/ThiagoChafado/IntegrativeWork.git" className='text-light' id='git'>Thiago Chafado e João Ferrari</a> - 2023</p>
                    </div>

                </div>

            </footer>
        
        </>
        
    );
}
export default Footer;