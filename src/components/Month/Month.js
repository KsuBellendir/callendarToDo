import './Month.css';
import {GrNext, GrPrevious} from 'react-icons/gr';

const Month = ({month, year, nextWeek, prevWeek}) => {
  return (
    <div className='container-month'>
      <button className='btn-month' onClick={prevWeek}><GrPrevious className='icon-monht'/></button>
      <h5 className='month-text'>{month}</h5>
      <h5 className='month-text'>{year}</h5>
      <button className='btn-month' onClick={nextWeek}><GrNext className='icon-month'/></button>
    </div>
  )
}

export default Month;