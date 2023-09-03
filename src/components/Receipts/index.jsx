//引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


import { login, logout } from '../../redux/actions/authActions';//done

import { useGetReceiptsQuery } from '../../datamodel/rtkQuerySlice';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import {
  Avatar,
  Card,
  Container,
  CardActionArea,
  // ImageList,
  // ImageListItem,
  // ImageListItemBar,
  Rating,
  Tooltip,
} from '@mui/material';
import { StarBorder } from '@mui/icons-material';


const Receipts = ({ isLoggedIn }) => {

  const location = useLocation();

  const updateSuccess = location.state?.updateSuccess;

  const { data, error, isLoading, refetch, isUninitialized } = useGetReceiptsQuery(
    undefined,
    {
      // pollingInterval: 3000,
      // refetchOnMountOrArgChange: true,
      skip: !isLoggedIn
    }
  );

  useEffect(() => {
    if (updateSuccess) {
      refetch();
    }

  }, []);

  const getUserReceipts = () => {
    refetch();
  }

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login/', { replace: true });
  };

  if (!isLoggedIn) {
    return <div>Not logged in yet and please <Button color="primary" onClick={handleLogin}>Log In</Button></div>
  }

  const onReceiptClick = (item) => {
    console.log('Receipt Clicked');
    navigate('/edit/', { state: { item }, replace: true });
  };


  return (
    <div>
      {isLoggedIn ? (
        <>
          <div>
            {isLoading ? (
              <div>Loading...</div>
            ) : error ?
              (error.status === 401 ?
                <div>Authentication expired, please <Button color="primary" onClick={handleLogin}>Log In</Button> again.</div> :
                <div>Other error</div>)
              : data ? (
                <Container>
                  <ImageList
                    gap={12}
                    sx={{
                      mb: 8,
                      gridTemplateColumns:
                        'repeat(auto-fill, minmax(280px, 1fr))!important',
                    }}
                  >
                    {data.obj.map((item) => (
                      <CardActionArea key={item.id} component="a" onClick={() => onReceiptClick(item)}>

                        <Card>
                          <ImageListItem sx={{ height: '100% !important' }}>
                            <ImageListItemBar
                              sx={{
                                background:
                                  'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                              }}
                              title={item.totalAmount === 0 ? '$0' : '$' + item.totalAmount}
                              actionIcon={
                                <Tooltip title={item.companyName} sx={{ mr: '5px' }}>
                                  <Avatar src={`https://api.ireceipts.au/Receipt/GetImage/${encodeURIComponent(item.imagePath)}`} />
                                </Tooltip>
                              }
                              position="top"
                            />
                            <img
                              src={`https://www.ireceipts.au/Receipt/GetImage/${encodeURIComponent(item.imagePath)}`}
                              alt={item.companyName}
                              loading="lazy"
                              style={{ cursor: 'pointer' }}
                            />
                            <ImageListItemBar
                              title={item.companyName}
                              actionIcon={
                                // <Rating
                                //   sx={{ color: 'rgba(255,255,255, 0.8)', mr: '5px' }}
                                //   name="item-rating"
                                //   defaultValue={3.5}
                                //   precision={0.5}
                                //   emptyIcon={
                                //     <StarBorder sx={{ color: 'rgba(255,255,255, 0.8)' }} />
                                //   }
                                // />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker value={dayjs(item.receiptDatetime)} readOnly />
                                </LocalizationProvider>
                              }
                            />
                          </ImageListItem>
                        </Card>
                      </CardActionArea>

                    ))}
                  </ImageList>
                </Container>
              ) : null}
          </div>
        </>
      ) : (
        <>
        </>
      )}
    </div>
  )
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.authx.isLoggedIn || state.signup.isLoggedIn,
  user: state.authx.user || state.signup.user
});

export default connect(mapStateToProps, {})(Receipts);

