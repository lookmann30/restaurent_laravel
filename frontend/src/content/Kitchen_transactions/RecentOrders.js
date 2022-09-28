import { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';

import { useRouter } from 'next/router'

import axiosInstance from 'src/utils/axios';
import { parseCookies } from 'nookies'

//lodash
import _ from 'lodash';


function RecentOrders() {
  const cookies = parseCookies();
  const router = useRouter();
  const [orders, setOrder] = useState([])
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    async function GetOrder() {
      await axiosInstance.get(`/orders/${cookies._id}`
        , { "token": cookies.token })
        .then(result => {
          const order = result.data.orders;
          const removeCancel = order.filter(val => val.status != "Cancel")
          const initialOrder =  removeCancel.map(val => {
            return {
              id: val.id,
              detail: JSON.parse(val.detail),
              cookingStatus : val.cooking_status,
              status : val.status,
              total_price : val.total_price,
              cdate: val.create_at
            }
          })
          setUpdated(false)
          setOrder(_.reverse(initialOrder))
        })
        .catch(function (error) {
          console.log(error)
        });
    }
    GetOrder();
  }, [updated])

  const acceptOrder = async (orderId) => {
    const selectOrder = orders.filter(val => val.id == orderId)
    const orderUpdate =  { 
      orders_detail: selectOrder[0].detail,
      orders_status: selectOrder[0].status,
      orders_total_price: selectOrder[0].total_price,
      orders_cooking_status : "Accept",
    }
    await axiosInstance.put(`/order/${orderId}`
    ,
    orderUpdate
    , { "token": cookies.token })
    .then(result => {
      setUpdated(true)
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  return (
    <Card>
        <RecentOrdersTable orders={orders} acceptOrder={acceptOrder}/>
    </Card>
  );
}

export default RecentOrders;
