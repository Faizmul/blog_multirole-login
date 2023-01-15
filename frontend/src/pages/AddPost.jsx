import React, {useEffect} from 'react'
import Layout from './Layout'
import FormAddPost from '../components/FormAddPost';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/AuthSlice';
const AddPost = () => {
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
        <FormAddPost/>
    </Layout>
  )
}

export default AddPost;