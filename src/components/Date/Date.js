import moment from 'moment';

const Date = () => {

    window.moment = moment;

    moment.updateLocale('en', {week:{dow:1}});
    const startDay = moment().startOf('month').startOf('week');
    const endDay = moment().endOf('month').endOf('week');
    console.log(startDay);
    console.log(endDay);
    const calendar = [];
    for(let i = startDay; i <35; i++){
        calendar.push(i);
    }

  return (
    <div>Date

    </div>
  )
}

export default Date;