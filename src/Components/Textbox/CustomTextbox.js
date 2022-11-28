import { useState } from 'react';
import './styles.css';

export const CustomTextbox = ({ style }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ ...style, flexGrow: '1', flexShrink: '1' }} className='ad-textbox'>
      <input
        onChange={handleChange}
        className={`${value ? 'has-value' : ''}`}
        id='textbox'
        type='text'
      />
      <label htmlFor='textbox'>Email Address</label>
      <div className='underline' />
    </div>
  );
};