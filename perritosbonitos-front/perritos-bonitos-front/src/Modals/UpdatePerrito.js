import React, { useEffect, useState } from 'react';
import axios from "axios";

//Material Components
import { Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@mui/material';


export default function UpdatePerritoModal({backendURL, openUpdatePerrito, setOpenUpdatePerrito, perritoId, perritoCaption, perritoSrc, loadPerritos}) {
    const [caption, setCaption] = useState(perritoCaption)
    const [errorApi, setErrorApi] = useState(false)
    useEffect(() => {
        setCaption(perritoCaption);
      }, [perritoCaption]);

    const handleChangeCaption = (event) => {
        setCaption(event.target.value)
    }

    const handleCloseUpdatePerrito = async () => {
        setOpenUpdatePerrito(false);
    };

    const handleUpdate = async () => {
        try {
            if(caption)
            {
                const resp = await axios.put(backendURL + "/perrito/"+perritoId, {
                    caption: caption,
                });
                console.log(resp.status);
                if (resp.status == 200) {
                    setErrorApi(false);
                    loadPerritos();
                    setOpenUpdatePerrito(false);
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
            open={openUpdatePerrito}
            onClose={handleCloseUpdatePerrito}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Update Perrito Bonito"}
            </DialogTitle>
            <DialogContent>
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
                    type="input"
                    variant="filled"
                    value={caption}
                    onChange={handleChangeCaption}
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
                <Button onClick={handleCloseUpdatePerrito}>Cancel</Button>
                <Button onClick={handleUpdate} autoFocus>Update</Button>
            </DialogActions>
        </Dialog>
    );
}