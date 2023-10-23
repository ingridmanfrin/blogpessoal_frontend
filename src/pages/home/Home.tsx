import './Home.css'
import homeLogo from '../../assets/blog.jpg'

function Home() {
    return (
        <>
            <div style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center"
            }}>
                <div>
                    <div style={{
                         width: "80vw",
                         display: "flex",
                         flexDirection: "column",
                         alignItems: "center"
                    }}>
                        <h2 className='titulo'>Seja Bem Vinde!</h2>
                        <p className='p1'>Expresse aqui seus pensamentos e opiniões</p>
                    </div>

                    <div style={{
                         width: "80vw",
                         display: "flex",
                         flexDirection: "column",
                         alignItems: "center"
                    }}>
                        <img className='img'
                            src={homeLogo}
                            alt="Imagem da Página Home" 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home