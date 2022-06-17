import { AppBar, Button, Link, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Box, Container } from "@mui/system";
import http from "../../../http";
import {Link as ApelidoLinkDom} from 'react-router-dom'

const FormularioRestaurante = () => {

    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(responta => {
                    console.log(responta)
                    setNomeRestaurante(responta.data.nome);
                })
        }
    }, [parametros])
    const [nomeRestaurante, setNomeRestaurante] = useState('');



    const aoSubmeterForm = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('editado')
                })
        }
        else {
            http.post("restaurantes/", {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('cadastrado')
                })
        }

    }
    return (
        <>
         

            <Box>
                <Container maxWidth='lg' sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>

                        {/* Conteudo */}

                        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow:1 }}>
                            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>

                            <Box component="form" sx={{width:'100%'}} onSubmit={aoSubmeterForm}>

                                <TextField value={nomeRestaurante}
                                    onChange={evt => setNomeRestaurante(evt.target.value)}
                                    id="standard-basic" label="Nome do Restaurante" variant="standard"
                                    fullWidth
                                    required
                                />

                                <Button sx={{ marginTop: 1 }} fullWidth type="submit" variant="outlined">Salvar</Button>
                            </Box>
                        </Box>

                    </Paper>

                </Container>
            </Box>


        </>



    )
}

export default FormularioRestaurante;