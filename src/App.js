import './App.css';
import React, {useState} from 'react';

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function Video(props) {
  const DateTimeUpgrade = DateTimePretty(DateTime, props.date);
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimeUpgrade />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

function DateTimePretty(Component, date) {
  return class extends React.Component {
    DateUpgrade(correctDate) {
      let someDate = new Date() - new Date(correctDate);
      if (someDate > 86400000) {
        const conversion = Math.round(someDate / 86400000);
        return `${conversion} ${this.syntaxDate(conversion, ['день', 'дня', 'дней'])} назад`;
      } else if (someDate > 3600000 ) {
        const conversion = Math.round(someDate / 3600000);
        return `${conversion} ${this.syntaxDate(conversion, ['час', 'часа', 'часов'])} назад`;
      } else {
        const conversion = Math.round(someDate / 3600);
        return `${conversion} ${this.syntaxDate(conversion, ['минута', 'минуты', 'минут'])} назад`;
      }
    }

    syntaxDate(number, arrTitles) {
      const cache = [];
      const events = [2, 0, 1, 1, 1, 2];
      function decoderNumber(number, titles) {
        if(!cache[number]) cache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : events[Math.min(number % 10, 5)];
        return titles[cache[number]];
      }
      return decoderNumber(number, arrTitles);
   }

    render() {    
      return <Component {...this.props} date={ this.DateUpgrade(date) } />
    }
  }
} 

export default function App() {
    const [list] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}
