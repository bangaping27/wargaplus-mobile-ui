import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import Card from './Card';
import Badge from './Badge';

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing[3]}px;
`;

const TitleContainer = styled.View`
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing[2]}px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin-bottom: ${({ theme }) => theme.spacing[1]}px;
`;

const DatePill = styled.View`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  padding-horizontal: ${({ theme }) => theme.spacing[3]}px;
  padding-vertical: ${({ theme }) => theme.spacing[1]}px;
`;

const DateText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Description = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const AnnouncementCard = ({
  title,
  description,
  date,
  badge,
  badgeVariant = 'primary',
  onPress,
  style,
  ...props
}) => {
  return (
    <Card margin={8} style={style} {...props}>
      <CardHeader>
        <TitleContainer>
          <Title>{title}</Title>
          <DatePill>
            <DateText>{date}</DateText>
          </DatePill>
        </TitleContainer>
        {badge && (
          <Badge variant={badgeVariant} size="sm">
            {badge}
          </Badge>
        )}
      </CardHeader>
      <Description numberOfLines={3}>{description}</Description>
    </Card>
  );
};

export default AnnouncementCard;