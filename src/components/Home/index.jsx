import { connect } from 'react-redux';
import React, { useState } from 'react';
import Tile from './Tile';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();

  const selectImage = async () => {
    navigate('/camera', { replace: true });
  };

  const handleManualAdd = async () => {
    console.log('Receipt manually added')
  };


  return (
    <div>
      <div>
        <Tile onClick={selectImage} post={
          {
            // date: 'date',
            description: 'Snap Your (First) Receipt',
            // image: 'image',
            // imageLabel: 'imageLabel',
            title: 'Please Snap Your Receipt'
          }
        } icon={<CameraAltIcon sx={{ fontSize: 72 }} />}>

        </Tile>
        {/* <Tile onClick={handleManualAdd} post={
          {
            // date: 'Manually Add Your (First) Receipt',
            description: 'Manually Add Your (First) Receipt',
            // image: 'Manually Add Your (First) Receipt',
            // imageLabel: 'Manually Add Your (First) Receipt',
            title: 'Manually Add Your (First) Receipt'
          }
        }
          icon={<EditNoteIcon sx={{ fontSize: 72 }} />}
        >
          Manually Add Your (First) Receipt
        </Tile> */}
      </div>
    </div>
  );
};


const mapStateToProps = (state) => ({
  isLoggedIn: state.authx.isLoggedIn || state.signup.isLoggedIn,
  user: state.authx.user || state.signup.user
});

export default connect(mapStateToProps, { })(HomePage)
