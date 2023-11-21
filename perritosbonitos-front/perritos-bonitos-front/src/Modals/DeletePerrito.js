import React, { useEffect, useState } from 'react';

//Material Components
import { Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@mui/material';

import axios from "axios";

export default function DeletePerritoModal({backendURL, openDeletePerrito, setOpenDeletePerrito, perritoId, perritoCaption, perritoSrc, loadPerritos}) {
    const [caption, setCaption] = useState(perritoCaption)
    const [errorApi, setErrorApi] = useState(false)
    useEffect(() => {
        setCaption(perritoCaption);
      }, [perritoCaption]);


    const handleCloseDeletePerrito = async () => {
        setOpenDeletePerrito(false);
    };

    const handleDelete = async () => {
        try {
            if(caption)
            {
                const resp = await axios.delete(backendURL + "/perrito/"+perritoId,
                );
                console.log(resp.status);
                if (resp.status == 200) {
                    setErrorApi(false);
                    loadPerritos();
                    setOpenDeletePerrito(false);
                }
                else {
                    setErrorApi(true)
                }
            }
            else {
                setErrorApi(true)
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
            setErrorApi(true);
        }
    };


    return (
        <Dialog
            open={openDeletePerrito}
            onClose={handleCloseDeletePerrito}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"De verdad vas a eliminar un Perrito Bonito? 😢"}
            </DialogTitle>
            <DialogContent style={{marginLeft: "auto", marginRight: "auto"}}>
                <img src={perritoSrc}
                    style={{
                        height: 174
                    }}
                />
                <br></br>
                <TextField
                    required
                    id="caption"
                    label="Caption"
                    InputProps={{
                        readOnly: true,
                      }}
                    variant="filled"
                    value={caption}
                />
                {
                    errorApi &&
                    <>
                        <br></br>
                        <Alert severity="error">Something went wrong</Alert>
                    </>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDeletePerrito}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}