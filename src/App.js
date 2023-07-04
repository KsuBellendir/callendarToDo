import {useState, useEffect} from 'react';
import './App.css';
import {IoMdAdd} from 'react-icons/io';
import axios from 'axios';
import moment from 'moment';
import Month from './components/Month/Month';
import Table from './components/Table/Table';
import Modal from './components/Modal/Modal';

const App = () => {
  const dataEvents =[ {
    id: null,
    title: null,
    description: null,
    time: null
  }]

  moment.updateLocale('en', {week:{dow:1}});

  const [activModal, setActivModal] = useState(false);
  const [today, setToday] = useState(moment());
  const [even, setEven] = useState(dataEvents);
  const [showBtn, setShowBtn] = useState(false); 
  const [getId, setGetTd] = useState('');
 

  const daysOfWeek = [];

    for (let i = 0; i <= 6; i++) {
      daysOfWeek.push(today.startOf("week").add(i, "days").format("DD"));
    }

  const weekNameDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const isOlolo = (item) => {
  return moment().format('DD') === item;
}

  const prevWeek = () => {
    setToday(prev => prev.clone().subtract(1, 'weeks'))
  }

  const nextWeek = () => {
    setToday(next => next.clone().add(1, 'weeks'))
  }

  const todayWeek = () => {
    setToday(moment())
  }

  const getEvents = () => {
    axios.get(`http://localhost:3001/events`).then(res =>{
      setEven(res.data);
    }).catch(error => {
      console.error(error)
    })
  }

  const delEvent = () => {
    axios.delete(`http://localhost:3001/events/${getId}`).then(res =>{
      const remainingRes = even.filter(resalt => resalt.id !== getId)
      setEven(remainingRes)
      console.log(res)
    }).catch(error => {
      console.error(error)
    })
  }

   const handelClick = () => {
    setShowBtn(!showBtn);  
  } 

  useEffect(() => {
    getEvents();
  }, [today])

  return (
    <div className='App'>
      <div className='container'>
        <div className='wrapper-title'>
          <h1 className='text'>Interview Calendar</h1>
          <button className='btn-add' onClick={() => setActivModal(true)}><IoMdAdd className='icon'/></button>
          <Modal active={activModal} setActive={setActivModal} getEvents={getEvents}/>
          </div>
        <div className='wrapper-data'>
          <div className='wrapper-week'>
            <div className='wrapper-weekday-name'>
              {weekNameDay.map((item) => {
                return <div className='week-name'>{item}</div>
              })}
            </div>
            <div className="wrapper-weekday-num">
              {daysOfWeek.map((item) => {
                return <div className={isOlolo(item) ? 'current-day' : 'week-number'}>{item}</div>
              })}
            </div> 
          </div>
          <Month prevWeek={prevWeek} nextWeek={nextWeek} month={today.format('MMMM')} year={today.format('YYYY')}/>
        </div>
        <Table today={today} even={even} handelClick={handelClick} setGetTd={setGetTd}/>
        <div className='btn-container'>
          <button onClick={todayWeek} className='text-h5'>Today </button>
          <button className={showBtn ? 'btn-delete' : 'btn-delete-blok'} onClick={delEvent}>Delete</button>
        </div>
      </div>
    </div>

  )
}

export default App;
