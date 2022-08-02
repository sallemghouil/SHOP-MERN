import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { deleteProduct } from "../../JS/actions/productActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Product({ el }) {
    const dispatch = useDispatch()
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={el.pic}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {el.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {el.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          added by: {el.user&&el.user.fullName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=> dispatch(deleteProduct(el._id))}>delete</Button>
        <Link to={`/editProduct/${el._id}`}><Button size="small" >edit</Button></Link>
      </CardActions>
    </Card>
  );
}