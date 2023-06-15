import React, { useState } from 'react';
import { Button, message, Spin } from 'antd';
import Container from "./components/Container";
import Textarea from "./components/Textarea";
import Result from "./components/Result";

const MAX_SMS_LENGTH = 140;

const App = () => {
  const [inputText, setInputText] = useState('');
  const [smsArray, setSmsArray] = useState([]);
  const [loading, setLoading] = useState(false);

  // Обработчик изменения текстового поля
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Обработчик разделения SMS
  const handleSplitSMS = () => {
    if (inputText.trim() === '') {
      message.error('Please enter some text.'); // Вывод ошибки, если текстовое поле пустое
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const words = inputText.split(' ');
      const smsFragments = [];
      let currentSMS = '';
      let fragmentNumber = 1;
      let totalFragments = 0;

      // Разделение текста на фрагменты SMS
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const suffix = ` ${fragmentNumber}/${totalFragments}`;

        if (currentSMS.length + word.length + suffix.length <= MAX_SMS_LENGTH) {
          currentSMS += word + ' ';
        } else {
          smsFragments.push(currentSMS.trim());
          currentSMS = word + ' ';
          fragmentNumber++;
        }
      }

      if (currentSMS !== '') {
        smsFragments.push(currentSMS.trim());
      }

      totalFragments = smsFragments.length;

      // Форматирование фрагментов SMS
      const formattedSMSArray = smsFragments.map((sms, index) => {
        const fragmentIndex = index + 1;
        return `${sms} ${fragmentIndex}/${totalFragments}`;
      });

      setSmsArray(formattedSMSArray);
      setLoading(false);
    }, 1000);
  };

  // Обработчик очистки текстового поля и результата
  const handleClear = () => {
    setInputText('');
    setSmsArray([]);
  };

  return (
      <Container>
        <h1 style={{ marginTop: '20px' }}>SMS Splitter</h1>
        <Textarea value={inputText} onChange={handleInputChange} />
        <div style={{ margin: '10px 0' }}>
          <Button type='primary' onClick={handleSplitSMS} style={{ marginBottom: '10px' }}>
            Split into SMS
          </Button>
          <Button onClick={handleClear} style={{ marginLeft: '10px' }}>
            Clear
          </Button>
        </div>
        {loading ? (
            <div style={{ marginTop: '20px' }}>
              <Spin size='large' />
            </div>
        ) : (
            <Result smsArray={smsArray} />
        )}
      </Container>
  );
};

export default App;
