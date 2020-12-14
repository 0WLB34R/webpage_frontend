import React from 'react'
import './ArtiSect.css'
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import Typography from '@material-ui/core/Typography';

function ArtiSect() {
    const isEditor = (localStorage.getItem('role') === "2");
    const isRevisor = (localStorage.getItem('role') === "3");
    
    const history = useHistory();

    const location = useLocation();
    const post = location.data;
    const title = post.title;
    const description = post.description;
    const shortDescription = post.shortDescription;
    const author = post.author;
    const date = post.date;
    const category = post.category;
    const revised = post.revised;
    const video = post.video;
    const idPost = post.idPost;

    const isApproved = (revised === "1" && (isEditor || isRevisor));
    const isRejected = (revised === "2" && (isEditor || isRevisor));
    const isPending =( revised === "0" && (isEditor || isRevisor));

    const approve = () =>{
        Axios.put("http://skynet.lp.upb.edu/~pbruckner18/webpage_backend/posts", {
            idPost: idPost,
            title: title,
            shortDescription: shortDescription,
            description: description,
            author: author,
            date: Date().toLocaleString(),
            photo: "http://skynet.lp.upb.edu/~pbruckner18/webpage_backend/storage/images/posts/serj.jpg",
            category: category,
            revised: "1",
            video: video,
    }).then((response) => {
        console.log(response);
    });
    };

    const reject = () =>{
        Axios.put("http://skynet.lp.upb.edu/~pbruckner18/webpage_backend/posts", {
            idPost: idPost,
            title: title,
            shortDescription: shortDescription,
            description: description,
            author: author,
            date: Date().toLocaleString(),
            photo: "http://skynet.lp.upb.edu/~pbruckner18/webpage_backend/storage/images/posts/serj.jpg",
            category: category,
            revised: "2",
            video: video,
    }).then((response) => {
        console.log(response);
    });
    };

    const deleteart= () =>{
        Axios.delete('http://skynet.lp.upb.edu/~pbruckner18/webpage_backend/posts', {
            data:{
            idPost: idPost,
            }
        }).then((response) => {
        console.log(response);
    });
    };
    

    console.log(idPost);

    return (
        <>
            <div className='artmaincont'>
                <h1 className='arttitle'>{title}</h1>
                {isApproved && <h1 className='status'>Artículo Aprobado</h1>} 
                {isRejected && <strong className='status'>Artículo Rechazado</strong>} 
                {isPending && <strong className='status'>Artículo Sin Revisar</strong>} 
                <strong className='artshort'>"{shortDescription}"</strong>
                <strong className='author'>Por: {author} | {date}</strong>
                <strong className='category'>Categoría: {category}</strong>
                <strong className='media'>
                <iframe title='A video' width="1024" height="512" src={video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </strong>
                <div className='body'> {description}</div>
        

                {isRevisor &&  <Link to ='/artireded'> <button onClick = {approve}>Aprobar</button> </Link>}
                {isRevisor &&  <Link to ='/artireded'> <button onClick = {reject}>Rechazar</button> </Link>}

                {isEditor &&
            <Link to ='/artireded' >
            <Button 
                size = "small"
                color = "primary"
                onClick={deleteart}
             > Borrar Artículo</Button>
             </Link>}

             {isEditor &&
             <Button size="small" color="primary" onClick={() => history.push({pathname: '/editarti', data: {idPost: post.idPost, title: post.title, shortDescription: post.shortDescription, description: post.description, author: post.author, date: post.date, photo: post.photo, category: post.category, revised: post.revised, video: post.video}})}>
             Editar Articulo
             </Button>
            }
            </div>
            <footer>
                <Typography variant="h6" align="center" gutterBottom>
                    Banco Central de Bolivia
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                <p>Derechos Reservados ® Banco Central de Bolivia 2011- 2020</p>
                <p>Teléfono:(591-2) 240 9090 - Fax:(591-2) 266 1590 Línea gratuita: 800 10 2023 - Casilla de Correo: 3118</p>
                <p>Correo electrónico: bancocentraldebolivia@bcb.gob.bo</p>
                <p>Calle Ayacucho y Mercado</p>
                <p>La Paz - Bolivia</p>
                </Typography>
            </footer>
        </>
    )
}

export default ArtiSect
