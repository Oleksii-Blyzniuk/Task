import { useEffect, useState } from "react";
import { ProductList } from "./components/ProductList";
import './App.scss'

const url = 'http://localhost:5000';

const App = () => {
 
  useEffect(() => {
    fetch(`${url}/product`)
      .then(res => res.json())
      .then(res => {
        // console.log('Response', res);
        setProducts(res);
      });
  }, []);

  const [products, setProducts] = useState([]);
  // console.log(products);

  const [isShowForm, setShowForm] = useState(false);
  const [method, setMethod] = useState(null)
  const [event, setEvent] = useState(null);


  const [events, setEvents] = useState([]);

  const defaultEvent = {
    name: '',
    comments: ''
  }

  const openFormHandler = (methodName: string | any, eventForUpdate: string | any) => {
    console.log('Click', methodName);
    setShowForm(!isShowForm);
    setEvent(eventForUpdate || defaultEvent);
    setMethod(methodName);
  }

  const cancelButtonHandler = () => {
    setShowForm(!isShowForm);
    setEvent(null);
  }

  const changeEventHandler = (text: string, field: string) => {
    setEvent(prevState => ({
      ...prevState,
      [field]: text
    }))
  }

  const eventFetchHandler = () => {
    const fetchUrl = method === 'Update' ? `${url}/product/${event.id}` : `${url}/product`
    const httpMethod = method === 'Update' ? 'PATCH' : 'POST';

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        if (method === 'Update') {
          setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl))
        } else {
          setEvents(prevState => [...prevState, res]);
        }
        cancelButtonHandler();
      })
  }

  const removeEventHandler = () => {
    const fetchUrl = `${url}/product/${event.id}`;
    const httpMethod = 'DELETE';

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setEvents(prevState => prevState.filter(eventEl => eventEl.id !== event.id))
        cancelButtonHandler()
      })
  }

  return (
    <>
    {
        isShowForm ? (
          <div
            className='app__position'
            onClick={cancelButtonHandler}
          >
            <div
              className='app__form'
              onClick={(e) => e.stopPropagation()}
            >
              <input
                className='app__input'
                type='text'
                value={event.name}
                onChange={(e) => changeEventHandler(e.target.value, 'name')}
                placeholder="Enter name here"
                required
              >
              </input>
              <input
                className='app__input'
                type='url'
                placeholder="Enter url here"
                value={event.imageUrl}
                onChange={(e) => changeEventHandler(e.target.value, 'imageUrl')}
              >
              </input>
              <input
                className='app__input'
                type='text'
                placeholder="Enter count here"
                value={event.count}
                onChange={(e) => changeEventHandler(e.target.value, 'count')}
              >
              </input>
              <input
                className='app__input'
                type='text'
                placeholder="Enter weight here"
                value={event.weight}
                onChange={(e) => changeEventHandler(e.target.value, 'weight')}
              >
              </input>
              <div className='app__btncontainer'>
                <button onClick={cancelButtonHandler}>Cancel</button>
                <button onClick={eventFetchHandler}>{method}</button>
                {
                  method === 'Update' ? (
                    <button className='app__removebtn' onClick={removeEventHandler}>Remove</button>
                  ) : null
                }
              </div>
            </div>
          </div>
        ) : null
      }
    <div className="page">

      <button 
        className="buttn"
        onClick={() => openFormHandler('Create', null)}
      >+</button>

      <div className="page-content">
        <ProductList
          products={products}
          openFormHandler={openFormHandler}
        />
      </div>
    </div>
    </>
  )
}

export default App

// npx json-server --watch db.json --port 5000
