import React from 'react';
import FriendCard from './FriendCard';

export default function FriendsList({ friendList }) {
  return (
    <div>
      {friendList &&
        friendList.length > 0 &&
        friendList.map((friend) => <FriendCard data={friend} />)}
    </div>
  );
}
