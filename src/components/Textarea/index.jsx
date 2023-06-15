import React from 'react';
import { Input } from 'antd';

const Textarea = ({ value, onChange }) => {
    return (
        <div style={{ margin: '20px 0' }}>
            <Input.TextArea
                value={value}
                onChange={onChange}
                placeholder='Enter text'
                autoSize={{ minRows: 3 }}
            />
        </div>
    );
};

export default Textarea;
