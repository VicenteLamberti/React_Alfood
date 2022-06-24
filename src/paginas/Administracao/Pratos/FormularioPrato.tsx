import { AppBar, Button, FormControl, InputLabel, Link, MenuItem, Paper, Select, TextField, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Box, Container } from "@mui/system";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPrato = () => {
    const [nomePrato, setNomePrato] = useState('');

    const [descricao, setDescricao] = useState('');

    const [tags, setTags] = useState<ITag[]>([]);

    
    const [tag, setTag] = useState('');

    const [imagem, setImagem]=useState<File|null>(null);

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [restaurante, setRestaurante]  = useState('');
    // const parametros = useParams();

    // useEffect(() => {
    //     if (parametros.id) {
    //         http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
    //             .then(responta => {
    //                 console.log(responta)
    //                 setNomeRestaurante(responta.data.nome);
    //             })
    //     }
    // }, [parametros])

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags));

        http.get<IRestaurante[]>('restaurantes/')
        .then(resposta => setRestaurantes(resposta.data));
    }, [])





    const selecionarArquivo= (evt: React.ChangeEvent<HTMLInputElement>)=>{
        if(evt.target.files?.length){
            setImagem(evt.target.files[0]);
        }
        else{
            setImagem(null);
        }
    }

    
    const aoSubmeterForm = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const formData = new FormData();
        formData.append('nome',nomePrato);
        formData.append('descricao',descricao);
        formData.append('tag',tag);
        formData.append('restaurante',restaurante);

        if(imagem){
            formData.append('imagem',imagem);
        }

        http.request({
            url:'pratos/',
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data'
            },
            data:formData
        })
        .then(() =>{
            setNomePrato('');
            setDescricao('');
            setTag('');
            setRestaurante('');
            alert('Prato cadastrado com sucesso');
        })
        .catch(erro=> console.log(erro))

    }
    return (
        <>


            <Box>
                <Container maxWidth='lg' sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>

                        {/* Conteudo */}

                        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                            <Typography component="h1" variant="h6">Formulário de Pratos</Typography>

                            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>

                                <TextField value={nomePrato}
                                    onChange={evt => setNomePrato(evt.target.value)}
                                    id="standard-basic" label="Nome do Prato" variant="standard"
                                    fullWidth
                                    required
                                    margin="dense"
                                />


                                <TextField value={descricao}
                                    onChange={evt => setDescricao(evt.target.value)}
                                    id="standard-basic" label="Descrição" variant="standard"
                                    fullWidth
                                    required
                                    margin="dense"
                                />


                                <FormControl margin="dense" fullWidth >
                                    <InputLabel id="select-tag">Tag</InputLabel>
                                    <Select labelId="select-tag" value={tag} onChange={evt=>setTag(evt.target.value)}>
                                        {tags.map(tag => <MenuItem value={tag.value} key={tag.id}>
                                            {tag.value}
                                        </MenuItem>)}
                                    </Select>
                                </FormControl>

                                <FormControl margin="dense" fullWidth >
                                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                                    <Select labelId="select-restaurante" value={restaurante} onChange={evt=>setRestaurante(evt.target.value)}>
                                        {restaurantes.map(restaurante => <MenuItem value={restaurante.id} key={restaurante.id}>
                                            {restaurante.nome}
                                        </MenuItem>)}
                                    </Select>
                                </FormControl>

                                <input type="file" onChange={selecionarArquivo}/>

                                <Button sx={{ marginTop: 1 }} fullWidth type="submit" variant="outlined">Salvar</Button>
                            </Box>
                        </Box>

                    </Paper>

                </Container>
            </Box>


        </>



    )
}

export default FormularioPrato;