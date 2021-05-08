import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

const baseUrl = "http://localhost:8080/characters/";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 800,
    maxHeight: "100%",
    overflowY: "scroll",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

function App() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [characterSelected, setCharacterSelected] = useState({
    url: "",
    name: "",
    gender: "",
    culture: "",
    born: "",
    died: "",
    titles: [""],
    aliases: [""],
    father: "",
    mother: "",
    spouse: "",
    allegiances: [""],
    books: [""],
    povBooks: [],
    tvSeries: [""],
    playedBy: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacterSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(characterSelected);
  };

  const getRequest = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((res) =>
        setData([
          {
            url: "https://www.anapioficeandfire.com/api/characters/582",
            name: "Jon Redfort",
            gender: "Male",
            culture: "Valemen",
            born: "",
            died: "",
            titles: ["Ser"],
            aliases: [""],
            father: "",
            mother: "",
            spouse: "",
            allegiances: ["https://www.anapioficeandfire.com/api/houses/316"],
            books: [
              "https://www.anapioficeandfire.com/api/books/5",
              "https://www.anapioficeandfire.com/api/books/8",
            ],
            povBooks: [],
            tvSeries: [""],
            playedBy: [""],
          },
          {
            url: "https://www.anapioficeandfire.com/api/characters/583",
            name: "Jon Snow",
            gender: "Male",
            culture: "Northmen",
            born: "In 283 AC",
            died: "",
            titles: ["Lord Commander of the Night's Watch"],
            aliases: [
              "Lord Snow",
              "Ned Stark's Bastard",
              "The Snow of Winterfell",
              "The Crow-Come-Over",
              "The 998th Lord Commander of the Night's Watch",
              "The Bastard of Winterfell",
              "The Black Bastard of the Wall",
              "Lord Crow",
            ],
            father: "",
            mother: "",
            spouse: "",
            allegiances: ["https://www.anapioficeandfire.com/api/houses/362"],
            books: ["https://www.anapioficeandfire.com/api/books/5"],
            povBooks: [
              "https://www.anapioficeandfire.com/api/books/1",
              "https://www.anapioficeandfire.com/api/books/2",
              "https://www.anapioficeandfire.com/api/books/3",
              "https://www.anapioficeandfire.com/api/books/8",
            ],
            tvSeries: [
              "Season 1",
              "Season 2",
              "Season 3",
              "Season 4",
              "Season 5",
              "Season 6",
            ],
            playedBy: ["Kit Harington"],
          },
        ])
      );
  };

  const postRequest = async () => {
    await axios.post(baseUrl, characterSelected).then((response) => {
      setData(data.concat(response.data));
      openCloseModelInsert();
    });
  };

  const putRequest = async () => {
    await axios
      .put(baseUrl + characterSelected.url, characterSelected)
      .then((response) => {
        setData(response.data);
        openCloseModelEdit();
      });
  };

  const deleteRequest = async () => {
    var id = characterSelected.url.match(/[^/]*$/)[0];
    await axios.delete(baseUrl + id).then((response) => {
      console.log(response);
      setData(
        data.filter((character) => character.url !== characterSelected.url)
      );
      openCloseModelDelete();
    });
  };

  const openCloseModelInsert = () => {
    setModalInsert(!modalInsert);
  };

  const openCloseModelEdit = () => {
    setModalEdit(!modalEdit);
  };

  const openCloseModelDelete = () => {
    setModalDelete(!modalDelete);
  };

  const selectCharacter = (consola, caso) => {
    setCharacterSelected(consola);
    caso === "Edit" ? openCloseModelEdit() : openCloseModelDelete();
  };

  useEffect(() => {
    async function fetchData() {
      await getRequest();
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  const bodyInsertar = (
    <Container className={styles.modal}>
      <h3>Add Character</h3>
      <TextField
        name="url"
        className={styles.inputMaterial}
        label="URL"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="name"
        className={styles.inputMaterial}
        label="Name"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="gender"
        className={styles.inputMaterial}
        label="Gender"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="culture"
        className={styles.inputMaterial}
        label="Culture"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="born"
        className={styles.inputMaterial}
        label="Born"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="died"
        className={styles.inputMaterial}
        label="Died"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="titles"
        className={styles.inputMaterial}
        label="Titles"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="aliases"
        className={styles.inputMaterial}
        label="Aliases"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="father"
        className={styles.inputMaterial}
        label="Father"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="mother"
        className={styles.inputMaterial}
        label="Mother"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="spouse"
        className={styles.inputMaterial}
        label="spouse"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="allegiances"
        className={styles.inputMaterial}
        label="allegiances"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="books"
        className={styles.inputMaterial}
        label="Books"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="povBooks"
        className={styles.inputMaterial}
        label="Pov Books"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="tvseries"
        className={styles.inputMaterial}
        label="TV Series"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="playedby"
        className={styles.inputMaterial}
        label="Played By"
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => postRequest()}>
          Insert
        </Button>
        <Button onClick={() => openCloseModelInsert()}>Cancel</Button>
      </div>
    </Container>
  );

  const bodyEditar = (
    <Container className={styles.modal}>
      <h3>Edit Character</h3>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <br />
          <TextField
            name="name"
            className={styles.inputMaterial}
            label="Name"
            onChange={handleChange}
            value={characterSelected && characterSelected.name}
          />
          <br />
          <TextField
            name="gender"
            className={styles.inputMaterial}
            label="Gender"
            onChange={handleChange}
            value={characterSelected && characterSelected.Gender}
          />
          <br />
          <TextField
            name="culture"
            className={styles.inputMaterial}
            label="Culture"
            onChange={handleChange}
            value={characterSelected && characterSelected.culture}
          />
          <br />
          <TextField
            name="born"
            className={styles.inputMaterial}
            label="Culture"
            onChange={handleChange}
            value={characterSelected && characterSelected.born}
          />
          <br />
          <TextField
            name="died"
            className={styles.inputMaterial}
            label="Died"
            onChange={handleChange}
            value={characterSelected && characterSelected.died}
          />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <br />
          <TextField
            name="titles"
            className={styles.inputMaterial}
            label="Titles"
            onChange={handleChange}
            value={characterSelected && characterSelected.titles}
          />
          <br />
          <TextField
            name="aliases"
            className={styles.inputMaterial}
            label="Aliases"
            onChange={handleChange}
            value={characterSelected && characterSelected.aliases}
          />
          <br />
          <TextField
            name="father"
            className={styles.inputMaterial}
            label="Father"
            onChange={handleChange}
            value={characterSelected && characterSelected.father}
          />
          <br />
          <TextField
            name="mother"
            className={styles.inputMaterial}
            label="Mother"
            onChange={handleChange}
            value={characterSelected && characterSelected.mother}
          />
          <br />
          <TextField
            name="spouse"
            className={styles.inputMaterial}
            label="Spouse"
            onChange={handleChange}
            value={characterSelected && characterSelected.spouse}
          />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <br />
          <TextField
            name="allegianses"
            className={styles.inputMaterial}
            label="Allegianses"
            onChange={handleChange}
            value={characterSelected && characterSelected.allegiances}
          />
          <br />
          <TextField
            name="books"
            className={styles.inputMaterial}
            label="Books"
            onChange={handleChange}
            value={characterSelected && characterSelected.books}
          />
          <br />
          <TextField
            name="povBooks"
            className={styles.inputMaterial}
            label="Pov Books"
            onChange={handleChange}
            value={characterSelected && characterSelected.povBooks}
          />
          <br />
          <TextField
            name="tvSeries"
            className={styles.inputMaterial}
            label="TV Series"
            onChange={handleChange}
            value={characterSelected && characterSelected.tvSeries}
          />
          <br />
          <TextField
            name="playedBy"
            className={styles.inputMaterial}
            label="Played By"
            onChange={handleChange}
            value={characterSelected && characterSelected.playedBy}
          />
          <TextField
            name="url"
            className={styles.inputMaterial}
            label="URL"
            onChange={handleChange}
            value={characterSelected && characterSelected.url}
          />
        </Grid>
      </Grid>

      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => putRequest()}>
          Edit
        </Button>
        <Button onClick={() => openCloseModelEdit()}>Cancelar</Button>
      </div>
    </Container>
  );

  const bodyEliminar = (
    <Container className={styles.modal}>
      <p>
        Are you sure <b>{characterSelected && characterSelected.nombre}</b> ?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => deleteRequest()}>
          Sí
        </Button>
        <Button onClick={() => openCloseModelDelete()}>No</Button>
      </div>
    </Container>
  );

  return (
    <Container className="App">
      <br />
      <Button onClick={() => openCloseModelInsert()}>Insert</Button>
      <br />
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Culture</TableCell>
              <TableCell>Born</TableCell>
              <TableCell>Died</TableCell>
              <TableCell>Aliases</TableCell>
              <TableCell>Father</TableCell>
              <TableCell>Mother</TableCell>
              <TableCell>Spouse</TableCell>
              <TableCell>Allegiances</TableCell>
              <TableCell>Books</TableCell>
              <TableCell>Pov Books</TableCell>
              <TableCell>TV Series</TableCell>
              <TableCell>Played by</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((character) => (
              <TableRow key={character.url}>
                <TableCell>{character.url}</TableCell>
                <TableCell>{character.name}</TableCell>
                <TableCell>{character.gender}</TableCell>
                <TableCell>{character.culture}</TableCell>
                <TableCell>{character.born}</TableCell>
                <TableCell>{character.died}</TableCell>
                <TableCell>{character.aliases}</TableCell>
                <TableCell>{character.father}</TableCell>
                <TableCell>{character.mother}</TableCell>
                <TableCell>{character.spouse}</TableCell>
                <TableCell>{character.allegiances}</TableCell>
                <TableCell>{character.books}</TableCell>
                <TableCell>{character.povBooks}</TableCell>
                <TableCell>{character.tvSeries}</TableCell>
                <TableCell>{character.playedBy}</TableCell>
                <TableCell>
                  <Edit
                    className={styles.iconos}
                    onClick={() => selectCharacter(character, "Edit")}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Delete
                    className={styles.iconos}
                    onClick={() => selectCharacter(character, "Eliminar")}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalInsert} onClose={openCloseModelInsert}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEdit} onClose={openCloseModelEdit}>
        {bodyEditar}
      </Modal>

      <Modal open={modalDelete} onClose={openCloseModelDelete}>
        {bodyEliminar}
      </Modal>
    </Container>
  );
}

export default App;
