import React from 'react';

const Notifications = ({data}) => {

  return (
    <div className="sidebar notifications">
      <h3>Notifications</h3>
      {data.length > 0 ? (
        data.map((notif) => (
          <div key={notif.id}>
            {notif.message}
          </div>
        ))
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default Notifications;
