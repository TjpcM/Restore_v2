import { useParams } from "react-router";

import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";

export default function ProductDetails() {
    const {id} = useParams();

    //data will be the product details fetched based on the id from the route parameter -
    //  +id converts string to number = parseInt(id)
    const {data: product, isLoading} = useFetchProductDetailsQuery(id ? +id : 0);

  if(!product || isLoading) return <div>Loading...</div>  

  const productDetails =[
    { label: 'Name', value: product.name },
    { label: 'Description', value: product.description },   
    { label: 'Type', value: product.type },   
    { label: 'Brand', value: product.brand },   
    { label: 'Quantity in stock', value: product.quantityInStock },   
  ]

  return (
   <Grid container spacing={6} maxWidth='lg' sx={{mx: 'auto'}}>
    <Grid size={6}>
        <img src={product?.pictureUrl} alt={product.name} style={{width: '100%'}} />
     </Grid>
    <Grid size={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{mb:2}} />
        <Typography variant="h4" color='secondary'>${(product.price /100).toFixed(2)}</Typography>
        <TableContainer>
            <Table sx={{'& td': {fontSize: '1rem'}}}>
                <TableBody>
                    {productDetails.map((detail,index) => (
                
                    <TableRow key={index}>
                        <TableCell sx={{fontWeight: 'bold'}}>{detail.label}</TableCell>
                        <TableCell>{detail.value}</TableCell>
                    </TableRow>
                    ))}
                         
                </TableBody>
            </Table>
        </TableContainer>
        <Grid container spacing={2} marginTop={3}>
            <Grid size={6}>
                <TextField  label="Quantity in basket" variant="outlined" fullWidth defaultValue={1}/>
            </Grid>
            <Grid size={6}>
                <Button sx={{height: 55}} color="primary" size="large" variant="contained" fullWidth >Add to Basket</Button>
            </Grid>
        </Grid>
    </Grid>    
   </Grid>
  )
}