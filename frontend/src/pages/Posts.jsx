import React, {useEffect} from 'react';
import Layout from './Layout';
import PostLists from '../components/PostLists';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/AuthSlice';

const Posts = () => {
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
        <PostLists/>
    </Layout>
  )
}

export default Posts