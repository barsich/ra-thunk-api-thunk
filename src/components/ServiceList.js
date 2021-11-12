import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchServices, deleteService } from '../actions/actionCreators';
import Error from './Error';
import Loading from './Loading';

export default function ServiceList() {
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
  } = useSelector((state) => state.serviceList);
  const { loading: deleteLoading, error: deleteError } = useSelector(
    (state) => state.serviceDelete
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(deleteService(id));
  };

  if (servicesLoading || deleteLoading) {
    return <Loading />;
  }

  if (servicesError || deleteError) {
    return <Error />;
  }

  return (
    <ul>
      {services.map((service) => (
        <li key={service.id}>
          {service.name} {service.price}
          <Link to={`/ra-thunk-api-thunk/services/${service.id}`}>
            <button>{`\u270E`}</button>
          </Link>
          <button onClick={() => handleRemove(service.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}
