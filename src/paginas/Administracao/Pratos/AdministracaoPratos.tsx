import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(response => {
                setPratos(response.data);
            })
    }, [])

    const excluir = (pratoASerExcluir:IPrato) => {
        http.delete(`/pratos/${pratoASerExcluir.id}/`)
        .then(response=>{
            const novosPratos = pratos.filter(prato => prato.id !== pratoASerExcluir.id);
            setPratos([...novosPratos]);
        })
        .catch(responseError=>{
            console.log(responseError);
        })
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                  
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {pratos.map(prato => (
                        <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                     
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                <a href={prato.imagem} target="_blank" rel="noreferrer">ver imagem</a>
                            </TableCell>
                            <TableCell>
                                [<Link to={`/admin/pratos/${prato.id}`}>editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={()=>excluir(prato)}>
                                    excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}


                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default AdministracaoPratos;
