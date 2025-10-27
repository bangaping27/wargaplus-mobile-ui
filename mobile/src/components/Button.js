import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme, variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary.tosca;
      case 'secondary':
        return theme.colors.background.secondary;
      case 'success':
        return theme.colors.status.success;
      case 'warning':
        return theme.colors.status.warning;
      case 'danger':
        return theme.colors.status.error;
      default:
        return theme.colors.primary.tosca;
    }
  }};
  border-radius: ${({ theme, size = 'md' }) => {
    switch (size) {
      case 'sm':
        return theme.borderRadius.md;
      case 'md':
        return theme.borderRadius.lg;
      case 'lg':
        return theme.borderRadius.xl;
      default:
        return theme.borderRadius.lg;
    }
  }}px;
  padding-horizontal: ${({ theme, size = 'md' }) => {
    switch (size) {
      case 'sm':
        return theme.spacing[3];
      case 'md':
        return theme.spacing[4];
      case 'lg':
        return theme.spacing[6];
      default:
        return theme.spacing[4];
    }
  }}px;
  padding-vertical: ${({ theme, size = 'md' }) => {
    switch (size) {
      case 'sm':
        return theme.spacing[2];
      case 'md':
        return theme.spacing[3];
      case 'lg':
        return theme.spacing[4];
      default:
        return theme.spacing[3];
    }
  }}px;
  min-height: ${({ theme }) => theme.touchTargets.min}px;
  min-width: ${({ theme }) => theme.touchTargets.min}px;
  justify-content: center;
  align-items: center;
  border-width: ${({ variant }) => (variant === 'secondary' ? '1px' : '0px')};
  border-color: ${({ theme }) => theme.colors.border.medium};
  shadow-color: ${({ theme }) => theme.colors.shadow.medium};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-size: ${({ theme, size = 'md' }) => {
    switch (size) {
      case 'sm':
        return theme.typography.fontSize.sm;
      case 'md':
        return theme.typography.fontSize.base;
      case 'lg':
        return theme.typography.fontSize.lg;
      default:
        return theme.typography.fontSize.base;
    }
  }}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme, variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
      case 'success':
      case 'warning':
      case 'danger':
        return theme.colors.text.white;
      case 'secondary':
        return theme.colors.text.primary;
      default:
        return theme.colors.text.white;
    }
  }};
  text-align: center;
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onPress,
  disabled = false,
  style,
  ...props
}) => {
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      {...props}
    >
      <ButtonText variant={variant} size={size}>
        {children}
      </ButtonText>
    </ButtonContainer>
  );
};

export default Button;