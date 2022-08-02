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
import {  getOneProduct, updateOneProduct } from "../../JS/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const theme = createTheme();

export default function EditProduct() {

    const {id} = useParams()

  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      price: data.get("price"),
      qte: data.get("qte"),
    });
    dispatch(
        updateOneProduct(id, updateProduct, navigate )
    );
  };

  const oldProduct = useSelector(state=> state.productReducer.oneProduct)
const [updateProduct, setUpdateProduct] = React.useState(oldProduct)

  React.useEffect(() => {
dispatch(getOneProduct(id))
  }, [])

  React.useEffect(() => {
    setUpdateProduct(oldProduct)
  }, [oldProduct])
  

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
            Edit Product{" "}
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
              label="edit product name"
              name="name"
              autoFocus
              value= {updateProduct.name}
              onChange={(e)=> setUpdateProduct({...updateProduct, name: e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="edit price"
              type="number"
              id="price"
              value= {updateProduct.price}
              onChange={(e)=> setUpdateProduct({...updateProduct, price: e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="qte"
              label="edit quantity"
              type="number"
              id="qte"
              value= {updateProduct.qte}
              onChange={(e)=> setUpdateProduct({...updateProduct, qte: e.target.value})}
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
       
      </Container>
    </ThemeProvider>
  );
}