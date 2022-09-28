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

  useEffect(() => {
    async function GetOrder() {
      await axiosInstance.get(`/orders/${cookies._id}`
        , { "token": cookies.token })
        .then(result => {
          const order = result.data.orders;
          const initialOrder =  order.map(val => {
            return {
              id: val.id,
              detail: JSON.parse(val.detail),
              createBy: val.name,
              status: val.status,
              totalPrice: val.total_price,
              cookingStatus : val.cooking_status,
              cdate: val.created_at
            }
          })
          setOrder(_.reverse(initialOrder))
        })
        .catch(function (error) {
          console.log(error)
        });
    }
    GetOrder();
  }, [])

  const deleteOrder = async (orderId) => {
    await axiosInstance.put(`/orderCancel/${orderId}`
    ,
    { 
      orders_status : "Cancel",
      orders_cooking_status : "Cancel"
    }
    , { "token": cookies.token })
    .then(result => {
      router.reload()
    })
    .catch(function (error) {
      console.log(error)
    });
    return true
  }

  return (
    <Card>
        <RecentOrdersTable orders={orders} deleteOrder={deleteOrder}/>
    </Card>
  );
}

export default RecentOrders;
