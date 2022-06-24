import { AppBar, Button, Link, Paper, TextField, Toolbar, Typography } from "@mui/material";

import { Box, Container } from "@mui/system";
import {Link as ApelidoLinkDom, Outlet} from 'react-router-dom'

const PaginaBaseAdmin = () => {


    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography typography="h6">
                            Adminstração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <Link component={ApelidoLinkDom} to='/admin/restaurantes'>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={ApelidoLinkDom} to='/admin/restaurantes/novo'>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Restaurante
                                </Button>
                            </Link>

                            <Link component={ApelidoLinkDom} to='/admin/pratos'>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Pratos
                                </Button>
                            </Link>
                            <Link component={ApelidoLinkDom} to='/admin/pratos/novo'>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Prato
                                </Button>
                            </Link>
                            
                        </Box>
                    </Toolbar>

                </Container>
            </AppBar>

            <Box>
                <Container maxWidth='lg' sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>

                        {/* Aqui deve ir o conteudo das rotas filhas */}
                        <Outlet/>

                       
                    

                    </Paper>

                </Container>
            </Box>


        </>



    )
}

export default PaginaBaseAdmin;