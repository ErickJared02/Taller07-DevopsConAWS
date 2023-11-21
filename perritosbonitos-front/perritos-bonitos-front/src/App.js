import React, { useEffect, useState } from 'react';
import { Gallery } from "react-grid-gallery";
import axios from "axios";

//Material Components
import { Container, Typography, Link, Box, Fab, Zoom } from '@mui/material';
import { Add, Delete, Update, Login, CloudSync } from '@mui/icons-material'
import { green, red, blue, deepPurple, purple } from '@mui/material/colors';

import CreatePerritoModal from './Modals/CreatePerrito';
import UpdatePerritoModal from './Modals/UpdatePerrito';
import DeletePerritoModal from './Modals/DeletePerrito';

function App() {
  const [backendURL, setBackendURL] = useState(" https://umsxgybm6a.execute-api.us-east-1.amazonaws.com/ejsm");
  const [images, setImages] = useState([]);
  const [imageSelected, setImageSelected] = useState("");
  const [perritoId, setPerritoId] = useState("");
  const [perritoCaption, setPerritoCaption] = useState("");
  const [perritoSrc, setPerritoSrc] = useState("");

  const [createPerritoModalOpen, setCreatePerritoModalOpen] = useState(false);
  const [updatePerritoModalOpen, setUpdatePerritoModalOpen] = useState(false);
  const [deletePerritoModalOpen, setDeletePerritoModalOpen] = useState(false);

  const loadPerritos = async (url = null) => {
    //Get all from backend
    try {
      const resp = await axios.get((url ? url : backendURL) + "/perritos");
      console.log(resp.data);
      const tmp = resp.data.map((perrito) => {
        return {
          ...perrito,
          height: 174,
          id: perrito.name,
          customOverlay: (
            <div className="custom-overlay__caption">
              <div>{perrito.caption}</div>
            </div>
          )
        }
      })
      setImageSelected(null)
      setImages(tmp);

    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }

  useEffect(() => {
    loadPerritos();
  }, []);

  const handleSelect = (index, item, event) => {
    setImageSelected(null);
    setPerritoId("")
    setPerritoCaption("")
    setPerritoSrc("")
    const nextImages = images.map((image, i) => {
      if (i === index) {
        if (!image.isSelected) {
          setImageSelected(image);
          setPerritoId(image.id)
          setPerritoCaption(image.caption)
          setPerritoSrc(image.src)
        }
        return { ...image, isSelected: !image.isSelected }
      }
      else {
        return { ...image, isSelected: false }
      }
    });
    setImages(nextImages);
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Perritos Bonitos - Erick 🐶🐩🐕‍🦺🦮🐕
        </Typography>
        <Gallery images={images}
          enableImageSelection={true}
          onSelect={handleSelect}
          onClick={handleSelect}>

        </Gallery>
      </Box>
      <Fab aria-label="add" variant="extended" size="small" onClick={() => setCreatePerritoModalOpen(true)}
        style={{
          backgroundColor: green[500],
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}>
        <Add sx={{ mr: 1 }} /> Create Perrito
      </Fab>
      {
        imageSelected !== null ?
          <>
            <Zoom
              in={imageSelected !== null}
              style={{ transitionDelay: '500ms' }}
            >
              <Fab aria-label="update" variant="extended" size="small" onClick={() => setUpdatePerritoModalOpen(true)}
                style={{
                  backgroundColor: blue[500],
                  position: 'fixed',
                  bottom: 116,
                  right: 16,
                }}>
                <Update sx={{ mr: 1 }} /> Update Perrito
              </Fab>
            </Zoom>
            <Zoom
              in={imageSelected !== null}
              style={{ transitionDelay: '500ms' }}
            >
              <Fab aria-label="delete" variant="extended" size="small" onClick={() => setDeletePerritoModalOpen(true)}
                style={{
                  backgroundColor: red[500],
                  position: 'fixed',
                  bottom: 66,
                  right: 16,
                }}>
                <Delete sx={{ mr: 1 }} /> Delete Perrito
              </Fab>

            </Zoom>
          </> : <></>
      }
      <CreatePerritoModal
        backendURL={backendURL}
        openNewPerrito={createPerritoModalOpen}
        setOpenNewPerrito={setCreatePerritoModalOpen}
        loadPerritos={loadPerritos}
      />
      <UpdatePerritoModal
        backendURL={backendURL}
        openUpdatePerrito={updatePerritoModalOpen}
        setOpenUpdatePerrito={setUpdatePerritoModalOpen}
        perritoId={perritoId}
        perritoCaption={perritoCaption}
        perritoSrc={perritoSrc}
        loadPerritos={loadPerritos}
      />
      <DeletePerritoModal
        backendURL={backendURL}
        openDeletePerrito={deletePerritoModalOpen}
        setOpenDeletePerrito={setDeletePerritoModalOpen}
        perritoId={perritoId}
        perritoCaption={perritoCaption}
        perritoSrc={perritoSrc}
        loadPerritos={loadPerritos}
      />
    </Container>
  );
}

export default App;
