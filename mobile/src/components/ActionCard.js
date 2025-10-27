import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';

const ActionCardContainer = styled(TouchableOpacity)`
  min-height: ${({ theme }) => theme.touchTargets.min}px;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]}px;
`;

const IconContainer = styled.View`
  background-color: ${({ theme, color = 'primary' }) => {
    switch (color) {
      case 'primary':
        return theme.colors.primary.blue;
      case 'secondary':
        return theme.colors.primary.yellow;
      case 'success':
        return theme.colors.status.success;
      case 'warning':
        return theme.colors.status.warning;
      case 'info':
        return theme.colors.primary.green;
      default:
        return theme.colors.primary.blue;
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  width: ${({ theme }) => theme.spacing[12]}px;
  height: ${({ theme }) => theme.spacing[12]}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[3]}px;
`;

const ActionCardTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const ActionCard = ({
  title,
  icon,
  iconColor = 'primary',
  onPress,
  style,
  ...props
}) => {
  const getIconName = (iconName) => {
    // Map common action names to Ionicons
    const iconMap = {
      'Bayar Iuran': 'card',
      'Air': 'water',
      'PPOB': 'phone-portrait',
      'Lapor': 'document-text',
      'Kegiatan': 'calendar',
      'Listrik': 'flash',
      'Internet': 'wifi',
      'Pulsa': 'phone-portrait',
    };
    return iconMap[iconName] || 'help';
  };

  return (
    <Card margin={8} style={style}>
      <ActionCardContainer
        onPress={onPress}
        activeOpacity={0.7}
        {...props}
      >
        <IconContainer color={iconColor}>
          <Ionicons
            name={getIconName(title)}
            size={24}
            color="#FFFFFF"
          />
        </IconContainer>
        <ActionCardTitle>{title}</ActionCardTitle>
      </ActionCardContainer>
    </Card>
  );
};

export default ActionCard;