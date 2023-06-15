import React from 'react';

const Result = ({ smsArray }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <pre>{`[${smsArray.map((sms) => `'${sms}'`).join(', ')}]`}</pre>
        </div>
    );
};

export default Result;
