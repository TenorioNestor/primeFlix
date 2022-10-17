import {useEffect, useState} from 'react';
import {useParams, useNavigate, Navigate} from 'react-router-dom';
import api from '../../services/api';
import { toast} from 'react-toastify';

import '../Filme/filme-info.css';


function Filme(){
//para acessar os parametros
    const { id } = useParams();
    const navigation = useNavigate();
//sintaxe useState const[variavel, setVariavel] = useState({});
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

//sintaxe useEffect useEffect(()) =>{},[]);
    useEffect(()=> {
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"9366380882b42a35fb1084fb18b44e27",

                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=> {
                console.log("Não foi possivel carregar");
                navigation("/" , {replace:true})
                return;
            })
        }
        loadFilme();

        return(()=>{
            console.log("Desconstruido");
        })

    },[navigation,id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        //verificar se já tem esse filme salvo na lista
        const hasFilmes = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilmes){
            toast.warn("ESTE FILME JÁ ESTA NA SUA LISTA!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        <div className="filme-info">
            <h1>Carregando detalhes...</h1>
        </div>
    }

    return(
        <div className="filme-info" >
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h2>Sinopse</h2>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>


            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.title} Trailer Oficial`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>



    );
}

export default Filme;