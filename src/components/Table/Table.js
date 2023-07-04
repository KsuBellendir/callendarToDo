import moment from 'moment';

import './Table.css';

const Table = ({today, even, handelClick,setGetTd}) => {
    const hourArr = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
    
    moment.updateLocale('en', {week:{dow:1}});
    
    const arr = [];

    for (let i = 0; i <= 167; i++) {
        arr.push(today.startOf("week").add(i, "Hour").format("X"));
    }

    return (
    <div className='container-table'>
        <div className='container-cell'>
            {hourArr.map((item) => {
                return   <div className='cell'>{item}</div>
            })}
        </div>
        <div className='container-cell-case'>
            {arr.map((item) => {

                return <div key={item} className='cell-case'> 
                                {<div className='container-event'onClick={handelClick}>
                                <div onClick={()=> even.filter(e => e.time === item).map(t=>setGetTd(t.id))}>{even.filter(e => e.time === item).map(t=>t.title)}</div>
                                <div>{even.filter(e => e.time === item).map(t=>t.description)}</div>
                            </div>}
                        </div>
            })}
            
        </div>
    </div>
  )
}

export default Table;
