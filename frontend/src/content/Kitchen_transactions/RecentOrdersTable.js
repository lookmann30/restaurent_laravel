import { useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  useTheme,
  styled,
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
  CardHeader,
  List,
  ListItem,
  Button
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



const DisabledButton = styled(Button)(({ theme }) => ({
   '&.Mui-disabled' : {
    backgroundColor: "#D3D3D3",
    color: "#898989"
    }
}))



const getStatusLabel = (status) => {
  const map = {
    cancel: {
      text: 'Cancel',
      color: 'error'
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

    if (filters.status && order.cookingStatus.toLowerCase() !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (order, page, limit) => {
  return order.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable = ({ orders, acceptOrder }) => {
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
      id: 'accept',
      name: 'Accepted'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'reject',
      name: 'Rejected'
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
                      {getStatusLabel(val.cookingStatus.toLowerCase())}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {fDateTime(val.cdate)}
                  </TableCell>
                  <TableCell align="right">
                    {
                      val.cookingStatus === "Pending" ?
                    <Button variant="contained" color="primary" onClick={()=> acceptOrder(val.id)}>Accept</Button> :
                    <DisabledButton 
                      disabled 
                      variant="contained" 
                      color="success"
                      >Accept</DisabledButton>

                    }
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
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
  acceptOrder: PropTypes.func.isRequired
};

RecentOrdersTable.defaultProps = {
  orders: []
};

export default RecentOrdersTable;
