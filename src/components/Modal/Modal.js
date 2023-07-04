import {useState} from 'react'
import {useForm } from 'react-hook-form'; 
import DateTimePicker from 'react-datetime-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css'; 
import axios from 'axios';
import moment from 'moment';
import './Modal.css';



const Modal = ({active, setActive, getEvents}) => {

    const {register, handleSubmit, reset} = useForm();
    const day = moment().format('MM DD YYYY');
    const [value, onChange] = useState(new Date(day));


    const onSubmit = ({id,  title,  description}) => {
      let time = Math.floor(value.getTime() / 1000).toString()
      console.log(typeof time);
      axios.post('http://localhost:3001/events', {id, title, description, time})
      .then(res =>{
      console.log(res.status)
      getEvents()
      }).catch(error => {
      console.error(error)
      }); 
    };

    const closeModal = () => {
      setActive(false);
      reset()
    };

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <form className={active ? 'modal-content active' : 'modal-content'}  onSubmit={handleSubmit(onSubmit)} onClick={e => e.stopPropagation()}>
        <DateTimePicker 
          onChange={onChange} 
          value={value} maxDetail={"hour"} 
          isCalendarOpen={true}></DateTimePicker>
        <input className='titel-input' {...register('title', {required: true, minLength: 1})} placeholder='Заметка о событие'/>
        <input className='titel-input' {...register('description', {required: true, minLength: 1})} placeholder='Описания события'/>
        <div className='modal-wrapper-btn'>
        <button className='btn-input' onClick={closeModal}>Canel</button>
        <button className='btn-input' type='submit' onClick={()=>setActive(false)}>Ok</button>
        </div>

      </form>
    </div>
  )
}

export default Modal;



//{showBtn ? 'btn-delete' : 'btn-delete-blok'}
