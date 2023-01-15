import React, {useEffect} from 'react';
import Layout from './Layout';
import FormEditPost from '../components/FormEditPost';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/AuthSlice';

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));

  useEffect(()=> {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(()=> {
    if(isError){
      navigate("/");
    }
  }, [isError, navigate]);
  
  return (
    <Layout>
        <FormEditPost/>
    </Layout>
  )
}

export default EditPost;