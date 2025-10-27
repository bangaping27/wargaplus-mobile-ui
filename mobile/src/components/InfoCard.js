import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import Card from './Card';

const InfoCardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing[3]}px;
`;

const InfoCategory = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme, category = 'info' }) => {
    switch (category) {
      case 'announcement':
        return theme.colors.primary.tosca;
      case 'news':
        return theme.colors.primary.blue;
      case 'warning':
        return theme.colors.status.warning;
      case 'info':
      default:
        return theme.colors.status.info;
    }
  }};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoDate = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xs}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const InfoTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
`;

const InfoDescription = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const InfoFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing[3]}px;
  padding-top: ${({ theme }) => theme.spacing[3]}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border.light};
`;

const AuthorContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AuthorAvatar = styled.View`
  width: ${({ theme }) => theme.spacing[6]}px;
  height: ${({ theme }) => theme.spacing[6]}px;
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  background-color: ${({ theme }) => theme.colors.primary.blue};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing[2]}px;
`;

const AuthorInitial = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.white};
`;

const AuthorName = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ReadMore = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.primary.tosca};
`;

const InfoCard = ({
  category,
  title,
  description,
  date,
  author,
  onPress,
  style,
  ...props
}) => {
  const getAuthorInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'A';
  };

  return (
    <Card margin={8} style={style} {...props}>
      <InfoCardHeader>
        <InfoCategory category={category}>{category}</InfoCategory>
        <InfoDate>{date}</InfoDate>
      </InfoCardHeader>

      <InfoTitle>{title}</InfoTitle>

      <InfoDescription numberOfLines={3}>
        {description}
      </InfoDescription>

      <InfoFooter>
        <AuthorContainer>
          <AuthorAvatar>
            <AuthorInitial>{getAuthorInitial(author)}</AuthorInitial>
          </AuthorAvatar>
          <AuthorName>{author}</AuthorName>
        </AuthorContainer>

        {onPress && (
          <ReadMore onPress={onPress}>Baca Selengkapnya</ReadMore>
        )}
      </InfoFooter>
    </Card>
  );
};

export default InfoCard;