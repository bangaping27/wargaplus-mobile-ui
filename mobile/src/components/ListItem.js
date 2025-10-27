import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import Badge from './Badge';

const ListItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[3]}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border.light};
`;

const LeftContent = styled.View`
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing[3]}px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[1]}px;
`;

const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const RightContent = styled.View`
  align-items: flex-end;
`;

const StatusBadge = styled(Badge)`
  align-self: flex-end;
`;

const Amount = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[1]}px;
`;

const DateText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ListItem = ({
  title,
  subtitle,
  amount,
  date,
  status,
  statusVariant = 'primary',
  rightComponent,
  style,
  ...props
}) => {
  return (
    <ListItemContainer style={style} {...props}>
      <LeftContent>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </LeftContent>

      <RightContent>
        {rightComponent || (
          <>
            {amount && <Amount>{amount}</Amount>}
            {status && (
              <StatusBadge variant={statusVariant} size="sm">
                {status}
              </StatusBadge>
            )}
            {date && <DateText>{date}</DateText>}
          </>
        )}
      </RightContent>
    </ListItemContainer>
  );
};

export default ListItem;