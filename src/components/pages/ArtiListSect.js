import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {makeStyles} from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      background: 'linear-gradient(45deg, #4287f5 30%, #FF8E53 90%)',
      padding: theme.spacing(8, 0, 6),
      color: 'white',
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%',
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      background: 'linear-gradient(45deg, #4287f5 30%, #FF8E53 90%)',
      padding: theme.spacing(6),
      color: 'white',
    },
  }));

function ArtiListSect() {
    var role = localStorage.getItem("role");
    const [posts, setPosts]= useState([]);
    const classes = useStyles();
    useEffect(()=> {
        axios.get('webpage_backend/posts')
        .then (res => {
            console.log(res)
            setPosts(res.data)
        })
        .catch (err => {
            console.log(err)
        }, [])
    })
    const history = useHistory();
      console.log(localStorage.getItem('name'))
    return (
        <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="white" gutterBottom>
                BCB Educa
              </Typography>
              <Typography variant="h5" align="center" color="white" paragraph>
                Artículos informativos y educativos
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {role === "" ? posts.filter(post => post.revised === "1").map((post) => (
                <Grid item key={post} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={post.photo}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      <Typography>
                        {post.shortDescription}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => history.push({pathname: '/artpg', data: {idPost: post.idPost, title: post.title, shortDescription: post.shortDescription, description: post.description, author: post.author, date: post.date, photo: post.photo, category: post.category, revised: post.revised, video: post.video}})}>
                        Ver
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )) : posts.map((post) => (
                <Grid item key={post} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={post.photo}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      <Typography>
                        {post.shortDescription}
                      </Typography>
                      <Typography>
                        {post.revised === "1" ? "Aceptado" : post.revised === "2" ? "Sin revisar" : "Rechazado"}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => history.push({pathname: '/artpg', data: {idPost: post.idPost, title: post.title, shortDescription: post.shortDescription, description: post.description, author: post.author, date: post.date, photo: post.photo, category: post.category, revised: post.revised, video: post.video}})}>
                        Ver
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Banco Central de Bolivia
                </Typography>
                <Typography variant="subtitle1" align="center" color="white" component="p">
                <p>Derechos Reservados ® Banco Central de Bolivia 2011- 2020</p>
                <p>Teléfono:(591-2) 240 9090 - Fax:(591-2) 266 1590 Línea gratuita: 800 10 2023 - Casilla de Correo: 3118</p>
                <p>Correo electrónico: bancocentraldebolivia@bcb.gob.bo</p>
                <p>Calle Ayacucho y Mercado</p>
                <p>La Paz - Bolivia</p>
                </Typography>
            </footer>
        {/* End footer */}
      </React.Fragment>
        )
}

export default ArtiListSect