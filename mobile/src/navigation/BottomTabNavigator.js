import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

// Import screens (we'll create these next)
import DashboardScreen from '../screens/DashboardScreen';
import PaymentScreen from '../screens/PaymentScreen';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabBarContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.navigation.background};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.navigation.border};
  padding-top: ${({ theme }) => theme.spacing[2]}px;
  padding-bottom: ${({ theme }) => theme.spacing[2]}px;
  shadow-color: ${({ theme }) => theme.colors.shadow.medium};
  shadow-offset: 0px -2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 8;
`;

const TabLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-top: ${({ theme }) => theme.spacing[1]}px;
`;

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <TabBarContainer>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Icon mapping
        const getIconName = (routeName) => {
          switch (routeName) {
            case 'Dashboard':
              return 'home';
            case 'Payment':
              return 'card';
            case 'Feed':
              return 'chatbubble-outline';
            case 'Profile':
              return 'person';
            default:
              return 'help';
          }
        };

        const iconName = getIconName(route.name);

        return (
          <TabBarButton
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused
                ? theme.colors.navigation.active
                : theme.colors.navigation.inactive
              }
            />
            <TabLabel
              style={{
                color: isFocused
                  ? theme.colors.navigation.active
                  : theme.colors.navigation.inactive
              }}
            >
              {label}
            </TabLabel>
          </TabBarButton>
        );
      })}
    </TabBarContainer>
  );
};

const TabBarButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[2]}px;
  min-height: ${({ theme }) => theme.touchTargets.min}px;
  min-width: ${({ theme }) => theme.touchTargets.min}px;
`;

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Hide default tab bar since we use custom
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Beranda',
          title: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarLabel: 'Pembayaran',
          title: 'Pembayaran',
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Info',
          title: 'Info',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          title: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;