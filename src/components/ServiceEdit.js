import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { changeServiceField, fetchEditableService, saveService } from '../actions/actionCreators';
import { objectsCompare } from '../utils';
import Error from './Error';
import Loading from './Loading';

export default function ServiceEdit() {
  // service from server
  const {
    service,
    loading: serviceLoading,
    error: serviceError,
  } = useSelector((state) => state.serviceEdit);
  // service from form
  const {
    service: editableService,
    loading: saveLoading,
    error: saveError,
  } = useSelector((state) => state.serviceSave);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { id } = params;
  const [isSame, setSame] = useState(true);

  const inputName = useRef('');
  const inputPrice = useRef(0);
  const inputContent = useRef('');

  // FIXME почти как стейт, но не стейт
  const actualFormData = {
    id: 0,
    name: '',
    price: 0,
    content: '',
  };

  // выцепляем сервис с сервака
  useEffect(() => {
    dispatch(fetchEditableService(id));
  }, [dispatch, id]);

  // запихиваем его в форму
  useEffect(() => {
    for (const key in service) {
      if (Object.hasOwnProperty.call(service, key)) {
        const value = service[key];
        dispatch(changeServiceField(key, value));
      }
    }
  }, [dispatch, service]);

  if (serviceLoading) {
    return <Loading />;
  }

  if (serviceError) {
    return <Error />;
  }

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === 'price') value = Number(value);
    dispatch(changeServiceField(name, value));
    // FIXME
    if (actualFormData.id === 0) actualFormData.id = service.id;
    actualFormData.name = inputName.current.value;
    actualFormData.price = Number(inputPrice.current.value);
    actualFormData.content = inputContent.current.value;
    objectsCompare(service, actualFormData) ? setSame(true) : setSame(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(saveService(editableService));
    if (!saveLoading && !saveError) {
      history.push('/ra-thunk-api-thunk/services');
    }
  };

  const handleCancel = () => {
    history.push('/ra-thunk-api-thunk/services');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type="text"
            value={editableService.name}
            name="name"
            onChange={handleChange}
            ref={inputName}
          />
        </label>
        <br />
        <label>
          Стоимость:
          <input
            type="number"
            value={editableService.price}
            name="price"
            onChange={handleChange}
            ref={inputPrice}
          />
        </label>
        <br />
        <label>
          Описание:
          <input
            type="text"
            value={editableService.content}
            name="content"
            onChange={handleChange}
            ref={inputContent}
          />
        </label>
        <br />
        <button type="submit" disabled={isSame && !saveError}>
          Сохранить
        </button>
        <button type="reset" onClick={handleCancel} >Отмена</button>
      </form>
      {saveLoading && <Loading />}
      {saveError && <Error />}
    </>
  );
}
