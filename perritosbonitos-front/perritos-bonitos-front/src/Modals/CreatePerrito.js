import React, { useEffect, useState } from 'react';

//Material Components
import { Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from "axios";

export default function CreatePerritoModal({backendURL, openNewPerrito, setOpenNewPerrito, loadPerritos}) {
    const [name, setName] = useState("")
    const [file, setFile] = useState(null)
    const [extension, setExtension] = useState("")
    const [errorApi, setErrorApi] = useState(false)

    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    const handleCapture = ({ target }) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target.files[0]);
        setExtension(target.files[0].name.split('.').pop());
        fileReader.onload = (e) => {
            setFile(e.target.result);
        };
    };

    const handleCreate = async () => {
        try {
            if(file && name && extension)
            {
                const resp = await axios.post(backendURL + "/perrito", {
                    name: name,
                    extension: extension,
                    file: file
                });
                console.log(resp.status);
                if (resp.status == 200) {
                    setErrorApi(false);
                    loadPerritos();
                    setFile(null);
                    setName("");
                    setExtension("");
                    setOpenNewPerrito(false);
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

    const handleCloseNewPerrito = async () => {
        setFile(null);
        setName("");
        setExtension("")
        setOpenNewPerrito(false);
    };


    return (
        <Dialog
            open={openNewPerrito}
            onClose={handleCloseNewPerrito}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Nuevo Perrito Bonito"}
            </DialogTitle>
            <DialogContent>
                <img src={file}
                    style={{
                        height: 174
                    }}
                />
                <br></br>
                <TextField
                    required
                    id="caption"
                    label="Nombre"
                    type="input"
                    variant="filled"
                    value={name}
                    onChange={handleChangeName}
                />
                <input
                    id="icon-button-photo"
                    accept="image/*"
                    onChange={handleCapture}
                    type="file"
                    style={{ display: 'none' }}
                />
                <label htmlFor="icon-button-photo">
                    <IconButton color="primary" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
                {
                    errorApi &&
                    <>
                        <br></br>
                        <Alert severity="error">Error al crear al nuevo perrito :(</Alert>
                    </>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseNewPerrito}>Cancel</Button>
                <Button onClick={handleCreate} autoFocus>Create</Button>
            </DialogActions>
        </Dialog>
    );
}