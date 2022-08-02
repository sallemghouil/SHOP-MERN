import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { addProduct } from "../../JS/actions/productActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function AddProduct() {
  const [name, setName] = React.useState("")
  const [price, setPrice] = React.useState(0)
  const [qte, setQte] = React.useState(0)
  const [image, setImage] = React.useState("")
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    console.log({
      name: data.get("name"),
      price: data.get("price"),
      qte: data.get("qte"),
    });
    data.append("name",name)
    data.append("price",price)
    data.append("qte",qte)
    data.append("file",image)
    dispatch(
      addProduct(data,navigate)
    );

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            AddProduct{" "}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="add product name"
              name="name"
              autoFocus
              onChange={(e)=>setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="add price"
              type="number"
              id="price"
              onChange={(e)=>setPrice(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="qte"
              label="add quantity"
              type="number"
              id="qte"
              onChange={(e)=>setQte(e.target.value)}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="file"
              label="add image"
              type="file"
              id="file"
              onChange={(e)=>setImage(e.target.files[0])}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              save{" "}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}