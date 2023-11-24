import './App.css';
import backgroundImage from './images/bg1.jpeg'
import {TextField, Card, Button, Box, Typography, Modal, Paper} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {red500, redA700} from "mui/source/styles/colors";
import {useState} from "react";


function ModalContent({heading, data}) {
    return (
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <h1>{heading}</h1>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Grid2 item xs={12}>
                    <Grid2 container justifyContent="center" spacing={3}>
                        {data.map((value) => (
                            <Grid2 key={value} item>
                                <Paper
                                    sx={{
                                        height: 160,
                                        width: '10vw',
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                </Grid2>
            </Typography>
        </div>

    );
}

function App() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        console.log("asdfasdf");
        setOpen(true);
    }
    const handleClose = () => setOpen(false);


   return (
    <div style = {{
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        verticalAlign:"middle"
    }}>

        <Grid2
            container
            direction="column"
            spacing={3}
            alignItems="center"

        >
            <Grid2 item xs>
                <Card
                    sx={{
                        backgroundColor: 'white',
                        width: '25vw',
                        height: 45,
                        padding: '5px',
                        paddingTop:'10px'
                    }} variant = "outlined" >
                    <TextField
                        style = {{backgroundColor: 'white', width: '100%', alignContent: 'center'}}
                        id="outlined-size-small"
                        label="Please enter user id"
                        size="small"
                        type={'text'}
                    />
                </Card>
            </Grid2>
        <Grid2 item s>
            <Button
                style={{
                width: '200px',
                backgroundColor: red500,
                '&:hover': {
                    backgroundColor: redA700,
                }}}
                variant="contained"
                onClick={handleOpen}
            >
                Recommend Movie
            </Button>
        </Grid2>
        </Grid2>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80vw',
                height: '80vh',
                bgcolor: 'background.paper',
                border: '9px double #FF0000',
                boxShadow: 24,
                p: 5,

            }} >
                <div className="modal-content" >
                    <ModalContent heading = "Matrix Factorization" data={[0, 1, 2,3,4,5,6,7,8,9]} />
                    <ModalContent heading = "K-Nearest Neighbor" data={[0, 1, 2,3,4,5,6,7,8,9]} />
                    <Button
                        style={{
                            position: 'absolute',
                            bottom: '5%',
                            left: '42%',
                            width: '200px',
                            backgroundColor: red500,
                            '&:hover': {
                                backgroundColor: redA700,
                            }}}
                        variant="contained"
                        onClick = {handleClose}
                    >
                        Close
                    </Button>
                </div>
            </Box>

        </Modal>

    </div>
  );
}

export default App;
