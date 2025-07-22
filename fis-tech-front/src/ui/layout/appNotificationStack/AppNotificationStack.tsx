import React, { use, useState } from "react";
import {
  IShowNotificationProps,
  ShowNotification,
} from "./components/showNotification/ShowNotification";
import Styles from "./AppNotificationStackStyles";

interface IAppNotificationStackProps {
  listShowNotifications: Omit<IShowNotificationProps, "position">[];
  setListShowNotifications: React.Dispatch<
    React.SetStateAction<Omit<IShowNotificationProps, "position">[]>
  >;
}

export const AppNotificationStack: React.FC<IAppNotificationStackProps> = ({
  listShowNotifications,
  setListShowNotifications,
}) => {
  const isEmpty = listShowNotifications.length === 0;

  const removeNotification = () => {
    setListShowNotifications((prevNotifications) => {
      const updatedNotifications = prevNotifications.slice(1);
      return updatedNotifications;
    });
  };

  if (isEmpty) {
    return null;
  }

  return (
    <Styles.StackOfCards>
      {listShowNotifications.map((notification, index) => (
        <ShowNotification
          {...notification}
          position={index + 1}
          key={`notification${index}`}
          onClose={() => {
            removeNotification();
            notification?.onClose && notification?.onClose();
          }}
        />
      ))}
    </Styles.StackOfCards>
  );
};
