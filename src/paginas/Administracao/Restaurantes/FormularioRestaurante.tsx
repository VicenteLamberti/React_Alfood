import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Box } from "@mui/system";

const FormularioRestaurante = () => {

    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(responta => {
                    console.log(responta)
                    setNomeRestaurante(responta.data.nome);
                })
        }
    })
    const [nomeRestaurante, setNomeRestaurante] = useState('');



    const aoSubmeterForm = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (parametros.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('editado')
                })
        }
        else {
            axios.post("http://localhost:8000/api/v2/restaurantes/", {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('cadastrado')
                })
        }

    }
    return (
        <Box sx={{display:'flex' , flexDirection:"column" , alignItems:"center"}}>
            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>

            <Box component="form" onSubmit={aoSubmeterForm}>

                <TextField value={nomeRestaurante}
                    onChange={evt => setNomeRestaurante(evt.target.value)}
                    id="standard-basic" label="Nome do Restaurante" variant="standard"
                />

                <Button type="submit" variant="outlined">Salvar</Button>
            </Box>
        </Box>


    )
}

export default FormularioRestaurante;