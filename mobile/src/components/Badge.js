import React from 'react';
import styled from 'styled-components/native';

const BadgeContainer = styled.View`
  background-color: ${({ theme, variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary.tosca;
      case 'success':
        return theme.colors.status.success;
      case 'warning':
        return theme.colors.status.warning;
      case 'error':
        return theme.colors.status.error;
      case 'info':
        return theme.colors.status.info;
      case 'pending':
        return theme.colors.status.pending;
      case 'paid':
        return theme.colors.status.paid;
      case 'unpaid':
        return theme.colors.status.unpaid;
      default:
        return theme.colors.primary.tosca;
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  padding-horizontal: ${({ theme, size = 'md' }) => {
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
  padding-vertical: ${({ theme, size = 'md' }) => {
    switch (size) {
      case 'sm':
        return theme.spacing[1];
      case 'md':
        return theme.spacing[1];
      case 'lg':
        return theme.spacing[2];
      default:
        return theme.spacing[1];
    }
  }}px;
  align-self: flex-start;
  min-width: ${({ theme, size = 'md' }) => {
    switch (size) {
      case 'sm':
        return theme.spacing[8];
      case 'md':
        return theme.spacing[10];
      case 'lg':
        return theme.spacing[12];
      default:
        return theme.spacing[10];
    }
  }}px;
  align-items: center;
  justify-content: center;
`;

const BadgeText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme, size = 'md' }) => {
    switch (size) {
      case 'sm':
        return theme.typography.fontSize.xs;
      case 'md':
        return theme.typography.fontSize.sm;
      case 'lg':
        return theme.typography.fontSize.base;
      default:
        return theme.typography.fontSize.sm;
    }
  }}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.white};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  style,
  ...props
}) => {
  return (
    <BadgeContainer variant={variant} size={size} style={style} {...props}>
      <BadgeText size={size}>{children}</BadgeText>
    </BadgeContainer>
  );
};

export default Badge;