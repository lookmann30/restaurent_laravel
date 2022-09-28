import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import PropTypes from 'prop-types';
import { useState } from 'react';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Footer from 'src/components/Footer';

//next
import Image from 'next/image';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, open, type, confirm, dataValue } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (status,value) => {
    onClose(status,value);
  };

  return (
    <Dialog 
      onClose={handleClose} 
      open={open} 
      sx={{
        '& .MuiDialog-paper':
        {
          width: '100%',
          maxWidth: '530px',
          maxHeight: 'auto',
          border: 0,
          boxShadow: 0
        }
       
      }}
      maxWidth="xs"
    >
      <Box display="flex" flexDirection={"column"} alignItems="center" sx={{padding: 3}}>
        <Box><Typography variant='h2'>{
          type === "success" ? "SUCCESS" 
          : "delete" ? "Cancel order ?" 
          : "ERROR"
          }</Typography></Box>
          <Box sx={{mt:2}}><Typography variant='h5'>{
          type === "success" ? "" 
          :  type === "delete" ? "Please click confirm to cancel order" 
          : ""
          }</Typography></Box>
        <Box sx={{mt: 3}}><Image
            src={
              type === "success" ? '/static/images/placeholders/logo/success128.png' 
              : type === "delete" ? '/static/images/placeholders/logo/warning128.png'
              : '/static/images/placeholders/logo/error128.png'
            }
            width={128}
            height={128}
            responsive="true"
            
          /></Box>
          {
            confirm ?
            <Box sx={{mt:3}} >
              <Button variant='contained' color="primary" onClick={() => { handleListItemClick(true,dataValue)}}> Confirm </Button>
              <Button variant='outlined' color="error" onClick={() => { handleListItemClick(false,null)}} sx={{ml:2}}> Cancel </Button>
          </Box>
            :
            <Box sx={{mt:3}}>
            <Button variant='outlined' color="primary" onClick={handleClose}> Close </Button>
          </Box>
          }
       
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  confirm: PropTypes.bool.isRequired,
};

export default SimpleDialog;
