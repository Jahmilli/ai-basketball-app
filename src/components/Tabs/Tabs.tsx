import React, { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabLockup, TabTitle } from "./styles";

type TabsProps = {
  items: string[];
  currentSelectedTab: string;
  onTabSelect: (value: string) => void;
};

export const Tabs: FC<TabsProps> = ({
  items,
  currentSelectedTab,
  onTabSelect,
}) => {
  return (
    <TabLockup>
      {items.map((value: string) => (
        <TouchableOpacity key={value} onPress={() => onTabSelect(value)}>
          <TabTitle isSelected={value === currentSelectedTab}>{value}</TabTitle>
        </TouchableOpacity>
      ))}
    </TabLockup>
  );
};
