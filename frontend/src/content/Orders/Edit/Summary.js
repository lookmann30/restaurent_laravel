import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  ListItemText,
  List,
  ListItem,
  Divider,
  Switch,
  ListItemAvatar,
  Avatar,
  styled,
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  ButtonGroup
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { fNumber } from 'src/utils/formatNumber'

//Redux
import { useDispatch, useSelector } from 'react-redux';
import editCartAction from 'redux/actions/editCart.action'

//axios
import axiosInstance from 'src/utils/axios';

//nookies
import { parseCookies } from 'nookies'

//components
import Dialog from 'src/components/Dialog'

//next
import { useRouter } from 'next/router';


function OrderSummary({orderId}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const cookies = parseCookies();

  const editCartReducer = useSelector((state) => state.editCartReducer);


  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  const [order, setOrder] = useState(null)

  useEffect(() => {
    async function GetOrder() {
      await axiosInstance.get(`/ordersById/${orderId}`
        , { "token": cookies.token })
        .then(result => {
          
          setOrder(result.data.orders[0])
          const currentOrder = JSON.parse(result.data.orders[0].detail)
          dispatch(editCartAction.editCart(currentOrder));
        })
        .catch(function (error) {
          console.log(error)
        });
    }
    GetOrder();
  }, [])

  useEffect(() => {
    async function Cart() {
      if (editCartReducer.result) {
        setCart(editCartReducer.result)
        let countItem = 0
        let sumPrice = 0
        editCartReducer.result.map(val => {
          countItem = countItem + parseInt(val.quantity)
          sumPrice = sumPrice + parseInt(val.price * val.quantity)
        })
        setTotalPrice(sumPrice)
        setTotalItem(countItem)
      } else setCart(null)
    }
    Cart();
  }, [editCartReducer])

  const deleteItem = (menuId) => {
    const newCart = cart.filter(val => val.menuId != menuId)
    dispatch(editCartAction.editCart(newCart));
  }

  const increaseQty = (menuId) => {
    const newCart = cart.map(val => {
      if (val.menuId === menuId) {
        return {
          menuId: val.menuId,
          menuName: val.menuName,
          price: val.price,
          quantity: ++val.quantity
        }
      } else {
        return val
      }
    })
    dispatch(editCartAction.editCart(newCart));
  }

  const decreaseQty = (menuId) => {
    const newCart = cart.map(val => {
      if (val.menuId === menuId) {
        if (val.quantity === 1) {
          return null
        }
        else {
          return {
            menuId: val.menuId,
            menuName: val.menuName,
            price: val.price,
            quantity: --val.quantity
          }
        }
      } else {
        return val
      }
    })
    const cartClearEmptyItem = newCart.filter(val => val != null)
    if (cartClearEmptyItem.length === 0) {
      setTotalPrice(0)
      setTotalItem(0)
    }
    dispatch(editCartAction.editCart(cartClearEmptyItem.length > 0 ? cartClearEmptyItem : null));
  }

  const orderHandler = async () => {
    if(!cart) {
      const newOrder = {
        orders_detail: JSON.parse(order.detail),
        orders_status: "Cancel",
        orders_total_price: order.total_price,
        orders_cooking_status: "Cancel",
      }
    await axiosInstance.put(`/order/${orderId}`,
      newOrder
        , { "token": cookies.token })
        .then(result => {
          handleClickOpen()
          router.push('/dashboards')
          return true
        })
        .catch(function (error) {
          console.log(error)
        });
        return true
    }

    const newOrder = {
      orders_detail: cart,
      orders_status: order.status,
      orders_total_price: totalPrice,
      orders_cooking_status: order.cooking_status,
    }

    await axiosInstance.put(`/order/${orderId}`,
    newOrder
      , { "token": cookies.token })
      .then(result => {
        handleClickOpen()

      })
      .catch(function (error) {
        console.log(error)
      });
  }

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    router.reload()
  };



  return (
    <Card>
      <CardHeader title="Order Summary" />
      <Divider />
      <List disablePadding>
        <ListItem
          sx={{
            py: 2
          }}
        >
          <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
            <Grid container>
              <Grid item xs={9}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>List</Typography>

              </Grid>
              <Grid item xs={2}>
                <Typography variant="h5" sx={{ fontWeight: 700 }} >Qty.</Typography>

              </Grid>
              <Grid item xs={1}>
              </Grid>
            </Grid>
            {
              cart && cart.map((val, index) => {
                return (
                  <Grid container sx={{ mt: 2 }} key={index}>
                    <Grid item xs={5} display="flex" alignItems={"center"}>
                      <Typography variant="h5" sx={{ fontWeight: 400 }}>{val.menuName}</Typography>
                    </Grid>
                    <Grid item xs={6} display="flex" alignItems={"center"}>
                      <ButtonGroup size="small" aria-label="small outlined button group" sx={{ my: 1 }}>
                        <Button sx={{ borderColor: "#D6D7D8" }} onClick={() => { increaseQty(val.menuId) }}>+</Button>
                        <Button disabled sx={{
                          "&:disabled": {
                            borderColor: "#D6D7D8"
                          }
                        }}>{fNumber(val.quantity)}</Button>
                        <Button sx={{ borderColor: "#D6D7D8" }} onClick={() => { decreaseQty(val.menuId) }}>-</Button>
                      </ButtonGroup>

                    </Grid>
                    <Grid item xs={1} display="flex" alignItems={"center"}>
                      <IconButton aria-label="delete" size="small" disableRipple onClick={() => { deleteItem(val.menuId) }}>
                        <DeleteIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                )
              })
            }

          </Box>
        </ListItem>
        <Divider />

        <ListItem
          sx={{
            py: 2
          }}
        >
          <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Box >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Total</Typography>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{fNumber(totalItem)}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 2 }}>
              <Box >
                <Typography variant="h3" sx={{ fontWeight: 700 }}>Total Price</Typography>
              </Box>
              <Box>
                <Typography variant="h3" color="error" sx={{ fontWeight: 700 }}>{fNumber(totalPrice)}</Typography>
              </Box>
            </Box>
            <Box mt={2}>
              <Button variant="contained" color="success" fullWidth onClick={orderHandler}>Submit</Button>
            </Box>
          </Box>

        </ListItem>


      </List>
      <Dialog
        open={open}
        onClose={handleClose}
        type="success"
        confirm={false}
      />
    </Card>
  );
}

export default OrderSummary;
