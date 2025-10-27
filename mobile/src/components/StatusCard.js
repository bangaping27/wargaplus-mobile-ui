import React from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

const StatusCardContainer = styled(LinearGradient)`
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  padding: ${({ theme }) => theme.spacing[5]}px;
  margin: ${({ theme }) => theme.spacing[2]}px 0;
  shadow-color: ${({ theme }) => theme.colors.shadow.medium};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 8;
`;

const StatusHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const StatusTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.white};
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatusBadge = styled.View`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  padding-horizontal: ${({ theme }) => theme.spacing[3]}px;
  padding-vertical: ${({ theme }) => theme.spacing[1]}px;
`;

const StatusBadgeText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.white};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AmountContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing[3]}px;
`;

const Amount = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.white};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const Description = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.white};
  opacity: 0.9;
`;

const StatusCard = ({
  status,
  amount,
  description,
  gradientColors = ['#A9E5BB', '#3DA58A'],
  style,
  ...props
}) => {
  return (
    <StatusCardContainer
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
      {...props}
    >
      <StatusHeader>
        <StatusTitle>Status Pembayaran</StatusTitle>
        <StatusBadge>
          <StatusBadgeText>{status}</StatusBadgeText>
        </StatusBadge>
      </StatusHeader>

      <AmountContainer>
        <Amount>{amount}</Amount>
      </AmountContainer>

      <Description>{description}</Description>
    </StatusCardContainer>
  );
};

export default StatusCard;