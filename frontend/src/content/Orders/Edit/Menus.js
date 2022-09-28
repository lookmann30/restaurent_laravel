import { useState, useEffect } from 'react'
import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import NextLink from 'next/link';

import axiosInstance from 'src/utils/axios';

import { parseCookies } from 'nookies'

//lodash
import _ from 'lodash';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import editCartAction from 'redux/actions/editCart.action'

import { fNumber } from 'src/utils/formatNumber'

function Menus({ orderId }) {
  const cookies = parseCookies();
  const [listMenus, setListMenu] = useState([]);
  const [cartData, setCartData] = useState({});
  const dispatch = useDispatch();

  const editCartReducer = useSelector((state) => state.editCartReducer);

  useEffect(() => {
    async function GetMenus() {
      await axiosInstance.get('/menus'
        , { "token": cookies.token })
        .then(result => {
          setListMenu(result.data.menus)
        })
        .catch(function (error) {
          console.log(error)
        });
    }
    GetMenus();
  }, [])
  
  const addToCart = (detail) => {
    if (!editCartReducer.result) {
      dispatch(editCartAction.editCart(
        [{
          menuId: detail.menus_id,
          menuName: detail.menus_nameth,
          price: detail.menus_price,
          quantity: 1
        }]
      ));
    } else {
      const currentCart = editCartReducer.result
      let newCart
      if (_.find(currentCart, { menuId: detail.menus_id })) {
        newCart = currentCart.map(val => {
          let item = val;
          if (val.menuId === detail.menus_id) {
            item.quantity += 1
            return item
          } else {
            return item
          }
        })

      }
      else {
        newCart = currentCart
        newCart.push({
          menuId: detail.menus_id,
          menuName: detail.menus_nameth,
          price: detail.menus_price,
          quantity: 1
        })
      }
      dispatch(editCartAction.editCart(newCart));
    }
  }


  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Box display="flex" alignItems="flex-end">
          <Typography variant="h3">Edit Order</Typography>
          <Typography variant="h5" sx={{fontWeight : 300, ml:1, mb: 0.5}} >(Order id: {orderId})</Typography>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {
          listMenus.length > 0 && listMenus.map(val => (

            <Grid xs={12} sm={6} md={4} item key={val.menus_nameen}>
              <Card
                sx={{
                  px: 1
                }}
              >
                <CardMedia
                  component="img"
                  height="194"
                  image={`/static/images/menu/menu_${val.menus_id}.${val.menus_image_type}`}
                  alt={val.menus_nameen}
                  sx={{ mt: 2, borderRadius: "5px" }}
                />
                <CardContent>
                  <Typography variant="h3" noWrap>
                    {val.menus_nameth}
                  </Typography>

                  <Box
                    sx={{
                      pt: 1
                    }}
                  >
                    <Typography variant="h5" gutterBottom noWrap>
                      Price
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                      {fNumber(val.menus_price)} Bath
                    </Typography>
                  </Box>
                  <Button fullWidth variant='contained' sx={{ mt: 2 }} onClick={() => {
                    addToCart(val)
                  }}>Add</Button>
                </CardContent>
              </Card>
            </Grid>

          ))
        }
      </Grid>
    </>
  );
}

export default Menus;
