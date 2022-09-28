import { useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  List,
  ListItem,
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

import { fNumber } from 'src/utils/formatNumber'
import { fDateTime } from 'src/utils/formatTime'

import axiosInstance from 'src/utils/axios';
import { parseCookies } from 'nookies'

//components
import Dialog from 'src/components/Dialog'

//next
import { useRouter } from 'next/router'

const getStatusLabel = (status) => {
  const map = {
    cancel: {
      text: 'Cancel',
      color: 'error'
    },
    success: {
      text: 'Success',
      color: 'success'
    },
    accept: {
      text: 'Accept',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color } = map[status];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (order, filters) => {
  return order.filter((order) => {
    let matches = true;

    if (filters.status && order.status.toLowerCase() !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (order, page, limit) => {
  return order.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable = ({ orders, deleteOrder }) => {
  const cookies = parseCookies();
  const router = useRouter()
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'success',
      name: 'Success'
    },
    
    {
      id: 'cancel',
      name: 'Canceled'
    }
  ];

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredOrders = applyFilters(orders, filters);
  const paginatedOrders = applyPagination(
    filteredOrders,
    page,
    limit
  );
  const theme = useTheme();

  const renderOrderDetail = (orderDetail) => {
    return (
      <>
            <List disablePadding>

        {

          orderDetail.map(val => (
            <ListItem
            key={val.menuName}
              sx={{
                py: 1
              }}
            >
              <Box display="flex" sx={{width: "100%"}}>
                <Box flexGrow={1}>{val.menuName}</Box>
                <Box>x {val.quantity}</Box>
              </Box>
              
              </ListItem>
          ))

        }
          </List>

      </>
    )
  }



  renderOrderDetail.propTypes = {
    orderDetail: PropTypes.array.isRequired
  };

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (status,value) => {
    if(status) deleteOrder(value)
    setOpen(false);
  };

  const editHandler = (orderId) => {
    router.push(`/order/edit/${orderId}`)
  }


  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status || 'all'}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="Recent Orders"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Order Detail</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right">Create By</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Cooking Status</TableCell>
              <TableCell align="right">Create Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((val) => {
              return (
                <TableRow hover key={val.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {val.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                      {renderOrderDetail(val.detail)}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {fNumber(val.totalPrice)}
                    </Typography>

                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {val.createBy}
                    </Typography>

                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {getStatusLabel(val.status.toLowerCase())}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {getStatusLabel(val.cookingStatus.toLowerCase())}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {fDateTime(val.cdate)}
                  </TableCell>
                  <TableCell align="right">
                    {
                      val.cookingStatus === "Pending" && val.status !== "Cancel" ? 
                      <>
                      <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {editHandler(val.id)}}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={()=>{
                          setDeleteId(val.id)
                          handleClickOpen()
                        }}
                      >
                        <CancelTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    </> : null}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        type="delete"
        confirm={true}
        dataValue={deleteId}
      />
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
  deleteOrder: PropTypes.func.isRequired
};

RecentOrdersTable.defaultProps = {
  orders: []
};

export default RecentOrdersTable;
